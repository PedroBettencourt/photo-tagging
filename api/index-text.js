const index = require("./index");
const jest = require("jest")

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", index);

// Position route with wrong coords"
request(app)
  .post("/position")
  .type("form")
  .send({ name: "man", x: 10, y: 20 })
  .expect("false")
  .end(function(err, res) {
    if(err) throw err;
  });

// Position with correct coords
request(app)
  .post("/position")
  .type("form")
  .send({ name: "man", x: 140, y: 560 })
  .expect("true")
  .end(function(err, res) {
    if(err) throw err;
  });