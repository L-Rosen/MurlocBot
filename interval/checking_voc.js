module.exports = {
    timeout: 60000,//Temps de la boucle en ms
    checkvoc() {
        for (let channel of client.channels.cache) {
            channel = channel[1];
            const size = channel.members.size;
            if (channel.type === 2) {//Si le channel est un vocal
                if (size > 2) {//Si il y a plus de 2 personnes dans le vocal alors on met a jour le start_time de l'utilisateur si il n'est pas un bot et qu'il n'a pas de start_time
                    for (let member of channel.members) {//Si il y a plus de 2 personnes dans le vocal alors on met a jour le start_time de l'utilisateur si il n'est pas un bot et qu'il n'a pas de start_time
                        member = member[1];
                        if (!member.user.bot && client.start_time.get(member.id) === undefined) {//Si l'utilisateur n'est pas un bot et qu'il n'a pas de start_time alors on lui en donne une
                            client.start_time.set(member.id, Date.now());
                            logger.Info('[TIMER] Départ du chrono pour ' + member.user.tag);
                        }
                        else if (!member.user.bot && client.paused_time.get(member.id) !== undefined) {//Si l'utilisateur n'est pas un bot et qu'il a une paused_time alors on lui enlève la paused_time et on rajoute le temps passé dans le vocal a sa start_time
                            let current_paused_time = client.paused_time.get(member.id);
                            let current_start_time = client.start_time.get(member.id);
                            client.paused_time.delete(member.id);
                            client.start_time.set(member.id, current_start_time + (Date.now() - current_paused_time));
                            logger.Info('[TIMER] Le chrono reprend pour ' + member.user.tag);
                        }
                    }
                }
                else if (size === 2) {//Si il n'y a que 2 personnes dans le vocal et que l'autre est un bot alors on pause le chronomètre
                    let bot = false;//On initialise la variable bot qui contiendra true si il y a un bot dans le vocal
                    let true_member = null;//On initialise la variable true_member qui contiendra l'utilisateur non bot
                    for (let member of channel.members) {//On parcours la liste des utilisateurs du vocal et on regarde si il y a un bot si oui on met la variable bot a true et on met l'utilisateur non bot dans la variable true_member
                        member = member[1];
                        if (member.user.bot) {
                            bot = true;
                        } else {
                            true_member = member;
                        }
                    }
                    if (bot) {//Si il y a un bot dans le vocal alors on pause le chronomètre
                        //Si le chrono est déja en pause alors on ne fait rien
                        if (client.paused_time.get(true_member.id) === undefined && client.start_time.get(true_member.id)) {
                            client.paused_time.set(true_member.id, Date.now());
                            logger.Info('[TIMER] Le chrono est en pause pour ' + true_member.user.tag);
                        }
                    }
                    else {
                        for (let member of channel.members) {//Si il y a plus de 2 personnes dans le vocal alors on met a jour le start_time de l'utilisateur si il n'est pas un bot et qu'il n'a pas de start_time
                            member = member[1];
                            if (!member.user.bot && client.start_time.get(member.id) === undefined) {//Si l'utilisateur n'est pas un bot et qu'il n'a pas de start_time alors on lui en donne une
                                client.start_time.set(member.id, Date.now());
                                logger.Info('[TIMER] Départ du chrono pour ' + member.user.tag);
                            }
                            else if (!member.user.bot && client.paused_time.get(member.id) !== undefined) {//Si l'utilisateur n'est pas un bot et qu'il a une paused_time alors on lui enlève la paused_time et on rajoute le temps passé dans le vocal a sa start_time
                                let current_paused_time = client.paused_time.get(member.id);
                                let current_start_time = client.start_time.get(member.id);
                                client.paused_time.delete(member.id);
                                client.start_time.set(member.id, current_start_time + (Date.now() - current_paused_time));
                                logger.Info('[TIMER] Le chrono reprend pour ' + member.user.tag);
                            }
                        }
                    }
                }
                else if (channel.members.size === 1) {//Si il n'y a qu'une personne dans le vocal alors on met en pause
                    for (let member of channel.members) {
                        member = member[1];
                        if(!member.bot && client.paused_time.get(member.id) === undefined && client.start_time.get(member.id) !== undefined){
                            client.paused_time.set(member.id, Date.now());
                            logger.Info('[TIMER] Le chrono est en pause pour ' + member.user.tag);
                        }
                    }
                }
            }
        }
    }
}