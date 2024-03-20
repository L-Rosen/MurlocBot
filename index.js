const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ]
});

client.config = require('./config.json');

client.on('ready', () => {
    console.log('I am ready!');
});

client.login(client.config.token);