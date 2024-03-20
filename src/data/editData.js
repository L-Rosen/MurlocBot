async function setMurlocks(id, new_murlocks) {
    await db.update({murlocks: new_murlocks}, {where: {id: id}});
}

async function incrementMurlocks(id) {
    await db.increment('murlocks', {where: {id: id}});
}

async function setLevel(id, new_level) {
    await db.update({level: new_level}, {where: {id: id}});
}

async function incrementLevel(id) {
    await db.increment('level', {where: {id: id}});
}

async function setXp(id, new_xp) {
    await db.update({xp: new_xp}, {where: {id: id}});
}

async function setWins(id, new_wins) {
    await db.update({wins: new_wins}, {where: {id: id}});
}

async function incrementWins(id) {
    await db.increment('wins', {where: {id: id}});
}

async function setLoses(id, new_loses) {
    await db.update({loses: new_loses}, {where: {id: id}});
}

async function incrementLoses(id) {
    await db.increment('loses', {where: {id: id}});
}

module.exports = {
    setMurlocks,
    setLevel,
    setXp,
    setWins,
    setLoses,
    incrementMurlocks,
    incrementLevel,
    incrementWins,
    incrementLoses,
}