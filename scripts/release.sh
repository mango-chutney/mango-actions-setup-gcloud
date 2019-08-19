#! /bin/bash

echo "This script will release a new major version to github"

read -p "What version are you releasing? " version

git checkout releases/v$version
git push origin :refs/tags/v$version
git tag -fa v$version -m "Update v$version tag"
git push origin v$version