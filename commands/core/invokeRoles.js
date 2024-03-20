const {
    SlashCommandBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ActionRowBuilder,
    PermissionFlagsBits
} = require('discord.js');
const config = require('../../config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(config.commands.roles.name)
        .setDescription(config.commands.roles.description)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const roles = config.commands.roles.list;
        const number = Object.keys(roles).length;

        if (!interaction.member.roles.cache.has(config.commands.permission.role_admin)) {
            await interaction.reply(config.commands.permission.permission_denied);
            return;
        }

        const roleSelect = new StringSelectMenuBuilder()
            .setCustomId(config.commands.roles.customId_menu)
            .setPlaceholder(config.commands.roles.placeholder)
            .setMinValues(1)
            .setMaxValues(number);

        for (const key of Object.keys(roles)) {
            const role = roles[key];
            roleSelect.addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel(role.label)
                    .setDescription(role.description)
                    .setValue(role.id)
                    .setEmoji(role.emoji)
            );
        }

        const row = new ActionRowBuilder()
            .addComponents(roleSelect);

        await interaction.channel.send({
            content: config.commands.roles.select_menu_before_message,
            components: [row],
        });

        await interaction.reply(client.config.commands.roles.reply_invoke, {ephemeral: true})
    }
};
