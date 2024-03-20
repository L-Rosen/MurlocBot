const {SlashCommandBuilder} = require('discord.js');
const fs = require('fs');
config = require('../../config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(config.commands.reset.name)
        .setDescription(config.commands.reset.description),

    async execute(interaction) {
        //On vérifie si le fichier ./sounds/user.tag.mp3 existe si oui on le supprime et on envoie un message de confirmation
        if (fs.existsSync(`./sounds/${interaction.user.tag}.mp3`)) {
            fs.unlinkSync(`./sounds/${interaction.user.tag}.mp3`);
            await interaction.reply(config.commands.reset.reply, {ephemeral: true});
        } else {
            await interaction.reply(config.commands.reset.reply_error, {ephemeral: true});
        }

    }
}