#! /bin/bash

echo "This script will prepare a new alpha branch and sync with github"

read -p "What version are you creating? " version

git checkout -b releases/v$version
rm -rf node_modules
sed -i '/node_modules/d' .gitignore
npm install --production
git add .
git commit -m "Init Version $version"
git push origin releases/v$version