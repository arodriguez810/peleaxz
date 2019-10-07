@ECHO OFF
start .\webserver
start webstorm ../
start .\db
start .\notes
TIMEOUT 5
cd ../admin
start run.bat
TIMEOUT 5
start firefox localhost:8090
exit
PAUSE