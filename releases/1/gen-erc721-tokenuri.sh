#!/bin/bash

set -e

scriptPath=$(realpath $0)
scriptDir=$(dirname $scriptPath)

cd "$scriptDir"

base64 -i card.svg > card.svg.base64

