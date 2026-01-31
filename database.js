const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'db.json');

function readDB() {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
}

function writeDB(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

function addConfession(userId, texte) {
    const db = readDB();
    db.confessions.push({
        userId,
        texte,
        date: new Date().toISOString()
    });
    writeDB(db);
}

function getAllConfessions() {
    const db = readDB();
    return db.confessions;
}

module.exports = { addConfession, getAllConfessions };
