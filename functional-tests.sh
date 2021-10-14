#!/bin/bash

set -e

ROOT_DIR=$(pwd)
PORT=3000


# ui_running=false


# start_ui() {
#     echo "Checking if watchlist website is running..."

#     PID="$(lsof -i tcp:$PORT | awk '{print $1, $2}' | grep node)" || true

#     if [[ $PID != "" ]]
#         then
#             echo "Watchlist website is already running!"
#             ui_running=true
#         else
#             echo "Starting watchlist website..."
#             npm start &
#     fi
# }

run_functional_tests() {
    echo "Running functional tests..."

    cd $ROOT_DIR/functional-tests
    gauge run --verbose
}

# cleanup() {
#     PID="$(lsof -i tcp:$PORT | awk '{print $1, $2}' | grep node)" || true

#     if [[ $ui_running ]]; then
#         echo "Shutting down website..."
#         kill $PID
#     fi
# }


run_functional_tests