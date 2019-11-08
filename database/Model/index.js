const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
    contactPoints: ['localhost'],
    localDataCenter: 'datacenter1',
    keyspace: 'mykeyspace',
  });

// manually connect to make sure there are no connection errors
client.connect()
  .then(() => {
    console.log('Cassandra client connected!')
  })

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
  // execute query
  client.execute(query)
  .then((result) => {
    res.end(JSON.stringify(result.rows[0]))
  })
}

const addSong = (songObj, res) => {
   const {songId,
   album,
   artist,
   likeCount,
   likeUserName,
   songDataURL,
   songName,
   thumbnailURL} = songObj;

   const query = `
    INSERT INTO songs (
      songId, 
      likeCount, 
      songDataURL, 
      songName, 
      artist, 
      album, 
      thumbnailURL, 
      likeId, 
      likeusername) 
    VALUES (
      ${songId},
      ${likeCount},
      ${songDataURL},
      ${songName},
      ${artist},
      ${album},
      ${thumbnailURL},
      -1,
      ${likeUserName});
   `;

  // execute query
  client.execute(query)
  .then((result) => {
    res.end(JSON.stringify(result))
  })
}

module.exports.getSong = getSong;
module.exports.addSong = addSong;
