#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd dist

aws s3 cp ./ s3://$BUCKET_NAME/ --recursive
aws cloudfront create-invalidation --distribution-id=$CLOUDFRONT_DIST_ID --paths *

cd -