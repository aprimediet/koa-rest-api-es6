#!/usr/bin/env bash

printf "Installing nodejs ..."
sudo apt-get -qq install -y npm libssl-dev build-essential

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash

source $HOME/.nvm/nvm.sh

nvm install 5.3.0
nvm alias default node
