const cassandra = require("cassandra-driver");

const client = new cassandra.Client({
  contactPoints: ["54.176.195.1"],
  localDataCenter: "datacenter1",
  keyspace: "mykeyspace"
});

// manually connect to make sure there are no connection errors
client.connect().then(() => {
  console.log(
    `Cassandra client connected! Current Time: ${new Date(
      Date.now()
    ).toLocaleString()}`
  );
});

// SELECT a song from Cassandra by song ID
const getSong = (songId, userName, res) => {
  // create generic query
  const query = `
    SELECT 
      songName, album, artist, likeCount, songDataURL, thumbNailURL, likeUserName 
    FROM 
      songs 
    WHERE 
      songId = ${songId} AND likeId = -1;
  `;
  client
    .execute(query)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      res.writeHead(500);
      res.end(JSON.stringify(err));
    });
  // execute query
  // executeQuery(query, res, values);
};

// INSERT a song to Cassandra given a song object
const addSong = (songObj, res) => {
  const {
    songId,
    album,
    artist,
    likeCount,
    songDataURL,
    songName,
    thumbnailURL
  } = songObj;

  client
    .execute(
      `INSERT INTO songs (songId, likeCount, songDataURL, songName, artist, album, thumbnailURL, likeId) VALUES (${songId}, ${likeCount}, '${songDataURL}', '${songName}', '${artist}', '${album}', '${thumbnailURL}', -1);`
    )
    .then(() => {
      res.writeHead(200);
      res.end("success");
    })
    .catch(err => {
      res.writeHead(500);
      res.end(err);
    });

  // execute query
  // executeQuery(query, res);
};

module.exports.getSong = getSong;
module.exports.addSong = addSong;
