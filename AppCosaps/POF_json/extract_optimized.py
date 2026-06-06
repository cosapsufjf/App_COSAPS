import json
import os
import time
from pathlib import Path

import camelot.io
import pandas as pd

# Configurações de otimização
HEADERS = [
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
NUM_HEADERS = len(HEADERS)
OUTPUT_FILE = "stream/table_json.json"
BATCH_SIZE = 50  # Processar N tabelas antes de fazer I/O


def setup_directories():
    """Cria diretórios necessários."""
    Path("stream").mkdir(exist_ok=True)
    Path("temp/json").mkdir(parents=True, exist_ok=True)
    # Limpar arquivo anterior
    if os.path.exists(OUTPUT_FILE):
        os.remove(OUTPUT_FILE)


def read_csv(table):
    """Processa e limpa um dataframe da tabela PDF."""
    table_df = table.df
    table_df = table_df.replace("", pd.NA)
    table_df_cleaned = table_df.dropna(subset=[0]).dropna(axis=1, how="all")
    num_cols_collected = len(table_df_cleaned.columns)

    if num_cols_collected < NUM_HEADERS:
        missing_cols = range(num_cols_collected, NUM_HEADERS)
        for col in missing_cols:
            table_df_cleaned[col] = "Sem dados"

    table_df_cleaned = table_df_cleaned.iloc[:, :NUM_HEADERS]
    table_df_cleaned.columns = HEADERS

    return table_df_cleaned


def convert_json(desformatted_json):
    """Converte lista de registros para dicionário indexado."""
    result = {}
    for obj in desformatted_json:
        result[obj.get("Nome", "")] = {
            "CD": obj.get("CD", ""),
            "CP": obj.get("CP", ""),
            "Desc": obj.get("Desc", ""),
            "Energia": obj.get("Energia", ""),
            "Proteina": obj.get("Proteina", ""),
            "Lipideos": obj.get("Lipideos", ""),
            "Carboidrat": obj.get("Carboidratos", ""),
            "FibraAl": obj.get("FibraAlimentar", ""),
        }
    return result


def batch_process_and_write(dataframes_batch):
    """Processa um lote de dataframes e escreve no JSON final."""
    combined_data = []

    # Concatenar todos os dataframes do lote
    if dataframes_batch:
        combined_df = pd.concat(dataframes_batch, ignore_index=True)
        combined_data = combined_df.to_dict("records")

    if combined_data:
        # Converter e escrever em uma única operação
        converted = convert_json(combined_data)

        with open(OUTPUT_FILE, "a", encoding="utf-8") as f:
            # Escrever como um grande dicionário (melhor para busca O(1))
            for key, value in converted.items():
                json.dump({key: value}, f, ensure_ascii=False)
                f.write("\n")  # JSONL format para melhor performance


def read_optimized(file_path):
    """Lê PDF e processa com otimizações de I/O e memória."""
    setup_directories()

    print("🔄 Iniciando leitura do PDF com paralelização...")
    start_time = time.time()

    # Ler PDF com paralelização máxima
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

    # Processar em lotes
    dataframes_batch = []
    process_start = time.time()

    for idx, table in enumerate(tables_s):
        try:
            df = read_csv(table)
            dataframes_batch.append(df)

            # Processar e escrever em lotes
            if (idx + 1) % BATCH_SIZE == 0:
                batch_process_and_write(dataframes_batch)
                dataframes_batch = []
                elapsed = time.time() - process_start
                rate = (idx + 1) / elapsed
                eta = (len(tables_s) - idx - 1) / rate if rate > 0 else 0
                print(f"  [Tabela {idx + 1}/{len(tables_s)}] ETA: {eta:.1f}s")
        except Exception as e:
            print(f"⚠️  Erro na tabela {idx}: {str(e)}")
            continue

    # Processar lote final
    if dataframes_batch:
        batch_process_and_write(dataframes_batch)

    total_time = time.time() - process_start
    print("\n✨ Processamento concluído!")
    print(f"⏱️  Tempo total: {total_time:.2f}s")
    print(f"📊 Taxa: {len(tables_s) / total_time:.2f} tabelas/segundo")
    print(f"💾 Arquivo JSON salvo em: {OUTPUT_FILE}")


def create_final_json():
    """Converte JSONL para JSON único para fácil acesso."""
    print("\n🔗 Consolidando arquivo JSON final...")

    final_data = {}
    with open(OUTPUT_FILE, "r", encoding="utf-8") as f:
        for line in f:
            if line.strip():
                item = json.loads(line)
                final_data.update(item)

    # Salvar como JSON único
    with open("stream/alimentos.json", "w", encoding="utf-8") as f:
        json.dump(final_data, f, ensure_ascii=False, indent=2)

    print(f"✅ JSON final criado com {len(final_data)} alimentos")
    print("📁 Arquivo: stream/alimentos.json")


if __name__ == "__main__":
    read_optimized("pdf/teste.pdf")
    create_final_json()
