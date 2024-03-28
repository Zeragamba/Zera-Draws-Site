#!/bin/bash -l
set -e
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # Load NVM

set -o allexport
source .env

echo "=== Entering maintenance mode ==="
cp ./assets/web/deploy.html ./offline.html

echo "=== Updating repo ==="
git pull

echo "=== Updating node ==="

cd og-injector
  echo "=== Updating OG Injector ==="
  nvm install
  yarn install
cd ..

cd server
  echo "=== Updating server ==="
  rvm use

  bundle config set --local deployment 'true'
  bundle config set --local without 'development test'
  bundle install

  echo "=== Migrating Database ==="
  rails db:migrate

  bundle exec whenever --update-crontab
cd ..

cd client
  echo "=== Updating client ==="
  nvm install
  yarn install

  echo "=== Building client ==="
  yarn build
cd ..

echo "=== Restarting Passenger ==="
passenger-config restart-app $(pwd)

rm ./offline.html
echo "=== All Done ==="
