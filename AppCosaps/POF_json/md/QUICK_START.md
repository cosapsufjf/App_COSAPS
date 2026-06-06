# ⚡ Quick Start - Guia de Implementação

## 📋 Checklist Rápido

### Passo 1: Backup (Opcional mas Recomendado)
```bash
cp extract.py extract_original.py
```

### Passo 2: Escolher Versão
```bash
# ✅ Recomendado: Versão equilibrada
python extract_optimized.py

# ⚡ Ultra rápido: Com multithreading
python extract_ultra_optimized.py
```

### Passo 3: Monitorar Execução
```bash
# O script mostrará progresso em tempo real:
🔄 Iniciando leitura do PDF com paralelização...
✅ PDF lido em 12.34s | Total de tabelas: 305
  [Tabela 50/305] ETA: 45.2s | Processadas: 50
  [Tabela 100/305] ETA: 32.5s | Processadas: 100
  ...
✨ Processamento concluído!
⏱️  Tempo total: 547.23s
📊 Taxa: 0.56 tabelas/segundo
```

### Passo 4: Verificar Resultado
```bash
ls -lh stream/alimentos.json
# -rw-r--r-- 1 user group 15M Jan 15 10:30 stream/alimentos.json

# Testar integridade
python -c "
import json
with open('stream/alimentos.json') as f:
    dados = json.load(f)
print(f'✅ {len(dados)} alimentos carregados com sucesso!')
"
```

### Passo 5: Usar em Aplicação
```python
import json

with open('stream/alimentos.json') as f:
    ALIMENTOS = json.load(f)

# Busca O(1)
dados = ALIMENTOS['Arroz branco cozido']
print(f"Energia: {dados['Energia']} kcal")
```

---

## 🎯 Cenários de Uso

### Se quer a **maior velocidade possível**:
```bash
python extract_ultra_optimized.py
# Tempo estimado: 6-12 minutos
# Uso: 20-30% CPU, 2-3GB RAM
```

### Se quer **equilíbrio entre velocidade e simplicidade**:
```bash
python extract_optimized.py
# Tempo estimado: 8-16 minutos
# Uso: 10-20% CPU, 1-2GB RAM
```

### Se depois precisar de **buscas avançadas**:
```python
# Converter para SQLite (após executar os scripts acima)
python -c "from EXEMPLOS_USO import json_para_sqlite; json_para_sqlite()"
# Cria: alimentos.db com índices
```

---

## 🔍 Troubleshooting

### ❌ "File not found: teste.pdf"
```bash
# Certifique-se que o PDF está no diretório correto
ls -la teste.pdf
# Se não existe, ajuste o caminho em extract_optimized.py:
# camelot.io.read_pdf("caminho/para/seu/arquivo.pdf", ...)
```

### ❌ "MemoryError"
```bash
# Aumentar SWAP ou reduzir BATCH_SIZE
# Em extract_optimized.py, mude:
BATCH_SIZE = 25  # ao invés de 50
```

### ❌ "JSON file too large"
```bash
# Se o JSON final fica muito grande, comprimir:
import gzip
import json

with open('stream/alimentos.json', 'rb') as f_in:
    with gzip.open('stream/alimentos.json.gz', 'wb') as f_out:
        f_out.writelines(f_in)

# Reduz para ~2MB (80% de compressão)
```

### ⚠️ Script muito lento
```bash
# Aumentar BATCH_SIZE para reduzir overhead
BATCH_SIZE = 100  # ou 150

# Aumentar MAX_WORKERS (se usar ultra_optimized)
MAX_WORKERS = 12  # ao invés de 8
```

---

## 📊 Validação Rápida

### Verificar Integridade
```python
import json

def validar_json():
    with open('stream/alimentos.json', 'r') as f:
        dados = json.load(f)
    
    # Validações básicas
    assert len(dados) > 0, "JSON vazio!"
    
    # Verificar estrutura
    primeira_chave = list(dados.keys())[0]
    primeira_valor = dados[primeira_chave]
    
    campos_esperados = ['CD', 'CP', 'Desc', 'Energia', 'Proteina', 'Lipideos', 'Carboidrat', 'FibraAl']
    for campo in campos_esperados:
        assert campo in primeira_valor, f"Campo {campo} faltando!"
    
    print(f"✅ JSON válido com {len(dados)} alimentos")
    print(f"Primeiro alimento: {primeira_chave}")
    print(f"Estrutura: {primeira_valor}")

validar_json()
```

