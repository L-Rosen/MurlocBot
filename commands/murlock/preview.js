const {SlashCommandBuilder, AttachmentBuilder} = require('discord.js');
const fs = require('fs');
config = require('../../config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(config.commands.preview.name)
        .setDescription(config.commands.preview.description)
        .addUserOption(option =>
            option.setName(config.commands.preview.option.name)
                .setDescription(config.commands.preview.option.description)
        ),
    async execute(interaction) {
        let user = interaction.options.getUser(config.commands.preview.option.name);
        if (user === null) {
            user = interaction.user;
        }
        let murloc_file = user.tag;
        if (!fs.existsSync(`./sounds/${user.tag}.mp3`)) {
            murloc_file = 'murloc'
        }

        const attachment = new AttachmentBuilder(`./sounds/${murloc_file}.mp3`,{name: "Apperçu du murloc.mp3"});
        await interaction.reply({content:config.commands.preview.reply,files: [attachment], ephemeral: true});
    }
}