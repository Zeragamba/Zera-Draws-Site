#!/usr/bin/env bash
set -e

OLD_DATA_VOL=./.volumes/database
NEW_DATA_VOL=./.volumes/db/pg16
source .env

# check if migration already applied
if [ ! -f .migrations/001.done ]; then
  echo "Migration already rolledback, skipping"
  exit 0
fi

sudo rm -rf $NEW_DATA_VOL

rm .migrations/001.done
