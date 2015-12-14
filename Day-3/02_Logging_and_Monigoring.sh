#!/bin/bash

export ROOT_DIR=$(cd $(dirname $0)/.. && pwd)

cd $ROOT_DIR/content/server
grunt serve --content=../presentations/logging-monitoring.md
