if [ -f ../.env ]; then
    source ../.env
else
    exit 1
fi

eval "$($HOME/miniconda3/bin/conda shell.bash hook)" && conda activate $CONDA_ENV
echo "Running in production mode..."
python -m uvicorn server:app --host $PRODUCTION_SERVER_IP --port $SERVER_PORT --workers 2  --use-colors
