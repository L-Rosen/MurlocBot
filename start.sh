echo "Supression de l'ancien screen"
screen -X -S "murlock" quit
screen -ls
echo "Demmarage du bot"
screen -dmS murlock node index.js
screen -ls