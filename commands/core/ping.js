const {SlashCommandBuilder} = require('discord.js');
config = require('../../config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(config.commands.ping.name)
        .setDescription(config.commands.ping.description),
    async execute(interaction) {
        const m = await interaction.reply({content: 'Ping?'});
        await interaction.editReply(config.commands.ping.reply.replace("%d", Math.round(client.ws.ping)));
    }
}