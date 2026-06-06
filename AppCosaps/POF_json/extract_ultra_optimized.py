import json
import os
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from threading import Lock
from random import randint

import camelot.io
import pandas as pd


HEADERSN = [
    "CD",
    "Nome",
    "CP",
    "Desc",
    "Energia",
    "Proteina",
    "Lipideos",
    "Carboidratos",
    "FibraAlimentar",
]

HEADERSV = [
    "CD",
    "Nome",
    "CP",
    "Desc",
    "Retinol",
    "VitaminaA",
    "Tiamina",
    "Riboflavina",
    "Niacina",
    "NiacinaNE",
    "Piridoxina",
    "Cobalamina",
    "Folato",
    "VitaminaD",
    "VitaminaE",
    "VitaminaC",
]

HEADERSM = [
    "CD",
    "Nome",
    "CP",
    "Desc",
    "Calcio",
    "Magnesio",
    "Manganes",
    "Fosforo",
    "Ferro",
    "Sodio",
    "SodioAdicao",
    "Potassio",
    "Cobre",
    "Zinco",
    "Selenio",
]

HEADERSGA = [
    "CD",
    "Nome",
    "CP",
    "Desc",
    "Colesterol",
    "AgSat",
    "AgMono",
    "AgPoli",
    "AgLinoleico",
    "AgLinolenico",
    "AgTransTot",
    "AcucarTot",
    "AcucarAdicao"
]
HEADERSDF = [
    "CD",
    "Nome",
    "CP",
    "Desc",
    "Colesterol",
    "CodDescFnt"
]

GA_INFO = {"headers":HEADERSGA, "output_file": "stream/table_ga.json"}
NUT_INFO = {"headers":HEADERSN, "output_file": "stream/table_json.json"}
DF_INFO = {"headers":HEADERSDF, "output_file": "stream/table_df.json"}
VIT_INFO = {"headers":HEADERSV, "output_file": "stream/table_vit.json"}
MIN_INFO = {"headers":HEADERSM, "output_file": "stream/table_min.json"}

SELECTED_INFO = {"headers":"", "output_file": "", "final_output": ""}

BATCH_SIZE = 100
MAX_WORKERS = 8

write_lock = Lock()

def setup_directories():
    """Cria diretórios necessários."""
    Path("stream").mkdir(exist_ok=True)
    Path("temp/json").mkdir(parents=True, exist_ok=True)
    # Limpar arquivo anterior
    if os.path.exists(SELECTED_INFO["output_file"]):
        os.remove(SELECTED_INFO["output_file"])


def read_csv(table):
    """Processa e limpa um dataframe da tabela PDF."""
    NUM_HEADERS = len(SELECTED_INFO["headers"])
    try:
        table_df = table.df
        table_df = table_df.replace("", pd.NA)
        table_df_cleaned = table_df.dropna(subset=[0]).dropna(axis=1, how="all")
        num_cols_collected = len(table_df_cleaned.columns)
        

        
        if num_cols_collected < NUM_HEADERS:
            missing_cols = range(num_cols_collected, NUM_HEADERS)
            for col in missing_cols:
                table_df_cleaned[col] = "Sem dados"

        table_df_cleaned = table_df_cleaned.iloc[:, :NUM_HEADERS]
        table_df_cleaned.columns = SELECTED_INFO["headers"]
        
        return table_df_cleaned
    except Exception as e:
        temp_table = table.df
        temp_table = temp_table.iloc[:, :NUM_HEADERS]
        temp_table.to_csv(f"temp/csv/temp_table{randint(0, 100)}.csv", index=False)
        print(f"⚠️  Erro ao processar tabela: {str(e)}")
        
        return None


def convert_json(desformatted_json):
    NUM_HEADERS = len(SELECTED_INFO["headers"])
    """Converte lista de registros para dicionário indexado."""
    result = {}
    for obj in desformatted_json:
        nome = obj.get("Nome", "")
        if nome:
            result[nome] = {SELECTED_INFO["headers"][i]: obj.get(SELECTED_INFO["headers"][i], "") for i in range(NUM_HEADERS)}
    return result

def safe_write_batch(converted_data):
    """Escreve um lote de dados no arquivo de forma thread-safe."""
    if not converted_data:
        return

    with write_lock:
        with open(SELECTED_INFO["output_file"], "a", encoding="utf-8") as f:
            for key, value in converted_data.items():
                json.dump({key: value}, f, ensure_ascii=False)
                f.write("\n")


def process_batch(dataframes_batch):
    """Processa um lote de dataframes e escreve no JSON final."""
    if not dataframes_batch:
        return 0

    try:
        combined_df = pd.concat(dataframes_batch, ignore_index=True)
        combined_data = combined_df.to_dict("records")

        converted = convert_json(combined_data)
        safe_write_batch(converted)

        return len(dataframes_batch)
    except Exception as e:
        print(f"⚠️  Erro ao processar lote: {str(e)}")
        return 0


