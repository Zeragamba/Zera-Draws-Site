#!/bin/bash -l

docker compose -f docker-compose.production.yml build
docker compose -f docker-compose.production.yml up client
docker compose -f docker-compose.production.yml down
docker compose -f docker-compose.production.yml up router -d

echo "=== All Done ==="
