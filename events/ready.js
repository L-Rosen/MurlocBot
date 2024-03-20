const {Events, ActivityType} = require('discord.js');
const dbFunctions = require('../src/data/init.js');
const fs = require('fs');
const path = require("path");


module.exports = {
    name: Events.ClientReady,
    once: true,
    execute() {

        //On defini le status du bot

        if (client.config.app.activity_type === "WATCHING") {
            client.user.setActivity(client.config.app.activity_name, {type: ActivityType.Watching});
        } else if (client.config.app.activity_type === "LISTENING") {
            client.user.setActivity(client.config.app.activity_name, {type: ActivityType.Listening});
        } else if (client.config.app.activity_type === "PLAYING") {
            client.user.setActivity(client.config.app.activity_name, {type: ActivityType.Playing});
        } else {
            client.user.setActivity(client.config.app.activity_name, {type: ActivityType.Watching});
        }

        //On defini le status du bot , on log et on sync la base de données
        dbFunctions.fillDatabase();//On rempli la base de données
        logger.Info(client.config.Logs.event.ready.replace("%s", client.user.tag));
    }
};
