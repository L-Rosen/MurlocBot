const {Client, GatewayIntentBits, Collection} = require('discord.js');
const {Player} = require('discord-player');

global.client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

require('./src/logger.js');//On charge le logger
client.config = require('./config.js');//On charge la config
global.color = client.config.app.color;//On charge la couleur du bot
if (color === undefined) {
    color = "#ffae00";
}

//On log les infos de démarrage
logger.Info("");
logger.Info(client.config.Logs.init);

//On charge les commandes et les events du bot
require('./src/loader.js');


//On charge le player
global.player = new Player(client, {
    ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25
    }
});
player.extractors.loadDefault();

client.start_time = new Map();//On initialise la map qui contiendra les start_time des utilisateurs
client.paused_time = new Map();//On initialise la map qui contiendra les paused_time des utilisateurs

client.login(client.config.app.token);

