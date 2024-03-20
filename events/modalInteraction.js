const {Events, AttachmentBuilder} = require('discord.js');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const pathToFfmpeg = require('ffmpeg-static');
const fs = require('fs');


module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isModalSubmit()) return;
        if (interaction.customId === 'SETSOUND') {
            //Vérification des champs et récupération des valeurs
            const youtube_link = interaction.fields.getTextInputValue('YOUTUBE_LINK');
            const duration = interaction.fields.getTextInputValue('DURATION');
            const start_at = interaction.fields.getTextInputValue('START_AT');
            var error = 0;

            const user = interaction.user;

            //Si un des champs est vide
            if (!youtube_link || !duration || !start_at) {
                await interaction.reply({content: client.config.commands.setsound.fill_all_fields, ephemeral: true});
                error += 1;
            }

            //Si le lien n'est pas un lien youtube
            if (!youtube_link.match(/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/)) {
                if (error === 0) await interaction.reply({
                    content: client.config.commands.setsound.youtube_link_invalid,
                    ephemeral: true
                });
                else await interaction.followUp({
                    content: client.config.commands.setsound.youtube_link_invalid,
                    ephemeral: true
                });
                error += 1;
            }

            //Si la durée n'est pas un nombre supérieur à 0
            if (isNaN(start_at) || start_at < 0 ) {
                if (error === 0) await interaction.reply({
                    content: client.config.commands.setsound.start_at_invalid,
                    ephemeral: true
                });
                else await interaction.followUp({
                    content: client.config.commands.setsound.start_at_invalid,
                    ephemeral: true
                });
                error += 1;
            }

            //Si la durée n'est pas un nombre compris entre 1 et 5
            if (isNaN(duration) || duration < 1 || duration > 5) {
                if (error === 0) await interaction.reply({
                    content: client.config.commands.setsound.duration_invalid,
                    ephemeral: true
                });
                else await interaction.followUp({
                    content: client.config.commands.setsound.duration_invalid,
                    ephemeral: true
                });
                error += 1;
            }

            //Si une erreur est survenue on arrête le script
            if (error > 0) return;

            //On télécharge la vidéo puis on la renome user_tag.mp3 puis on la découpe selon la durée
            const videoURL = youtube_link;
            const outputFilePath = './sounds/' + user.tag + '.mp3';

            try {
                const video = ytdl(videoURL, {filter: 'audioonly'});

                try {
                    ffmpeg()
                        .setFfmpegPath(pathToFfmpeg)
                        .audioFilter('loudnorm=I=-25:LRA=11:TP=-1.5')
                        .input(video)
                        .seekInput(start_at)
                        .setDuration(duration)
                        .toFormat('mp3')
                        .on('error', (err) => {
                            interaction.reply({
                                content: client.config.Logs.event.moddalInteraction.SETSOUND.ffmpeg_error.replace('%s', err.stack),
                                ephemeral: true
                            });
                            logger.Error(client.config.Logs.event.moddalInteraction.SETSOUND.ffmpeg_error.replace('%s', err.stack));
                            //On verifie si le fichier existe et si oui on le supprime
                            if (fs.existsSync(outputFilePath)) {
                                fs.unlinkSync(outputFilePath);
                            }
                        })
                        .on('end', () => {
                            const Attachment = new AttachmentBuilder(outputFilePath, {name: 'Apperçu de votre Murloc.mp3'});
                            interaction.reply({
                                content: client.config.Logs.event.moddalInteraction.SETSOUND.murlock_change_success_user,
                                ephemeral: true,
                                files: [Attachment]
                            });
                            logger.Info(client.config.Logs.event.moddalInteraction.SETSOUND.murlock_change_success.replace('%s', user.tag));
                        })
                        .pipe(fs.createWriteStream(outputFilePath));
                } catch (e) {
                    interaction.reply({
                        content: client.config.Logs.event.moddalInteraction.SETSOUND.ffmpeg_error.replace("$s", e.me),
                        ephemeral: true
                    });
                    logger.Error(client.config.Logs.event.moddalInteraction.SETSOUND.ffmpeg_error.replace('%s', e.stack));
                }

            } catch (e) {
                interaction.reply({
                    content: client.config.Logs.event.moddalInteraction.SETSOUND.youtube_err_user,
                    ephemeral: true
                });
                logger.Error(client.config.Logs.event.moddalInteraction.SETSOUND.youtube_err.replace('%s', e.stack));
            }
        }
    },
};
