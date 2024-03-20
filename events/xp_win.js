const {AttachmentBuilder, Events, userMention} = require('discord.js');
const {murloc_icon} = require("../src/assets/murloc_icon");

const dbFetch = require('../src/data/fetchData.js');
const dbEdit = require('../src/data/editData.js');

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState) {
        //Dès que l'utilisateur rejoins un vocal alors on lance un chronomètre , lorsqu'il quitte le vocal on calcule l'xp qu'il a gagné , l'utilisateur gagne 5 xp toutes les 30 minutes
            if (oldState.channel === null && !newState.member.user.bot && newState.member.roles.cache.has(client.config.commands.roles.default) && newState.channel.members.size > 1) {
                //On met a jour le start_time de l'utilisateur
                if (newState.channel.members.size === 2) {//Si il n'y a que 2 personnes dans le vocal et que l'autre est un bot alors on ne lance pas le chronomètre
                    for (let member of newState.channel.members) {
                        if(member[1].user.bot){
                            return;
                        }
                    }
                }
                client.start_time.set(newState.member.id, Date.now());
                logger.Info('[TIMER] Départ du chrono pour ' + newState.member.user.tag);

            }else if (oldState.channel != null && newState.channel == null && !newState.member.user.bot && newState.member.roles.cache.has(client.config.commands.roles.default) && client.start_time.get(newState.member.id) !== undefined){//Rajout de l'xp
                //On récupère le temps de fin
                const endTime = Date.now();
                //Si l'utilisateur possède une paused_time alors on lui enlève et on lui rajoute le temps passé dans le vocal a sa start_time
                if(client.paused_time.get(newState.member.id) !== undefined){
                    let current_paused_time = client.paused_time.get(newState.member.id);
                    let current_start_time = client.start_time.get(newState.member.id);
                    client.paused_time.delete(newState.member.id);
                    client.start_time.set(newState.member.id, current_start_time + (endTime - current_paused_time));
                }
                //On récupère le temps passé dans le vocal
                const timeSpent = endTime - client.start_time.get(newState.member.id);//Nombres ms passé dans la voc 1800000 = 30min 360000 = 6min , 60000 = 1min
                const minute = 60000;
                //On récupère la liste des utilisateurs du vocal
                delete client.start_time.delete(newState.member.id);

                if(timeSpent >= 360000){
                    console.log(timeSpent);
                        //On récupère l'xp actuel de l'utilisateur et on lui ajoute l'xp gagné
                    let currentLevel = await dbFetch.getLevel(newState.member.id);

                    if (currentLevel >= 20) {
                        return;
                    }

                    const currentXp = await dbFetch.getXp(newState.member.id);
                    const xp_gain = Math.floor((timeSpent/(minute*6)));//Un point d'xp toutes les 6 minutes
                    let new_xp = currentXp + xp_gain;

                    await dbEdit.setXp(newState.member.id, new_xp);
                    logger.Info(client.config.Logs.xp.xp_gain.replace("%s", newState.member.user.tag).replace("%d", xp_gain));

                    const channel = client.channels.cache.get(client.config.app.murlock_channel);
                    channel.send(client.config.Logs.xp.xp_reply.replace("%u", userMention(newState.member.id)).replace("%s", xp_gain));

                    while (new_xp >= 0.8 * Math.pow(currentLevel + 1, 3)) {
                        if (currentLevel >= 20) {
                            break;
                        }
                        await dbEdit.incrementLevel(newState.member.id);
                        currentLevel += 1;
                        logger.Info(client.config.Logs.xp.level_up.replace("%d", currentLevel));
                        const asset = await murloc_icon(currentLevel, new_xp);
                        const attachment = new AttachmentBuilder(await asset, {name: "murloc.png"});
                        channel.send({
                            content: client.config.Logs.xp.level_up_reply.replace("%s", userMention(newState.member.id)),
                            files: [attachment]
                        });
                    }
                }
            }
    }
}
