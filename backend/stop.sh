#!/usr/bin/env bash
set -euo pipefail
PIDFILE=${PIDFILE:-.uvicorn.pid}

if [ -f "$PIDFILE" ]; then
  PARENT_PID=$(cat "$PIDFILE" || true)
  if [ -n "$PARENT_PID" ] && ps -p "$PARENT_PID" > /dev/null 2>&1; then
    echo "[stop.sh] Killing parent uvicorn PID $PARENT_PID"
    kill "$PARENT_PID" || true
    sleep 0.5
  fi
fi

# Kill any leftover reload workers / watchers
PIDS=$(pgrep -f 'uvicorn.*app.main:app' || true)
if [ -n "$PIDS" ]; then
  echo "[stop.sh] Forcing kill of: $PIDS"
  kill $PIDS || true
  sleep 0.5
fi

# Escalate if still alive
LEFT=$(pgrep -f 'uvicorn.*app.main:app' || true)
if [ -n "$LEFT" ]; then
  echo "[stop.sh] Still running, sending SIGKILL: $LEFT"
  kill -9 $LEFT || true
fi

rm -f "$PIDFILE" 2>/dev/null || true

echo "[stop.sh] Done"
