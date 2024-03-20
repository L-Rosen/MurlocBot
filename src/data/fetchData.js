async function getMurlocks(id) {
    const player = await db.findOne({where: {id: id}});
    return player.get('murlocks');
}

async function getLevel(id) {
    const player = await db.findOne({where: {id: id}});
    return player.get('level');
}

async function getXp(id) {
    const player = await db.findOne({where: {id: id}});
    return player.get('xp');
}

async function getWins(id) {
    const player = await db.findOne({where: {id: id}});
    return player.get('wins');
}

async function getLoses(id) {
    const player = await db.findOne({where: {id: id}});
    return player.get('loses');
}

module.exports = {
    getMurlocks,
    getLevel,
    getXp,
    getWins,
    getLoses,
}