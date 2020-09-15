#!/usr/bin/env bash
set -ex

SCRIPT_DIR=$(dirname "${0}")

pushd "${SCRIPT_DIR}"/../lambda

yarn
yarn test
yarn deploy

popd
