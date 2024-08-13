#!/bin/bash -l
set -e

echo "=== Starting Deployment ==="
LAST_DEPLOY_FILE=".last-deploy"
LAST_DEPLOY_SHA=$([ -f $LAST_DEPLOY_FILE ] && cat $LAST_DEPLOY_FILE || echo "main")
CUR_DEPLOY_SHA=$(git rev-parse HEAD)

echo "Deploying: $LAST_DEPLOY_SHA -> $CUR_DEPLOY_SHA"

echo "--- Rebuilding containers ---"
docker compose -f docker-compose.production.yml build

CLIENT_CHANGED=$(git diff --quiet $LAST_DEPLOY_SHA $CUR_DEPLOY_SHA -- packages/website && echo false || echo true)
echo "--- Rebuilding Client ---"
if [[ $CLIENT_CHANGED == "true" ]]; then
  docker compose -f docker-compose.production.yml up website
else
  echo "Skipped: client unchanged"
fi

echo "--- Stopping containers ---"
docker compose -f docker-compose.production.yml down

echo "--- Migrating data ---"
.migrations/001_upgrade-postgres-16_up.sh

echo "--- Starting containers ---"
docker compose -f docker-compose.production.yml up router -d

echo "=== All Done ==="
echo $CUR_DEPLOY_SHA > $LAST_DEPLOY_FILE
