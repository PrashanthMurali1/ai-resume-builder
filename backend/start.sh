#!/usr/bin/env bash
set -euo pipefail

# Load .env if present (ignore commented / blank lines)
if [ -f .env ]; then
	# shellcheck disable=SC2046
	export $(grep -v '^#' .env | grep '=' | xargs) || true
fi

echo "[start.sh] Using OLLAMA_MODEL='${OLLAMA_MODEL:-<unset>}' OLLAMA_URL='${OLLAMA_URL:-<unset>}' BACKEND_PORT='${BACKEND_PORT:-8000}'"
echo "[start.sh] Launching uvicorn (reload) PID $$"

PIDFILE=${PIDFILE:-.uvicorn.pid}

run_server() {
	uvicorn app.main:app \
		--host 127.0.0.1 \
		--port "${BACKEND_PORT:-8000}" \
		${UVICORN_RELOAD_FLAG:---reload}
}

if [ "${BACKGROUND:-0}" = "1" ]; then
	echo "[start.sh] Starting in background (PID file: $PIDFILE)"
	run_server &
	SVPID=$!
	echo $SVPID > "$PIDFILE"
	echo "[start.sh] Wrote parent PID $SVPID to $PIDFILE"
	wait $SVPID
else
	run_server
fi

