#!/bin/bash
echo "Waiting for Ollama to start..."
sleep 10
ollama pull llama3.1:8b
ollama pull nomic-embed-text
echo "Models ready."
