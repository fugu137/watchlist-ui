#!/bin/bash

set -e

ROOT_DIR=$(pwd)
PORT=3000

run_functional_tests() {
    echo "Running functional tests..."

    cd $ROOT_DIR/functional-tests
    gauge run --verbose
}

start_app() {
    echo "Starting application..."
    cd $ROOT_DIR/functional-tests
    sudo docker-compose up -d

    sleep 12
}

stop_app() {
    echo "Shutting down application..."
    sudo docker-compose down
}

start_app
run_functional_tests || stop_app
stop_app