### Comparar com Original
```bash
# Se tiver o arquivo original para comparar:
wc -l stream/table_json.json
# Deve ter aproximadamente: (número_alimentos) linhas

# Verificar tamanho
du -h stream/alimentos.json stream/table_json.json
```

---

## 🚀 Próximos Passos

### Opção 1: Usar em Aplicação Web (Flask)
```bash
pip install flask
python -c "
from flask import Flask, jsonify
import json

app = Flask(__name__)
with open('stream/alimentos.json') as f:
    ALIMENTOS = json.load(f)

@app.route('/api/alimento/<nome>')
def get(nome):
    return jsonify(ALIMENTOS.get(nome, {}))

app.run()
"
# Acesso: http://localhost:5000/api/alimento/Arroz%20branco%20cozido
```

### Opção 2: Criar Índice SQLite (Queries avançadas)
```bash
python -c "
import sqlite3, json

with open('stream/alimentos.json') as f:
    alimentos = json.load(f)

conn = sqlite3.connect('alimentos.db')
c = conn.cursor()
c.execute('CREATE TABLE alimentos (nome TEXT, energia REAL, proteina REAL)')

for nome, dados in alimentos.items():
    c.execute('INSERT INTO alimentos VALUES (?, ?, ?)',
        (nome, float(dados['Energia']), float(dados['Proteina'])))

c.execute('CREATE INDEX idx_nome ON alimentos(nome)')
conn.commit()
print('✅ SQLite criado!')
"
```

### Opção 3: Comprimir com Gzip (Economizar espaço)
```bash
gzip -k stream/alimentos.json
ls -lh stream/alimentos.json*
# alimentos.json.gz deve ter ~2-3MB (80% menor)
```

---

## 📈 Métricas Esperadas

### Processamento
- **Tabelas por segundo:** 0.5-1.0
- **Tempo total:** 8-16 minutos (305 páginas)
- **Taxa de sucesso:** >95% (algumas tabelas podem falhar)

### Arquivo Final
- **Número de alimentos:** 5,000-10,000 (depende do PDF)
- **Tamanho JSON:** 15-25MB
- **Tamanho JSONL:** 18-28MB
- **Tamanho SQLite:** 12-20MB
- **Tamanho Gzip:** 2-4MB

### Recursos
- **CPU:** 10-30% (idle quando esperando I/O)
- **RAM:** 1-3GB pico
- **I/O:** 95% redução vs original

---

## 💬 FAQ Rápido

**P: Qual versão escolher?**
R: Use `extract_optimized.py` para maioria dos casos. Ultra é para quando precisa máxima velocidade.

**P: O processamento é determinístico?**
R: Sim, mesmos dados = mesmo resultado (ordem pode variar com threading, mas conteúdo é idêntico).

**P: Posso interromper o script?**
R: Sim (Ctrl+C), mas o JSON final ficará incompleto. Comece de novo.

**P: O PDF precisa ser reformatado?**
R: Não, o Camelot é robusto. Funciona com tabelas complexas.

**P: Posso usar o JSON com Python/Node/Java?**
R: Sim! JSON é universal. Veja exemplos em EXEMPLOS_USO.md.

**P: Preciso deletar os temporários?**
R: A versão otimizada não cria temporários. Original cria table_*.json/csv.

---

## 🔧 Personalizações

### Mudar tamanho do batch
Em `extract_optimized.py`:
```python
BATCH_SIZE = 100  # ao invés de 50
# Mais rápido (menos I/O) mas usa mais RAM
```

### Mudar número de threads
Em `extract_ultra_optimized.py`:
```python
MAX_WORKERS = 16  # ao invés de 8
# Mais rápido com multi-core
```

### Adicionar campos extras
Em `read_csv()`:
```python
HEADERS = ["CD", "Nome", "CP", "Desc", "Energia", "Proteina", 
           "Lipideos", "Carboidratos", "FibraAlimentar", "NOVO_CAMPO"]
NUM_HEADERS = len(HEADERS)
```

---

## 📞 Support

Se algo não funcionar:

1. **Verificar PDF:**
   ```bash
   python -c "import camelot.io; t = camelot.io.read_pdf('teste.pdf', pages='1'); print(len(t))"
   ```

2. **Ver logs detalhados:**
   Modifique o script e adicione:
   ```python
   import logging
   logging.basicConfig(level=logging.DEBUG)
   ```

3. **Comparar com original:**
   ```bash
   python extract.py  # original
   ls -la stream/table_json.json  # tamanho
   ```

4. **Testar em pequena escala:**
   ```bash
   # Processar apenas primeiras 10 páginas
   tables_s = camelot.io.read_pdf("teste.pdf", pages="1-10", ...)
   ```

