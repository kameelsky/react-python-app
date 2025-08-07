if [ -f ../.env ]; then
    source ../.env
else
    exit 1
fi

eval "$($HOME/miniconda3/bin/conda shell.bash hook)" && conda activate $CONDA_ENV
echo "Preparing for running in production mode..."
python -m uvicorn server:app --host $NEXT_PUBLIC_PRODUCTION_SERVER_IP --port $NEXT_PUBLIC_SERVER_PORT --workers 2  --use-colors