def read_optimized_parallel(file_path):
    """Lê PDF e processa com otimizações máximas incluindo paralelização."""
    setup_directories()

    print("🔄 Iniciando leitura do PDF com paralelização...")
    start_time = time.time()

    tables_s = camelot.io.read_pdf(
        file_path,
        pages="all",
        flavor="stream",
        suppress_stdout=False,
        parallel=True,
        cpu_count=os.cpu_count(),
    )

    read_time = time.time() - start_time
    print(f"✅ PDF lido em {read_time:.2f}s | Total de tabelas: {len(tables_s)}")

    dataframes_batch = []
    process_start = time.time()
    processed_tables = 0

    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        for idx, table in enumerate(tables_s):
            df = read_csv(table)
            if df is not None:
                dataframes_batch.append(df)

            if (idx + 1) % BATCH_SIZE == 0:
                processed = process_batch(dataframes_batch)
                processed_tables += processed
                dataframes_batch = []

                elapsed = time.time() - process_start
                rate = (idx + 1) / elapsed
                eta = (len(tables_s) - idx - 1) / rate if rate > 0 else 0
                print(
                    f"  [Tabela {idx + 1}/{len(tables_s)}] ETA: {eta:.1f}s | Processadas: {processed_tables}"
                )

        if dataframes_batch:
            processed = process_batch(dataframes_batch)
            processed_tables += processed

    total_time = time.time() - process_start
    print("\n✨ Processamento concluído!")
    print(f"⏱️  Tempo total: {total_time:.2f}s")
    print(f"📊 Taxa: {processed_tables / total_time:.2f} tabelas/segundo")
    print(f"💾 Arquivo JSON salvo em: {SELECTED_INFO['output_file']}")

    return processed_tables


def create_final_json():
    """Converte JSONL para JSON único para fácil acesso."""
    print("\n🔗 Consolidando arquivo JSON final...")
    start_consolidate = time.time()

    final_data = {}
    with open(SELECTED_INFO["output_file"], "r", encoding="utf-8") as f:
        for line in f:
            if line.strip():
                try:
                    item = json.loads(line)
                    final_data.update(item)
                except json.JSONDecodeError:
                    continue

    output_path = SELECTED_INFO["final_output"]
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(final_data, f, ensure_ascii=False, indent=2)

    consolidate_time = time.time() - start_consolidate
    print(f"✅ JSON final criado com {len(final_data)} alimentos")
    print(f"📁 Arquivo: {output_path}")
    print(f"⏱️  Tempo de consolidação: {consolidate_time:.2f}s")

    file_size = os.path.getsize(output_path) / (1024 * 1024)  # MB
    print(f"📊 Tamanho do arquivo: {file_size:.2f} MB")

def selected_info(info_type):
    if info_type == "vitaminas":
        return {
            "headers": HEADERSV,
            "output_file": "stream/long/table_vitaminas.json",
            "final_output": "stream/vitaminas.json"
        }
    elif info_type == "minerais":
        return {
            "headers": HEADERSM,
            "output_file": "stream/long/table_minerais.json",
            "final_output": "stream/minerais.json"
        }
    elif info_type == "nutricional":
        return {
            "headers": HEADERSN,
            "output_file": "stream/long/table_alimentos.json",
            "final_output": "stream/alimentos.json"
        }
    elif info_type == "gordacuc":
        return {
            "headers": HEADERSGA,
            "output_file": "stream/long/table_gordura.json",
            "final_output": "stream/gordura.json"
        }
    elif info_type == "coddesc":
        return {
            "headers": HEADERSDF,
            "output_file": "stream/long/table_cod_desc.json",
            "final_output": "stream/cod_desc.json"
        }
    else:
        raise ValueError("info_type deve ser 'vitaminas', 'minerais', 'nutricional', 'gordacuc' ou 'CodDesc'")

if __name__ == "__main__":
    total_start = time.time()

    SELECTED_INFO = selected_info("nutricional")
    processed = read_optimized_parallel("pdf/cortados/SemHeader/InfoNutricionalSH.pdf")
    create_final_json()
    
    SELECTED_INFO = selected_info("vitaminas")
    processed = read_optimized_parallel("pdf/cortados/SemHeader/VitaminasSH.pdf")
    create_final_json()

    SELECTED_INFO = selected_info("minerais")
    processed = read_optimized_parallel("pdf/cortados/SemHeader/MineraisSH.pdf")
    create_final_json()
    
    SELECTED_INFO = selected_info("gordacuc")
    processed = read_optimized_parallel("pdf/cortados/SemHeader/GordurasAcucaresSH.pdf")
    create_final_json()
