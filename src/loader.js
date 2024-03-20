const fs = require('node:fs');
const path = require('node:path');
const {Collection, REST, Routes} = require("discord.js");
var cmd = false;


try {
    //Command Loader
    client.commands = new Collection();
    const foldersPath = path.join(__dirname, '../commands');
    const folders = fs.readdirSync(foldersPath);
    cmd = true;

    logger.Info(client.config.Logs.loader.commands.loading_command);
    for (const folder of folders) {
        const commandPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandPath, file);
            const command = require(filePath);

            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
                logger.Info(client.config.Logs.loader.commands.succes_command.replace("%s", command.data.name));
            } else {
                logger.Error(client.config.Logs.loader.commands.error_command.replace("%s", filePath));
            }
        }
    }

    //log
    if (client.commands.size === 0) {
        logger.Warn(client.config.Logs.loader.commands.warrning_no_commands);
    } else {
        logger.Info(client.config.Logs.loader.commands.succes_command_loading);
    }

    //Event Loader
    logger.Info(client.config.Logs.loader.events.loading_event);
    const eventPath = path.join(__dirname, '../events');
    const eventFiles = fs.readdirSync(eventPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(eventPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
            logger.Info(client.config.Logs.loader.events.succes_event.replace("%s", event.name));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
            logger.Info(client.config.Logs.loader.events.succes_event.replace("%s", event.name));
        }
    }

    if (eventFiles.length === 0) {
        logger.Warn(client.config.Logs.loader.events.warrning_no_events);
    } else {
        logger.Info(client.config.Logs.loader.events.succes_event_loading);
    }

    //Interval Loader
    interval = require('../interval/checking_voc.js');
    setInterval(() => interval.checkvoc(), interval.timeout);

} catch (e) {
    if (e.code === "ENOENT") {
        if (!cmd) {
            logger.Error(client.config.Logs.loader.commands.dir_not_found.replace("%s", e.path.replace(/^.*[\\\/]/, '')).replace("%d", e.path));
        } else {
            logger.Error(client.config.Logs.loader.events.dir_not_found.replace("%s", e.path.replace(/^.*[\\\/]/, '')).replace("%d", e.path));
        }
    }
}