# Exemplos Práticos de Uso

## 📖 Depois de executar a extração

### 1. **Carregar e buscar alimentos**

```python
import json

# Carregar o arquivo JSON
with open('stream/alimentos.json', 'r', encoding='utf-8') as f:
    alimentos = json.load(f)

# Buscar um alimento específico (O(1))
alimento = alimentos.get('Arroz branco cozido')
print(alimento)
# Output:
# {
#     "CD": "3001",
#     "CP": "6",
#     "Desc": "Cereal",
#     "Energia": "130",
#     "Proteina": "2.7",
#     "Lipideos": "0.3",
#     "Carboidrat": "28.7",
#     "FibraAl": "0.4"
# }

# Listar todos os alimentos
print(f"Total de alimentos: {len(alimentos)}")
for nome, dados in list(alimentos.items())[:5]:
    print(f"  {nome}: {dados['Energia']} kcal")
```

---

## 🔍 Buscas Avançadas

### 2. **Filtrar alimentos por critério**

```python
# Alimentos com alto valor proteico
proteicos = {
    nome: dados for nome, dados in alimentos.items()
    if float(dados['Proteina']) > 20
}
print(f"Alimentos proteicos: {len(proteicos)}")

# Alimentos com baixa caloria
baixa_caloria = {
    nome: dados for nome, dados in alimentos.items()
    if float(dados['Energia']) < 100
}
print(f"Alimentos baixa caloria: {len(baixa_caloria)}")
```

---

### 3. **Análise de macronutrientes**

```python
import pandas as pd

# Converter para DataFrame para análise
df = pd.DataFrame(alimentos).T
df_numeric = df[['Energia', 'Proteina', 'Lipideos', 'Carboidratos']].apply(pd.to_numeric, errors='coerce')

print("Estatísticas Nutricionais:")
print(df_numeric.describe())
# Output:
#              Energia  Proteina  Lipideos  Carboidratos
# count     5234.0    5234.0    5234.0        5234.0
# mean       185.4      12.3       8.5         18.6
# std        145.2      15.2      10.3         15.4
# ...
```

---

## 🍽️ Aplicações Web

### 4. **API Flask para consultar alimentos**

```python
from flask import Flask, jsonify, request
import json

app = Flask(__name__)

# Carregar dados uma vez (não a cada request)
with open('stream/alimentos.json', 'r', encoding='utf-8') as f:
    ALIMENTOS = json.load(f)

@app.route('/api/alimentos/<nome>', methods=['GET'])
def buscar_alimento(nome):
    """Busca um alimento específico"""
    alimento = ALIMENTOS.get(nome)
    if alimento:
        return jsonify({
            "nome": nome,
            "dados": alimento
        })
    return jsonify({"erro": "Alimento não encontrado"}), 404

@app.route('/api/alimentos/search', methods=['GET'])
def buscar_por_termo():
    """Busca alimentos que contêm o termo"""
    termo = request.args.get('q', '').lower()
    resultados = {
        nome: dados for nome, dados in ALIMENTOS.items()
        if termo in nome.lower()
    }
    return jsonify({"total": len(resultados), "resultados": resultados})

@app.route('/api/stats', methods=['GET'])
def estatisticas():
    """Retorna estatísticas gerais"""
    return jsonify({
        "total_alimentos": len(ALIMENTOS),
        "campos": list(list(ALIMENTOS.values())[0].keys())
    })

if __name__ == '__main__':
    app.run(debug=True)

# Exemplos de uso:
# GET http://localhost:5000/api/alimentos/Arroz%20branco%20cozido
# GET http://localhost:5000/api/alimentos/search?q=frango
# GET http://localhost:5000/api/stats
```

---

### 5. **CLI para consultar alimentos**

```python
#!/usr/bin/env python3
import json
import sys
import argparse

def carregar_alimentos():
    with open('stream/alimentos.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def buscar_exato(nome):
    """Busca exata"""
    alimentos = carregar_alimentos()
    if nome in alimentos:
        print(f"\n{'='*50}")
        print(f"🍽️  {nome}")
        print(f"{'='*50}")
        for campo, valor in alimentos[nome].items():
            print(f"{campo:20} : {valor}")
    else:
        print(f"❌ Alimento '{nome}' não encontrado")

def buscar_similar(termo):
    """Busca por termo similar"""
    alimentos = carregar_alimentos()
    resultado = {
        nome: dados for nome, dados in alimentos.items()
        if termo.lower() in nome.lower()
    }
    
    if resultado:
        print(f"\n📋 Encontrados {len(resultado)} alimentos:")
        for nome in sorted(resultado.keys())[:10]:
            print(f"  • {nome}")
        if len(resultado) > 10:
            print(f"  ... e mais {len(resultado)-10} alimentos")
    else:
        print(f"❌ Nenhum alimento contém '{termo}'")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Consultador de Alimentos')
    parser.add_argument('--buscar', '-b', help='Busca exata')
    parser.add_argument('--similar', '-s', help='Busca por termo similar')
    
    args = parser.parse_args()
    
    if args.buscar:
        buscar_exato(args.buscar)
    elif args.similar:
        buscar_similar(args.similar)
    else:
        parser.print_help()

# Uso:
# python cli.py --buscar "Arroz branco cozido"
# python cli.py --similar frango
```

