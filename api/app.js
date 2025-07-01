const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const indexRouter = require("./index");
app.use("/", indexRouter);

app.listen(3000, () => console.log("running"));