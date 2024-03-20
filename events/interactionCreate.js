const {Events} = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            logger.Error(client.config.Logs.event.interaction_create.command_do_not_exist.replace("%s", interaction.commandName));
            return;
        }

        try {
            await command.execute(interaction);
            logger.Info(client.config.Logs.event.interaction_create.command_success.replace("%s", interaction.commandName).replace("%u", interaction.user.tag));
        } catch (error) {
            logger.Error(client.config.Logs.event.interaction_create.command_error.replace("%s", interaction.commandName));
            logger.Error(error.stack);
        }
    },
};
