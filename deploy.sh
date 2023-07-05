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
  yarn install
cd ..

cd server
  echo "=== Updating server ==="
  bundle
  bundle exec whenever --update-crontab

  echo "=== Migrating Database ==="
  rails db:migrate
cd ..

cd client
  echo "=== Updating client ==="
  yarn install

  echo "=== Building client ==="
  yarn build
cd ..

echo "=== Restarting Passenger ==="
passenger-config restart-app $(pwd)

rm ./offline.html
echo "=== All Done ==="
