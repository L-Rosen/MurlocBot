const {Events} = require('discord.js');
const dbFunctions = require('../src/data/init.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        try {
            if (!interaction.isStringSelectMenu()) return;
            await interaction.deferReply({ephemeral: true});//On diffère la réponse car le temps de traitement peux être suppérieur a 3sec

            if (interaction.customId === client.config.commands.roles.customId_menu) {
                //On retire tout les roles de list a l'utilisateur
                const roles = client.config.commands.roles.list;
                for (const key of Object.keys(roles)) {
                    let role = roles[key];
                    role = interaction.guild.roles.cache.get(role.id);
                    await interaction.member.roles.remove(role);
                }

                const selection = interaction.values//On récupère les roles
                selection.push(client.config.commands.roles.default);//On rajoute le role default

                //On définis la réponse de base
                let answer = client.config.commands.roles.reply_roles_add;

                for (const key in selection) {//On rajoute les roles
                    const role = interaction.guild.roles.cache.get(selection[key]);
                    await interaction.member.roles.add(role);
                    answer += ` <@&${selection[key]}> `
                }

                await interaction.editReply({content: answer})
                logger.Info(client.config.Logs.event.menuInteraction.succes.replace('%s', interaction.member.tag));
                dbFunctions.fillDatabase();//On rempli la base de données car un nouveau membre a rejoint le serveur
            }
        } catch (error) {
            logger.Error(client.config.Logs.event.menuInteraction.error.replace('%s', interaction.member.tag));
            logger.Error(error.stack)
        }

    }
};
