const Sequelize = require('sequelize');

logger.Info(client.config.Logs.database.loading_database);

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: './src/data/database.sqlite',
});

//On charge la base de données
const Player = sequelize.define('players', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    username: Sequelize.STRING,
    murlocks: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    level: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
    },
    xp: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    wins: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    loses: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
});

sequelize.sync().then(() => {
    global.db = Player;
    logger.Info(client.config.Logs.database.succes_database);
}).catch(e => {
    logger.Error(e.stack);
});


//Fonction qui remplii la base de données avec tout les membres du serveur et qui met les valeurs par défaut si elles n'existent pas
async function fillDatabase() {
    const guild = client.guilds.resolve(client.config.app.guild);
    guild.members.fetch().then(members => {
        members.forEach(async member => {
            if (!member.user.bot && member.roles.cache.has(client.config.commands.roles.default)) {
                const player = await db.findOne({where: {id: member.id}});
                if (player === null) {
                    await db.create({id: member.id, username: member.user.username});
                }
            }
        });
    });
}

module.exports = {
    fillDatabase,
}
