#!/bin/bash
npm run build &&
rm -r ../dixme-client-build/build &&
cp -r ./build ../dixme-client-build &&
git --git-dir=../dixme-client-build/.git --work-tree=../dixme-client-build/ add . &&
git --git-dir=../dixme-client-build/.git --work-tree=../dixme-client-build/ commit -am "$1" &&
git --git-dir=../dixme-client-build/.git --work-tree=../dixme-client-build/ push origin master &&
echo 'DONE' &&
echo $1

