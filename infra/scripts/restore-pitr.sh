#!/bin/bash
# DISASTER RECOVERY SCRIPT - PITR

TARGET_TIME=$1

if [ -z "$TARGET_TIME" ]; then
  echo "Error: Missing target time!"
  echo "Example: ./restore-pitr.sh '2026-03-04 09:42:50+00'"
  exit 1
fi

echo " STARTING PITR RESTORE TO: $TARGET_TIME"

# 1. Stop DB
sudo docker service scale core_stack_postgres=0

# 2. Run recovery container
sudo docker run --rm \
  -v core_stack_pgdata:/var/lib/postgresql/data \
  -e WALG_GS_PREFIX=gs://voltarocks-postgres-backup \
  -e GOOGLE_APPLICATION_CREDENTIALS_AUTO="true" \
  asia-southeast1-docker.pkg.dev/voltarocks-42-sandbox/cloud-engineer-repo/postgres-walg:15 bash -c "
    echo 'Cleaning corrupted data...' && rm -rf /var/lib/postgresql/data/* && \
    echo 'Fetching Base Backup...' && wal-g backup-fetch /var/lib/postgresql/data LATEST && \
    touch /var/lib/postgresql/data/recovery.signal && \
    echo \"restore_command = 'wal-g wal-fetch %f %p'\" > /var/lib/postgresql/data/postgresql.auto.conf && \
    echo \"recovery_target_time = '$TARGET_TIME'\" >> /var/lib/postgresql/data/postgresql.auto.conf && \
    echo \"recovery_target_action = 'promote'\" >> /var/lib/postgresql/data/postgresql.auto.conf && \
    chown -R postgres:postgres /var/lib/postgresql/data && chmod 700 /var/lib/postgresql/data
  "

# 3. Start DB
sudo docker service scale core_stack_postgres=1

echo " DONE! Waiting for Postgres to replay WAL files..."