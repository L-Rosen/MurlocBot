const {SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, userMention} = require('discord.js');
const {murloc_icon} = require("../../src/assets/murloc_icon");

config = require('../../config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(config.commands.stats.name)
        .setDescription(config.commands.stats.description)
        .addUserOption(option =>
            option.setName(config.commands.stats.option.name)
                .setDescription(config.commands.stats.option.description)
            
        ),
    async execute(interaction) {
        let user = interaction.options.getUser(config.commands.stats.option.name);
        if (user === null) {
            user = interaction.user;
        }

        const player = await db.findOne({where: {id: user.id}});
        const level = player.get('level');//Niveau actuel
        const xp = player.get('xp');//Total xp
        const max_xp = Math.round(0.8 * Math.pow(level + 1, 3));//Niveau suivant
        const current_xp = xp - (Math.round(0.8 * Math.pow(level, 3) - 1));//xp actuel
        const max_xp_for_current_level = Math.round(0.8 * Math.pow(level + 1, 3)) - (Math.round(0.8 * Math.pow(level, 3) - 1));//xp pour passer au niveau suivant a l'échelle du niveau
        const win = player.get('wins');//Nombre de victoire
        const lose = player.get('loses');//Nombre de défaite
        const murlocs = player.get('murlocks');//Nombre de murloc
        const asset = await murloc_icon(level, xp);

        //On génère l'image qui servira de thumbnail a l'embed
        const attachment = new AttachmentBuilder(await asset, {name: "murloc.png"});
        const embed = new EmbedBuilder()
            .setTitle(client.config.commands.stats.embed.title.replace("%s", user.tag))
            .setDescription(client.config.commands.stats.embed.descriptions[parseInt(level) - 1])
            .setThumbnail("attachment://murloc.png")
            .setColor(config.app.color)
            .addFields(
                {
                    name: client.config.commands.stats.embed.xp_field.name,
                    value: client.config.commands.stats.embed.xp_field.value.replace("%current_xp", current_xp).replace("%max_xp_for_current_level", max_xp_for_current_level).replace("%xp", xp).replace("%max_xp", max_xp)
                },
                {
                    name: client.config.commands.stats.embed.match_field.name,
                    value: client.config.commands.stats.embed.match_field.value.replace("%win", win).replace("%lose", lose)
                },
            )
            .setTimestamp()
            .setFooter({
                text: client.config.commands.stats.embed.footer.replace("%d", murlocs).replace("%s", user.tag),
                iconURL: user.avatarURL()
            });

        await interaction.reply({embeds: [embed], files: [attachment], ephemeral: true});
    }
}