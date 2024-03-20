const {SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle} = require('discord.js');

config = require('../../config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(config.commands.setsound.name)
        .setDescription(config.commands.setsound.description),
    async execute(interaction) {

        const modal = new ModalBuilder()
            .setCustomId('SETSOUND')
            .setTitle(config.commands.setsound.modal.title);

        const youtube_link = new TextInputBuilder()
            .setCustomId('YOUTUBE_LINK')
            .setLabel(config.commands.setsound.modal.youtube_link)
            .setPlaceholder(config.commands.setsound.modal.youtube_placeholder)
            .setStyle(TextInputStyle.Short)

        const start_at = new TextInputBuilder()
            .setCustomId('START_AT')
            .setLabel(config.commands.setsound.modal.start_at)
            .setPlaceholder(config.commands.setsound.modal.start_at_placeholder)
            .setStyle(TextInputStyle.Short)

        const duration = new TextInputBuilder()
            .setCustomId('DURATION')
            .setLabel(config.commands.setsound.modal.duration)
            .setPlaceholder(config.commands.setsound.modal.duration_placeholder)
            .setStyle(TextInputStyle.Short)

        const firstActionRow = new ActionRowBuilder().addComponents(youtube_link);
        modal.addComponents(firstActionRow);

        const secondActionRow = new ActionRowBuilder().addComponents(start_at);
        modal.addComponents(secondActionRow);

        const thirdActionRow = new ActionRowBuilder().addComponents(duration);
        modal.addComponents(thirdActionRow);

        // Show the modal to the user
        await interaction.showModal(modal);

    }
}