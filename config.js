module.exports = {
    app: {
        token: "",
        clientId: "",
        guild: "",
        global: true,
        color: "#ffae00",
        activity_type: "WATCHING", // WATCHING, LISTENING, PLAYING
        activity_name: "les gens se faire murlocker",
        murlock_sound: "./sounds/murloc.mp3",
        murlock_channel: "",
    },

    Logs: {
        init: "[0/3] Initialisation du bot",

        event: {
            ready: "[3/3] Connecté en tant que %s",
            interaction_create: {
                command_do_not_exist: "La commande %s n'existe pas",
                command_error: "Erreur lors de l'exécution de la commande %s",
                command_success: "La commande %s a été exécutée par %u",
            },
            voiceStateUpdate: {
                successfull_murlock: "$s a été murlocké avec succès",
                error_murlock: "Erreur lors du murlock de %s",
            },

            moddalInteraction: {
                SETSOUND: {
                    ffmpeg_error: "Erreur lors de la découpe de la vidéo : %s",
                    youtube_err_user: "Erreur lors de la récupération de la vidéo vérifiez que votre lien youtube fonctionne",
                    youtube_err: "Erreur lors de la récupération de la vidéo : %s",
                    murlock_change_success_user: "Le son du murlock a été changé avec succès par : ",
                    murlock_change_success: "Fichier téléchargé et découpé avec succès ! sounds/%s.mp3",
                }
            },
            menuInteraction: {
                succes: 'Les roles de %s ont été changés avec succés',
                error: 'Une erreur est survenue lors du changement de role de %s :',
            }
        },

        xp: {
            level_up: "%s est passé niveau %d !",
            xp_gain: "%s a gagné %d xp !",
            xp_error: "Erreur lors de l'ajout d'xp à %s",
            xp_reply: "Le murloc de %u gagne en puissance ! (+%s xp)",
            level_up_reply: "Le murloc de %s est en train de muer ! (+1 LvL)",
            xp_cooldown: "Vous devez attendre %s minutes avant de pouvoir gagner de l'xp à nouveau !",
        },

        loader: {
            commands: {
                loading_command: "[1/3] Chargement des commandes ",
                succes_command: "[CMD] Commande %s chargée avec succès",
                error_command: "[CMD] La commande %s n'a pas de data ou d'execute",
                succes_command_loading: "[CMD] Chargement des commandes terminé",
                warrning_no_commands: "[WARNING] Aucune commande n'a été chargée veuillez vérifier le dossier commands",
                dir_not_found: "Le dossier de commande :'%s' n'a pas été trouvé a l'emplacement '%d'",
            },
            events: {
                loading_event: '[2/3] Chargement des Events',
                succes_event: "[EVT] Event %s chargé avec succès",
                succes_event_loading: "[EVT] Chargement des events terminé",
                warrning_no_events: "[WARNING] Aucun event n'a été chargé veuillez vérifier le dossier events",
                dir_not_found: "Le dossier d'event :'%s' n'a pas été trouvé a l'emplacement '%d'",
            }
        },

        database: {
            loading_database: "[DB] Chargement de la base de donnée",
            succes_database: "[DB] Base de donnée chargée avec succès",
        }
    },

    commands: {
        permission: {
            role_admin: "",
            permission_denied: "Vous n'avez pas la permission de faire cela !",
        },
        ping: {
            name: "ping",
            description: "Obtenez le ping du bot !",
            reply: "Pong! La latence de l'API est de %dms 🛰️.",
        },
        setsound: {
            name: "setsound",
            description: "Change le son du murlock",
            modal: {
                title: "Quel sera le son du murlock ?",
                youtube_link: "Lien youtube",
                youtube_placeholder: "https://www.youtube.com/watch?v=qMPpnCvCZvw",
                duration: "Durée du son",
                duration_placeholder: "Entrez une durée comprise entre 1 et 5 secondes",
                start_at: "A quelle seconde le murlock doit démarer ?",
                start_at_placeholder: "Entrez une durée comprise entre 0 et la durée de la vidéo",
            },
            fill_all_fields: "Veuillez remplir tous les champs",
            youtube_link_invalid: "Lien youtube invalide",
            duration_invalid: "La durée doit être un nombre compris entre 1 et 5",
            start_at_invalid: "Le point de départ doit être un nombre supérieur à 0",
        },
        reset: {
            name: "reset",
            description: "Reset le son du murlock",
            reply: "Le son du murlock a été reset avec succès !",
            reply_error: "Le murlock est déjà le son par default !",
        },
        roles: {
            name: "spawnroles",
            description: "Fait apparaitre le menu des roles admin uniquement",
            placeholder: "Aucun rôle sélectionné",
            customId_menu: "roles_menu",
            select_menu_before_message: "Sélectionnez vos rôles :",
            default: "1068410118066143313",
            reply_invoke: "Roles invoquées avec succées",
            reply_roles_add: "Vos nouveaux roles sont : ",
            list: {
                exemple: {
                    label: "",
                    description: "",
                    id: "",
                    emoji: ""
                },
            },
        },
        stats: {
            name: "stats",
            description: "Affiche les stats de votre murloc",
            option: {
                name: "utilisateur",
                description: "Utilisateur dont vous voulez voir les stats (laissez vide pour voir vos stats)",
            },
            embed: {
                title: "Murloc de %s",
                descriptions:  ["Murloc est un petit être amphibie, couvert d’écailles et doté d’une queue de poisson. Il n’a pas d’armes ni d’armures, et se contente de mordre ou de griffer ses ennemis. Il est très faible et craintif, et fuit dès qu’il se sent menacé.",
                                "Murloc a appris à se servir d’un bâton rudimentaire, qu’il utilise pour frapper ses adversaires à distance. Il a aussi développé un cri strident, qui peut désorienter ou effrayer ses proies. Il reste néanmoins fragile et vulnérable, et évite les combats inutiles.",
                                "Murloc a trouvé un casque et une cuirasse abandonnés par un aventurier, qu’il a adaptés à sa taille. Il se sent plus confiant et protégé, et ose affronter des ennemis plus forts. Il a aussi appris à cracher un jet d’eau, qui peut aveugler ou étouffer ses cibles.",
                                "Murloc a rejoint un clan de ses semblables, qui vivent en harmonie dans un marais. Il a acquis un sens de la solidarité et de la coopération, et participe aux raids et aux chasses collectives. Il a aussi appris à manier une lance, qui lui permet de transpercer ses ennemis.",
                                "Murloc a été choisi comme chaman par son clan, grâce à sa sensibilité aux forces de la nature. Il a appris à invoquer des éléments, comme le feu, la foudre ou la glace, pour attaquer ou se défendre. Il a aussi appris à soigner ses alliés, en utilisant des plantes ou des potions.",
                                "Murloc a été capturé par un sorcier maléfique, qui l’a soumis à des expériences magiques. Il a subi des mutations, qui ont augmenté sa taille, sa force et sa résistance. Il a aussi développé des pouvoirs psychiques, comme la télépathie, la télékinésie ou l’hypnose.",
                                "Murloc a réussi à s’échapper du sorcier, et a rejoint une guilde de mercenaires. Il a appris à se battre avec des armes variées, comme des épées, des haches ou des arcs. Il a aussi appris à se faufiler, à poser des pièges ou à utiliser des explosifs.",
                                "Murloc a été recruté par un roi, qui l’a nommé chevalier. Il a reçu une armure complète, ornée de symboles et de gemmes. Il a aussi reçu un destrier, qu’il a dressé pour le combat. Il a appris à se battre avec honneur, à commander des troupes et à accomplir des quêtes.",
                                "Murloc a été envoyé par le roi dans une expédition, qui visait à explorer un continent inconnu. Il a découvert des civilisations, des cultures et des créatures étranges. Il a appris à s’adapter, à négocier et à se faire des alliés. Il a aussi appris à maîtriser des arts mystérieux, comme l’alchimie, l’astrologie ou la nécromancie.",
                                "Murloc a été trahi par le roi, qui l’a accusé de haute trahison. Il a été emprisonné dans une forteresse, où il a subi des tortures et des humiliations. Il a appris à résister, à s’évader et à se venger. Il a aussi appris à contrôler sa rage, qui décuple ses capacités au combat.",
                                "Murloc a été libéré par une rébellion, qui l’a reconnu comme un héros. Il a rejoint la cause des opprimés, qui luttaient contre le tyran. Il a appris à se battre avec passion, à inspirer les foules et à mener des révolutions. Il a aussi appris à utiliser des artefacts magiques, qui lui confèrent des pouvoirs extraordinaires.",
                                "Murloc a été couronné roi, après avoir renversé le tyran. Il a instauré un règne de paix, de justice et de prospérité. Il a appris à gouverner, à légiférer et à administrer. Il a aussi appris à protéger son royaume, en érigeant des murailles, en formant des armées et en scellant des alliances.",
                                "Murloc a été attaqué par un dragon, qui menaçait son royaume. Il a affronté la bête, dans un combat épique. Il a appris à se battre avec courage, à exploiter les faiblesses de son ennemi et à porter le coup fatal. Il a aussi appris à dompter le dragon, qui est devenu son fidèle compagnon.",
                                "Murloc a été invité par un dieu, qui l’a choisi comme champion. Il a accédé à un plan divin, où il a rencontré des êtres supérieurs. Il a appris à se battre avec grâce, à respecter les lois cosmiques et à accomplir des miracles. Il a aussi appris à manifester sa volonté, qui peut altérer la réalité.",
                                "Murloc a été défié par un démon, qui voulait détruire son plan divin. Il a relevé le défi, dans un duel infernal. Il a appris à se battre avec fureur, à résister aux tentations et à purifier le mal. Il a aussi appris à libérer son potentiel, qui peut surpasser les limites.",
                                "Murloc a été récompensé par le dieu, qui l’a élevé au rang de demi-dieu. Il a reçu une partie de l’essence divine, qui a transformé son apparence et ses capacités. Il a appris à se battre avec gloire, à créer des mondes et à engendrer des créatures. Il a aussi appris à partager son essence, qui peut donner la vie.",
                                "Murloc a été adoré par les mortels, qui l’ont considéré comme un dieu. Il a reçu des offrandes, des prières et des cultes, qui ont renforcé son pouvoir. Il a appris à se battre avec sagesse, à guider les peuples et à répandre le bien. Il a aussi appris à recevoir l’amour, qui peut combler son cœur.",
                                "Murloc a été confronté à un autre dieu, qui voulait le supplanter. Il a engagé une guerre divine, qui a secoué les cieux et la terre. Il a appris à se battre avec stratégie, à mobiliser ses fidèles et à déployer ses forces. Il a aussi appris à affirmer sa suprématie, qui peut imposer son ordre.",
                                "Murloc a été vainqueur de la guerre divine, qui l’a consacré comme le dieu suprême. Il a régné sur tous les plans, tous les mondes et toutes les créatures. Il a appris à se battre avec majesté, à harmoniser les contraires et à maintenir l’équilibre. Il a aussi appris à exprimer sa générosité, qui peut accorder des bénédictions.",
                                "Murloc a été transcendé par l’univers, qui l’a fusionné avec lui-même. Il a atteint le stade ultime, où il n’y a plus de distinction entre lui et tout ce qui existe. Il a appris à se battre avec éternité, à embrasser le tout et à transcender le néant. Il a aussi appris à être lui-même, qui peut être tout."],
                xp_field: {
                    name: "**XP**",
                    value: "*Actuel :* __**%current_xp/%max_xp_for_current_level**__     **-**     *Total actuel :* __**%xp/%max_xp**__",
                },
                match_field: {
                    name: "**Matchs**",
                    value: "*Victoires :* __**%win**__     **-**     *Défaites :* __**%lose**__",
                },
                footer: "%s s'est fait murlocké %d fois",
            }
        },
        clear: {
            name: "clear",
            description: "Supprime un nombre de message donné",
            option: {
                name: "nombre",
                description: "Nombre de message a supprimer",
            },
            reply: "%d messages ont été supprimés !",
            no_permission: "Vous n'avez pas la permission de faire cela !",
        },
        leaderboard: {
            name: "leaderboard",
            description: "Affiche le classement des murlocs",
            option: {
                name: "type",
                description: "Classement par XP ou par murlocs",
                choices: [
                    {
                        name: "XP",
                        value: "xp"
                    },
                    {
                        name: "Murlocs",
                        value: "murlocs"
                    }
                ]
            },
            embed: {
                title: "Classement des murlocs",
            }
        },
        preview: {
            name: "preview",
            description: "Prévisualise le son de votre murloc",
            option: {
                name: "utilisateur",
                description: "Utilisateur dont vous voulez prévisualiser le son (laissez vide pour prévisualiser votre son)",
            },
            reply: "Voici le son de votre murloc :",
        },
        help: {
            name: "help",
            description: "Affiche l'aide",
            embed: {
                title: "Aide",
                description: "Voici la liste des commandes disponibles",
            }
        },
    },
}