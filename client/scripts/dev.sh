if [ -f ../.env ]; then
    source ../.env
else
    exit 1
fi
PORT=$CLIENT_PORT next dev