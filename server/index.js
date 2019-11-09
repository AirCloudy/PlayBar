const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const cb = require("./routeCallbacks");

const cassandra = require("../database/Model/index");

const app = express();
const port = 3000;

const jsonParser = bodyParser.json();

app.use(cors());

app.use(express.static(path.join(__dirname, "../public")));

app.use(jsonParser);

// GET SONG
app.get("/songs/:songId/:userId", (req, res) => {
  const { songId, userId } = req.params;
  cassandra.getSong(songId, userId, res);
});

// CREATE SONG
app.post("/songs", (req, res) => {
  // res.send(req.body)
  //   console.log(req.body);
  cassandra.addSong(req.body, res);
});

// PUT SONG
app.put("/songs", cb.putSong);

// DELETE SONG
app.delete("/songs/:songId", cb.deleteSong);

// Update like status
app.post("/likes", jsonParser, cb.likeEntry);

app.listen(port);
