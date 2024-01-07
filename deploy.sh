#!/bin/bash -l
set -e
source $HOME/.bashrc

set -o allexport
source .env

echo "=== Entering maintenance mode ==="
cp ./assets/web/deploy.html ./offline.html

echo "=== Updating repo ==="
git pull

cd og-injector
  echo "=== Updating OG Injector ==="
  nvm use
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
  nvm use
  yarn install

  echo "=== Building client ==="
  yarn build
cd ..

echo "=== Restarting Passenger ==="
passenger-config restart-app $(pwd)

rm ./offline.html
echo "=== All Done ==="
