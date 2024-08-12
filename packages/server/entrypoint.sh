#!/bin/bash
set -e
rm -f /opt/server/tmp/pids/server.pid
exec "$@"
