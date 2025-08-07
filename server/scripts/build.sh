if [ -f ../.env ]; then
    source ../.env
else
    exit 1
fi

ENV_FILE="environment.yml"

create_update_env() {
    echo -e "\n# Python virtual environment"
    eval "$($HOME/miniconda3/bin/conda shell.bash hook)"
    conda config --add channels conda-forge
    conda config --set channel_priority flexible

    if conda env list | grep -q "$CONDA_ENV"; then
        echo "Environment '$CONDA_ENV' exists. Updating environment..."
        conda env update -n "$CONDA_ENV" -f "$ENV_FILE" &> /dev/null
    else
        echo "Creating environment: $CONDA_ENV"
        conda env create -n "$CONDA_ENV" -f "$ENV_FILE"
    fi
}

echo -e "\n# Miniconda"

if ! command -v conda &> /dev/null; then
    echo "Conda is not installed."
    read -p "Do you want to install Miniconda now? [y/n]: " answer
    if [[ "$answer" =~ ^[Yy]$ ]]; then
        echo "Installing Miniconda..."
        wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O Miniconda.sh || {
            echo "Failed to download Miniconda installer. Make sure you have wget installed. Exiting script."
            exit 1
        }
        bash Miniconda.sh -b -p "$HOME/miniconda3"
        echo "Miniconda was installed in: $HOME/miniconda3"
        create_update_env
    else
        echo "Miniconda installation skipped."
        echo "Exiting script" && exit 1
    fi
else
    echo "Conda is installed."
    create_update_env
fi

echo "Finished with no errors."
