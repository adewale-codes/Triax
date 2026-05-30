#!/bin/bash
echo "Waiting for Ollama to start..."
sleep 10
ollama pull llama3.2:3b
ollama pull nomic-embed-text
echo "Models ready."
