#! /bin/bash
set -e
DATE=$(date +%s)
mkdir /tmp/$DATE
pushd /tmp/$DATE
git clone git@github.com:willm/AssetProjections.git
popd
cp ./index.html /tmp/$DATE/AssetProjections
cp -R static /tmp/$DATE/AssetProjections/
pushd /tmp/$DATE/AssetProjections
git add -A
git commit -m "$(date)"
git push origin master
popd
