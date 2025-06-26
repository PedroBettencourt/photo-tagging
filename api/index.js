const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const characterPositions = {
    man: { x: [300, 400], y: [100, 200] }
};

app.post("/", (req, res) => {
    const characterUser = req.body.name;
    const xUser = req.body.x;
    const yUser = req.body.y;
    
    const {x, y} = characterPositions[characterUser];
    
    let result = false;
    if (x[0] < xUser && x[1] > xUser) {
        if (y[0] < yUser && y[1] > yUser) result = true;
    }
    res.send(result);
});

app.listen(3000);