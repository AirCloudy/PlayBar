const faker = require('faker');
const fs = require('fs');

const generateUserList = () => {
    const users = [];
    for (let i = 0; i < 1000; i += 1) {
      users.push(faker.internet.userName());
    }
    return users;
  };

const users = generateUserList();

const writeSongs = fs.createWriteStream('/Users/jonathanolson/HackReactor/SDC/playbar/database/data/songsCASSANDRAREMAINDER.csv');
writeSongs.write('songId,likeId,album,artist,likeCount,likeUserName,songDataURL,songName,thumbnailURL\n', 'utf8');


const writeRemainingSongs = (writer, encoding, callback) => {
    let i = 10000000;
    function write() {
        let ok = true;
        do {
        i -= 1;
        const userName =
        users[
        faker.random.number({
            min: 0,
            max: 999,
        })
        ];
        const data = `${i},${-1},${faker.random.word()},${userName},${faker.random.number()},${'likeUserName_example'},${faker.image.imageUrl()},${faker.random.word().slice()},${faker.image.imageUrl()}\n`;
        if (i === 8385062) {
            writer.write(data, encoding, callback);
        } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
            ok = writer.write(data, encoding);
        }
        } while (i > 8385062 && ok);
        if (i > 8385062) {
        // had to stop early!
        // write some more once it drains
        writer.once('drain', write);
        }
    }
    write()
}
 writeRemainingSongs(writeSongs, 'utf-8', () => {
  writeSongs.end();
});