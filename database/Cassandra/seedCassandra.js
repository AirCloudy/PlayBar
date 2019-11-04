/* eslint-disable no-param-reassign */
const cassandra = require('cassandra-driver');
const fs = require('fs');
const csv = require('csv-parser');

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'mykeyspace',
});

async function insertData(data) {
  // create generic query
  const query =
    'INSERT INTO songs (songId, likeCount, songDataURL, songName, artist, album, thumbnailURL, likeId, likeusername) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';

  // create queries array
  const queries = [];

  // populate queries array
  for (let i = 0; i < data.length; i += 1) {
    console.log(data[i]);
    // add to queries
    queries.push({
      query,
      params: data[i],
    });
  }

  // execute query
  await client.batch(queries, {prepare: true}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('success!!');
    }
  });
}

async function csvToCassandra() {
  const filename =
    '/Users/jonathanolson/HackReactor/SDC/playbar/database/data/songs.csv';

  const data = [];

  fs.createReadStream(filename)
    .pipe(csv())
    .on('data', (row) => {
      row.songId = parseInt(row.songId, 10);
      row.likeCount = parseInt(row.likeCount, 10);
      row.likeId = -1;
      row.likeUserName = '';
      delete row[''];
      data.push(row);
    })
    .on('end', () => insertData(data));
}

csvToCassandra();
