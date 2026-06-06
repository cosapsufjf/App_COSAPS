import camelot.io
import os
import json
import pandas as pd

def read_csv(table, i):
    table_df = table.df
    headers = ["CD","Nome","CP", "Desc", "Energia", "Proteina", "Lipideos", "Carboidratos", "FibraAlimentar"]
    table_df = table_df.replace('', pd.NA)
    table_df_cleaned = table_df.dropna(subset=[0])
    table_df_cleaned = table_df_cleaned.dropna(axis=1, how="all")

    num_headers = len(headers)
    num_cols_collected = len(table_df_cleaned.columns)
    
    if num_cols_collected < num_headers:
        missing = range(num_cols_collected, num_headers)
        for col in missing:
            table_df_cleaned.insert(col, headers[col], "Sem dados")

    table_df_cleaned = table_df_cleaned.iloc[:, :num_headers]
    table_df_cleaned = table_df_cleaned.set_axis(headers, axis=1)
    
    return table_df_cleaned

def read_json(cleaned_table, i):
    cleaned_table.to_json(f"temp/json/table_{i}.json", orient="records", indent=4)

    with open(f"temp/json/table_{i}.json", "r") as f:
        data = json.load(f)
        try:
            with open("stream/table_json.json", "x", encoding="utf-8") as f:
                print("file created")
        except FileExistsError:
            pass


        with open("stream/table_json.json", "a") as f2:
            converted = convert_json(data)
            json.dump(converted, f2, indent=4)

def convert_json(desformatted_json):
    result = {}
    for obj in desformatted_json:
        name = obj["Nome"]
        CD = obj["CD"]
        CP = obj["CP"]
        Desc = obj["Desc"]
        Energia = obj["Energia"]
        Proteina = obj["Proteina"]
        Lipideos = obj["Lipideos"]
        Carboidratos = obj["Carboidratos"]
        Fibra_Alimentar = obj["FibraAlimentar"]

        result[name] = {
            "CD": CD,
            "CP": CP,
            "Desc": Desc,
            "Energia": Energia,
            "Proteina": Proteina,
            "Lipideos": Lipideos,
            "Carboidrat": Carboidratos,
            "FibraAl": Fibra_Alimentar,
        }
        
    return result
    
def read(file_path):
    tables_s = camelot.io.read_pdf(file_path, pages="all", flavor="stream", suppress_stdout=False, parallel=True, cpu_count=os.cpu_count())
    
    i=0
    for table in tables_s:
        df = read_csv(table, i)        
        read_json(df, i)
            
        i += 1

read("pdf/POF_Alimentos.pdf")