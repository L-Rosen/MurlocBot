const {SlashCommandBuilder,EmbedBuilder} = require('discord.js');
config = require('../../config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(config.commands.help.name)
        .setDescription(config.commands.help.description),
    async execute(interaction) {
        let embed = new EmbedBuilder()
            .setTitle(config.commands.help.embed.title)
            .setDescription(config.commands.help.embed.description)
            .setColor(config.app.color)
            .setTimestamp();
        for (const command of client.commands.values()) {
            if (command.data.name === "help") continue;//On ne veut pas afficher la commande help dans la liste des commandes
            if (!command.data.default_member_permissions || interaction.member.permissions.has(command.data.default_member_permissions)){
                embed.addFields({
                    name: command.data.name,
                    value: command.data.description,
                    inline: true
                });
            }
        }
        await interaction.reply({embeds: [embed], ephemeral: true});
    }
}