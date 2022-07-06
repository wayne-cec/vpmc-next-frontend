echo off
set arg1=%1
docker login -u jimmg35 -p %arg1%
docker image rm jimmg35/vpmc-frontend
docker build . -t jimmg35/vpmc-frontend
docker push jimmg35/vpmc-frontend
pause