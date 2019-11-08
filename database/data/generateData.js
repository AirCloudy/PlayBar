const faker = require('faker');
const fs = require('fs');

// Save data as both csv and json
// const songsCSV =
//   '/Users/jonathanolson/HackReactor/SDC/playbar/database/data/songs.csv';

const songsCSV =
  '/Users/jonathanolson/HackReactor/SDC/playbar/database/data/songsSMALL.csv';
const likesCSVCassandra =
  '/Users/jonathanolson/HackReactor/SDC/playbar/database/data/likesCASSANDRA.csv';
const likesCSVPostgres =
  '/Users/jonathanolson/HackReactor/SDC/playbar/database/data/likesPOSTGRESBAR.csv';
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
    'likeId',
    'album',
    'artist',
    'likeCount',
    'likeUserName',
    'songDataURL',
    'songName',
    'thumbnailURL\n',
  ];
  const likeHeadersPostgres = `songId|userName\n`;
  const likeHeadersCassandra = ['songId', 'likeId', 'likeUserName\n'];
  const playHistoryHeaders = ['songId', 'userName\n'];

  if (filename === 'songs') {
    fs.writeFileSync(songsCSV, songsHeaders, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('song headers written successfully!!');
      }
    });
  }
  if (filename === 'likesCASSANDRA') {
    fs.writeFileSync(likesCSVCassandra, likeHeadersCassandra, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('like cassandra headers written successfully!!');
      }
    });
  }
  if (filename === 'likesPOSTGRES') {
    fs.writeFileSync(likesCSVPostgres, likeHeadersPostgres, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('like postgres headers written successfully!!');
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

// get a list of 1000 users
const users = generateUserList();

const generateSaveSongs = () => {
  writeHeaders('songs');
  // GENERATE AND SAVE SONG EXAMPLES
  for (let i = 1; i <= 100; i += 1) {
    // get a username
    const userName =
      users[
        faker.random.number({
          min: 0,
          max: 999,
        })
      ];
    // Create song; songId = i
    const song = 
     // song id
      // likeid
      // album
      // artist
      // like count
      // likeusername
      // song data URL
      // song name
      // thumbnail url
      `${i}|'${-1}'|${faker.random.word()}|${userName}|${faker.random.number()}|${'likeUserName_example'}|${faker.image.imageUrl()}|${faker.random.word().slice()}|${faker.image.imageUrl()}\n`;
    // write song array to file
    fs.appendFileSync(songsCSV, song, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

const generateSavelikesCASSANDRA = () => {
  writeHeaders('likesCASSANDRA');
  // GENERATE AND SAVE LIKE EXAMPLES
  for (let i = 0; i < 100; i += 1) {
    // get a song id < 10,000,000
    const songId = faker.random.number({
      min: 0,
      max: 9999999,
    });
    // get a username
    const likeUserName =
      users[
        faker.random.number({
          min: 0,
          max: 999,
        })
      ];
    // Create like entry
    const likeEntry = `${songId}|${i}|${likeUserName}\n`;
    // write like array to file
    fs.appendFileSync(likesCSVCassandra, likeEntry, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

const generateSavelikesPOSTGRES = () => {
  writeHeaders('likesPOSTGRES');
  // GENERATE AND SAVE LIKE EXAMPLES
  for (let i = 0; i < 100; i += 1) {
    // get a song id < 10,000,000
    const songId = faker.random.number({
      min: 0,
      max: 9999999,
    });
    // get a username
    const likeUserName =
      users[
        faker.random.number({
          min: 0,
          max: 999,
        })
      ];
    // Create like entry
    const likeEntry = `${songId}|${likeUserName}\n`;
    // write like array to file
    fs.appendFileSync(likesCSVPostgres, likeEntry, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

const generateSavePlayHistory = () => {
  writeHeaders('playHistory');
  // GENERATE AND SAVE PLAY HISTORY EXAMPLES
  for (let i = 0; i < 25000; i += 1) {
    // get a song id
    const songId = faker.random.number({
      min: 1,
      max: 10000000,
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
    const historyEntry = `${songId}|${userName}\n`;
    // write history array to file
    fs.appendFileSync(playHistoryCSV, historyEntry, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

const start = Date.now();
// generateSaveSongs();
// generateSavelikesCASSANDRA();
generateSavelikesPOSTGRES();
// generateSavePlayHistory();
const end = Date.now();

console.log('total time:', end - start);
