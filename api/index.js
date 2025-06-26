const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const characterPositions = {
    man: { x: 138, y: 555, radius: 30 },
    bears: { x: 1210, y: 235, radius: 20 },
    devil: { x: 555, y: 485, radius: 20 },
};


app.post("/", (req, res) => {
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

app.listen(3000);