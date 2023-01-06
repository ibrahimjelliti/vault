#!/usr/bin/env bash

set -e

binpath=${VAULT_INSTALL_DIR}/vault

fail() {
  echo "$1" 2>&1
  return 1
}

retry() {
  local retries=$1
  shift
  local count=0

  until "$@"; do
    exit=$?
    wait=$((10 ** count))
    count=$((count + 1))
    if [ "$count" -lt "$retries" ]; then
      sleep "$wait"
    else
      return "$exit"
    fi
  done

  return 0
}

check_pr_status() {
  pr_status=$($binpath read -format=json sys/replication/performance/status)
  cluster_state=$($binpath read -format=json sys/replication/performance/status | jq -r '.data.state')

  if [[ "$cluster_state" == 'idle' ]]; then
    fail "expected cluster state to be not idle"
  fi
}

test -x "$binpath" || fail "unable to locate vault binary at $binpath"

# Retry a few times because it can take some time for replication to sync
retry 5 check_pr_status
echo $pr_status
