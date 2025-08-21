#!/bin/bash

set -e

scriptPath=$(realpath $0)
scriptDir=$(dirname $scriptPath)

cd "$scriptDir"

IMAGE=$(base64 -i card.svg)
IMAGE="data:image/svg+xml;base64,${IMAGE}"

METADATAJSON=$(yq -o json metadata.yaml | jq --arg urlarg "$IMAGE" '.image = $urlarg')
METADATAJSON=$(echo -n "$METADATAJSON" | base64)


ERC721TOKENURI="data:application/json;base64,${METADATAJSON}"

echo $ERC721TOKENURI
