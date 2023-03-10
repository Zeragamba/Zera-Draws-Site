#!/usr/bin/env bash
set -e

set -o allexport
source .env

echo "=== Entering maintenance mode ==="
cp ./assets/web/deploy.html ./offline.html

echo "=== Updating repo ==="
git pull

cd og-injector
  echo "=== Stopping OG Injector ==="
  sudo systemctl stop og-injector

  echo "=== Updating OG Injector ==="
  yarn install

  echo "=== Starting OG Injector ==="
  sudo systemctl start og-injector
cd ..

cd server
  echo "=== Stopping server ==="
  sudo systemctl stop rails

  echo "=== Updating server ==="
  bundle
  bundle exec whenever --update-crontab

  echo "=== Migrating Database ==="
  rails db:migrate

  echo "=== Starting server ==="
  sudo systemctl start rails
cd ..

cd client
  echo "=== Updating client ==="
  yarn install

  echo "=== Building client ==="
  yarn build
cd ..

rm ./offline.html
echo "=== All Done ==="
