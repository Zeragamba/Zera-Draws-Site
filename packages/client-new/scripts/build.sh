#!/usr/bin/env bash
set -e

yarn workspace website build
rm -rf ./dist
cp -r ./packages/website/dist ./dist
