#!/usr/bin/env sh

# abort on errors
set -e
yarn build
cd dist
aws s3 cp ./ s3://$BUCKET_NAME/ --recursive
aws cloudfront create-invalidation --distribution-id=$CLOUDFRONT_DIST_ID --paths "/*"
cd -