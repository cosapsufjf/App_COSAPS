# Estrutura
O backend foi feito usando node, com a biblioteca express e banco de dados mysql, ele implementa o modelo MVC fazendo uma API Rest que permite o acesso do BD a partir de requests do front-end react que usa o arquivo api.ts para centralizar os end-points dos requests relacionados as routes do backend.

## Model
Contém os arquivos de configuração e maniipulação do banco de dados

## Controler
Faz o tratamento inicial do request HTTP e redireciona para o Service

## Service
Faz a análise dos dados recebidos e pelo controller e redireciona para o Model

## Routes 
Define as rotas URL dos requests HTTP


- O schema do BD está em database/schema.sql

A conexão com banco de dados a partir do frontend vai na sequência:

Página React->api.ts->request HTTP -> Routes Backend -> Controller -> Service -> Model

