#! /bin/bash
set -e
npm install
npm test
npm run build
date=date +"%s"
mkdir /tmp/$date
cd /tmp/$date
git clone git@github.com:willm/AssetProjections.git
cp asset-projections.html /tmp/$date/AssetProjections
cp -R static /tmp/$date/AssetProjections/
cd /tmp/$date/AssetProjections
git add -A
git commit -m "$(date)"
git push origin master
