#!/bin/bash

# Inicia o MongoDB
echo "Iniciando o MongoDB..."
sudo systemctl start mongod

# Aguarda o MongoDB iniciar (opcional, ajustável conforme necessário)
echo "Aguardando o MongoDB iniciar..."
sleep 5  # Aguarda 5 segundos (ajuste conforme necessário)

# Inicia o servidor Uvicorn
echo "Iniciando o Uvicorn..."
uvicorn app.main:app --reload --log-level debug
