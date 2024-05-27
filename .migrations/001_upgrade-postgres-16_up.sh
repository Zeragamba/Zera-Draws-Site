#!/usr/bin/env bash
set -e

OLD_DATA_VOL=./.volumes/database
NEW_DATA_VOL=./.volumes/db/pg16
source .env

# check if migration already applied
if [ -f .migrations/001.done ]; then
  echo "Migration already complete, skipping"
  exit 0
fi

docker run --rm \
	-v $OLD_DATA_VOL:/var/lib/postgresql/15/data \
	-v $NEW_DATA_VOL:/var/lib/postgresql/16/data \
	-e PGUSER=$DB_USER \
  -e PGPASS=$DB_PASS \
  -e POSTGRES_INITDB_ARGS="--username=$DB_USER" \
	tianon/postgres-upgrade:15-to-16

docker compose run --rm \
  db \
  bash -c 'echo "host all all all md5" >> /var/lib/postgresql/data/pg_hba.conf'

touch .migrations/001.done
