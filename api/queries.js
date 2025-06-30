const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function insertScore(name, time) {
    await prisma.score.create({ data: { name: name, score: time } });
};

async function getLeaderboard() {
    const leaderboard = await prisma.score.findMany(); 
    return leaderboard;
};

module.exports = { insertScore, getLeaderboard };