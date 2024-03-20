const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

config = require('../../config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(config.commands.clear.name)
        .setDescription(config.commands.clear.description)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addIntegerOption(option =>
            option.setName(config.commands.clear.option.name)
                .setDescription(config.commands.clear.option.description)
                .setMinValue(1)
                .setMaxValue(100)
                .setRequired(true)),


    async execute(interaction) {
        const amount = interaction.options.getInteger(config.commands.clear.option.name);
        await interaction.channel.bulkDelete(amount, true);
        await interaction.reply({content: config.commands.clear.reply.replace("%d", amount), ephemeral: true});

    }

}