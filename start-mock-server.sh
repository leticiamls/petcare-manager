#!/bin/bash

# Script para iniciar o Mock Backend Server
# Porta: 8080

echo "🐾 Iniciando Mock Backend Server..."
echo ""

# Verificar se a porta 8080 está em uso
if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Porta 8080 já está em uso. Encerrando processo anterior..."
    lsof -ti:8080 | xargs kill -9 2>/dev/null
    sleep 1
fi

# Iniciar o servidor
node mock-server.js

# Manter o script rodando
wait