---

## 📱 Integração com Banco de Dados

### 6. **Migrar para SQLite (Opcional, para melhor performance)**

```python
import sqlite3
import json

def json_para_sqlite():
    """Converte JSON para SQLite com índices"""
    
    # Carregar JSON
    with open('stream/alimentos.json', 'r', encoding='utf-8') as f:
        alimentos = json.load(f)
    
    # Criar banco de dados
    conn = sqlite3.connect('alimentos.db')
    cursor = conn.cursor()
    
    # Criar tabela
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS alimentos (
            id INTEGER PRIMARY KEY,
            nome TEXT UNIQUE NOT NULL,
            cd TEXT,
            cp TEXT,
            descricao TEXT,
            energia REAL,
            proteina REAL,
            lipideos REAL,
            carboidratos REAL,
            fibra_alimentar REAL
        )
    ''')
    
    # Inserir dados
    for nome, dados in alimentos.items():
        cursor.execute('''
            INSERT OR REPLACE INTO alimentos 
            (nome, cd, cp, descricao, energia, proteina, lipideos, carboidratos, fibra_alimentar)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            nome,
            dados.get('CD'),
            dados.get('CP'),
            dados.get('Desc'),
            float(dados.get('Energia', 0)),
            float(dados.get('Proteina', 0)),
            float(dados.get('Lipideos', 0)),
            float(dados.get('Carboidrat', 0)),
            float(dados.get('FibraAl', 0))
        ))
    
    # Criar índices
    cursor.execute('CREATE INDEX idx_nome ON alimentos(nome)')
    cursor.execute('CREATE INDEX idx_energia ON alimentos(energia)')
    cursor.execute('CREATE INDEX idx_proteina ON alimentos(proteina)')
    
    conn.commit()
    print(f"✅ {len(alimentos)} alimentos inseridos no banco de dados")
    conn.close()

def buscar_por_caloria(min_cal, max_cal):
    """Busca alimentos dentro de uma faixa calórica"""
    conn = sqlite3.connect('alimentos.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT nome, energia, proteina 
        FROM alimentos 
        WHERE energia BETWEEN ? AND ?
        ORDER BY energia
    ''', (min_cal, max_cal))
    
    resultados = cursor.fetchall()
    conn.close()
    
    return resultados

# Executar
json_para_sqlite()

# Buscar alimentos entre 100-200 kcal
resultados = buscar_por_caloria(100, 200)
for nome, energia, proteina in resultados[:10]:
    print(f"{nome:30} | {energia:6.1f} kcal | {proteina:5.1f}g proteína")
```

---

## 🎯 Resumo de Performance

| Operação | Tempo | Notas |
|----------|-------|-------|
| Carregamento JSON | ~100ms | Uma única vez |
| Busca de 1 alimento | O(1) | Acesso direto |
| Busca de padrão | ~50-200ms | Percorre dicionário |
| Conversão para DataFrame | ~500ms | Para análises |
| Migração para SQLite | ~1-2s | Uma única vez |
| Busca SQL com índice | O(log n) | Para queries complexas |

---

## 📝 Dicas de Produção

1. **Cache em produção**
   ```python
   # Usar Redis para cache distribuído
   import redis
   r = redis.Redis(host='localhost', port=6379, decode_responses=True)
   r.set('alimentos', json.dumps(alimentos))
   ```

2. **Validação de dados**
   ```python
   # Verificar integridade
   for nome, dados in alimentos.items():
       assert 'Nome' in nome
       assert float(dados['Energia']) >= 0
   ```

3. **Versionamento**
   ```python
   # Incluir metadata
   alimentos_com_meta = {
       "_metadata": {
           "versao": "1.0",
           "data": "2024-01-15",
           "total": len(alimentos)
       },
       **alimentos
   }
   ```

