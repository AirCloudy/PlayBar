const faker = require('faker');
const fs = require('fs');

// Save data as both csv and json
const songsCSV =
  '/Users/jonathanolson/HackReactor/SDC/playbar/database/data/songs.csv';
const likesCSV =
  '/Users/jonathanolson/HackReactor/SDC/playbar/database/data/likes.csv';
const playHistoryCSV =
  '/Users/jonathanolson/HackReactor/SDC/playbar/database/data/playHistory.csv';

// Generate list of 1000 users
const generateUserList = () => {
  const users = [];
  for (let i = 0; i < 1000; i += 1) {
    users.push(faker.internet.userName());
  }
  return users;
};

const writeHeaders = (filename) => {
  // WRITE HEADERS
  const songsHeaders = [
    'songId',
    'likeCount',
    'songDataURL',
    'songName',
    'artist',
    'album',
    'thumbnailURL',
    '\n\r',
  ];
  const likeHeaders = ['songId', 'userName', '\n\r'];
  const playHistoryHeaders = ['songId', 'userName', '\n\r'];

  if (filename === 'songs') {
    fs.writeFileSync(songsCSV, songsHeaders, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('song headers written successfully!!');
      }
    });
  }
  if (filename === 'likes') {
    fs.writeFileSync(likesCSV, likeHeaders, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('like headers written successfully!!');
      }
    });
  }
  if (filename === 'playHistory') {
    fs.writeFileSync(playHistoryCSV, playHistoryHeaders, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('play history headers written successfully!!');
      }
    });
  }
};

const generateSaveSongs = () => {
  writeHeaders('songs');
  // GENERATE AND SAVE SONG EXAMPLES
  for (let i = 1; i <= 10000000; i += 1) {
    // get a username
    const userName =
      users[
        faker.random.number({
          min: 0,
          max: 999,
        })
      ];
    // Create song; songId = i
    const song = [
      i, // song id
      faker.random.number(), // like count
      faker.image.imageUrl(), // song data URL
      faker.random.words(), // song name
      userName, // artist
      faker.random.word(), // album
      faker.image.imageUrl(), // thumbnail url
      '\r',
    ];
    // write song array to file
    fs.appendFileSync(songsCSV, song, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

const generateSaveLikes = () => {
  writeHeaders('likes');
  // GENERATE AND SAVE LIKE EXAMPLES
  for (let i = 0; i < 50000000; i += 1) {
    // get a song id < 10,000,000
    const songId = faker.random.number({
      min: 0,
      max: 9999999,
    });
    // get a username
    const userName =
      users[
        faker.random.number({
          min: 0,
          max: 999,
        })
      ];
    // Create like entry
    const likeEntry = [songId, userName, '\r'];
    // write like array to file
    fs.appendFileSync(likesCSV, likeEntry, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

const generateSavePlayHistory = () => {
  writeHeaders('playHistory');
  // GENERATE AND SAVE PLAY HISTORY EXAMPLES
  for (let i = 0; i < 10000; i += 1) {
    // get a song id
    const songId = faker.random.number({
      min: 0,
      max: 9999999,
    });
    // get a username
    const userName =
      users[
        faker.random.number({
          min: 0,
          max: 999,
        })
      ];
    // Create history entry
    const historyEntry = [songId, userName, '\r'];
    // write history array to file
    fs.appendFileSync(playHistoryCSV, historyEntry, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

// get a list of 1000 users
const users = generateUserList();

const start = Date.now();
// generateSaveSongs();
// generateSaveLikes();
// generateSavePlayHistory();
const end = Date.now();

console.log('total time:', end - start);
