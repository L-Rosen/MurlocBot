const {Events} = require('discord.js');
const {QueryType} = require("discord-player");
const fs = require('fs');
const editData = require('../src/data/editData.js');

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState) {
        //Dès qu'un utilisateur rejoint un salon vocal un rejoins le salon vocal et on joue le son stocké dans le dossier sounds nommé "default.mp3"
        try {
            if (oldState.channel === null && !newState.member.user.bot) {

                var sound = client.config.app.murlock_sound;
                //On regarde si un fichier user.tag.mp3 existe dans le dossier sounds et si oui la varuable sound est égale à user.tag.mp3 sinon client.config.app.murlock_sound
                if (fs.existsSync('./sounds/' + newState.member.user.tag + '.mp3')) {
                    sound = './sounds/' + newState.member.user.tag + '.mp3';
                }

                //On attend 500ms pour que l'utisateur soit bien connecté au salon vocal avant de jouer le son
                await new Promise(resolve => setTimeout(resolve, 500));

                //On joue le son
                await player.play(newState.channel, sound, {
                    searchEngine: QueryType.FILE,
                });

                await editData.incrementMurlocks(newState.member.id);
                logger.Info(client.config.Logs.event.voiceStateUpdate.successfull_murlock.replace("$s", newState.member.user.tag));
            }
        } catch (e) {
            logger.Error(client.config.Logs.event.voiceStateUpdate.error_murlock.replace("%s", newState.member.user.tag));
        }
    }
}