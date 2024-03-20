const {SlashCommandBuilder, EmbedBuilder, AttachmentBuilder} = require('discord.js');
config = require('../../config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(config.commands.leaderboard.name)
        .setDescription(config.commands.leaderboard.description)
        .addStringOption(option =>
            option.setName(config.commands.leaderboard.option.name)
                .setDescription(config.commands.leaderboard.option.description)
                .addChoices(
                    {
                        name : config.commands.leaderboard.option.choices[0].name,
                        value : config.commands.leaderboard.option.choices[0].value
                    },
                    {
                        name : config.commands.leaderboard.option.choices[1].name,
                        value : config.commands.leaderboard.option.choices[1].value
                    }
                )
        )
    ,
    async execute(interaction) {
        //Si l'option est vide on affiche le classement par xp par défaut
        let order = "xp";
        let third_field = "XP";
        if (interaction.options.getString(config.commands.leaderboard.option.name) === config.commands.leaderboard.option.choices[1].value) {
            order = "murlocks";
            third_field = "Murlocs";
        }
        const players = await db.findAll({order: [[order, 'DESC']]});
        let users = '';
        let level = '';
        let xp = '';
        let count = 0;
        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            if (player.get('id') === undefined || player.get('xp') === 0) continue;
            users += `${count+1} - ${player.get('username')}\n`;
            level += `${player.get('level')}\n`;
            if (third_field === "XP"){
                xp += `${player.get('xp')}\n`;
            }else {
                xp += `${player.get('murlocks')}\n`;
            }

            count++;
        }

        const attachment =
            new AttachmentBuilder("./src/assets/leaderboard_icon.png", {name: "leaderboard.png"}
        );
        const embed = new EmbedBuilder()
            .setTitle(config.commands.leaderboard.embed.title)
            .setColor(config.app.color)
            .setTimestamp()
            .addFields(
                {
                    name : 'Utilisateur',
                    value : users.replace("1 -",":first_place:")
                        .replace("2 -",":second_place: ")
                        .replace("3 -",":third_place: "),
                    inline : true
                },
                {
                    name : 'Niveau',
                    value : level,
                    inline : true
                },
                {
                    name : third_field,
                    value : xp,
                    inline : true
                }
            )
            .setThumbnail("attachment://leaderboard.png")

        await interaction.reply({embeds: [embed], files: [attachment], ephemeral: true});
    }
}
