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

const writeUsers = fs.createWriteStream('/Users/jonathanolson/HackReactor/SDC/playbar/database/data/likesPOSTGRES.csv');
writeUsers.write('likeId|UserName\n', 'utf8');

const write50MillionLikes = (writer, encoding, callback) => {
    let i = 50000000;
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
        const data = `${i}|${userName}\n`;
        if (i === 0) {
            writer.write(data, encoding, callback);
        } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
            ok = writer.write(data, encoding);
        }
        } while (i > 0 && ok);
        if (i > 0) {
        // had to stop early!
        // write some more once it drains
        writer.once('drain', write);
        }
    }
    write()
}

write50MillionLikes(writeUsers, 'utf-8', () => {
  writeUsers.end();
});