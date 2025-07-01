const express = require("express");
const app = express();
const cors = require('cors');
const { body, validationResult } = require("express-validator");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Character selection

const characterPositions = {
    man: { x: 138, y: 555, radius: 30 },
    bears: { x: 1210, y: 235, radius: 20 },
    devil: { x: 555, y: 485, radius: 20 },
};

const validatePosition = [
    body("name")
        .isIn(['man', 'bears', 'devil'])
        .withMessage('Not a valid option'),
    body("x")
        .isNumeric().withMessage('Not a number'),
    body('y')
        .isNumeric().withMessage('Not a number'),
];

app.post("/position", validatePosition, (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    };

    const characterUser = req.body.name;
    const xUser = req.body.x;
    const yUser = req.body.y;
    const radiusUser = 25; // the dot has a radius of 25px

    const {x, y, radius} = characterPositions[characterUser];

    // If distance between circle centers is less than the circles' radii combined then they're colliding
    const dist = Math.abs(Math.sqrt( (xUser - x)**2 + (yUser - y)**2))

    if (dist > (radius + radiusUser)) return res.send(false);
    res.send(true);
});


// Scores

const db = require("./queries.js");

const validateScore = [
    body("name")
        .isAlphanumeric().withMessage("Invalid name"),
    body("time")
        .isNumeric().withMessage("Invalid time"),
];

app.post("/score", validateScore, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    };

    const name = req.body.name;
    const time = req.body.time;

    await db.insertScore(name, time);

    const leaderboard = await db.getLeaderboard();
    res.json(leaderboard);
});


// Leaderboard

app.get("/leaderboard", async (req, res) => {
    const leaderboard = await db.getLeaderboard();
    res.json(leaderboard);
});

app.listen(3000);