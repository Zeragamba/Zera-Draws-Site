#!/usr/bin/env bash
set -e

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

  bundle
  bundle exec whenever --update-crontab

  echo "=== Migrating Database ==="
  rails db:migrate
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
