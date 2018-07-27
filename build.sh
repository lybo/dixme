#!/bin/bash
echo '-------------------- BUILDING CLIENT --------------------' &&
npm run build &&
echo '-------------------- MOVING BUILD FOLDER --------------------' &&
rm -r ../dixme-client-build/build &&
cp -r ./build ../dixme-client-build &&
echo '-------------------- COMMITING NEW BUILD --------------------' &&
echo "message: $1" &&
git --git-dir=../dixme-client-build/.git --work-tree=../dixme-client-build/ add . &&
git --git-dir=../dixme-client-build/.git --work-tree=../dixme-client-build/ commit -am "$1" &&
echo '-------------------- UPLOADING NEW BUILD --------------------' &&
git --git-dir=../dixme-client-build/.git --work-tree=../dixme-client-build/ push origin master &&
echo '-------------------- DONE  --------------------'
