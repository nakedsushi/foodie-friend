#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd dist

aws s3 cp ./ s3://$BUCKET_NAME/ --recursive

cd -