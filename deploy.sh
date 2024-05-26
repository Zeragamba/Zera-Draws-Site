#!/bin/bash -l
set -e

echo "=== Starting Deployment ==="
LAST_DEPLOY_FILE=".last-deploy"
LAST_DEPLOY_SHA=$([ -f $LAST_DEPLOY_FILE ] && cat $LAST_DEPLOY_FILE || echo "main")
CUR_DEPLOY_SHA=$(git rev-parse HEAD)

echo "Deploying: $LAST_DEPLOY_SHA -> $CUR_DEPLOY_SHA"

echo "--- Rebuilding containers ---"
docker compose -f docker-compose.production.yml build

CLIENT_CHANGED=$(git diff --quiet $LAST_DEPLOY_SHA $CUR_DEPLOY_SHA -- client && echo false || echo true)
echo "client changed: $CLIENT_CHANGED"
if [[ $CLIENT_CHANGED == "true" ]]; then
  echo "--- Rebuilding Client ---"
  docker compose -f docker-compose.production.yml up client
fi

echo "--- Restarting containers ---"
docker compose -f docker-compose.production.yml down
docker compose -f docker-compose.production.yml up router -d

echo "=== All Done ==="
echo $CUR_DEPLOY_SHA > $LAST_DEPLOY_FILE
