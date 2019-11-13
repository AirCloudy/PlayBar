const Promise = require("bluebird");
const db = require("../Model/index");

module.exports = Promise.promisifyAll({
  songSaver: (song, cb) => {
    const stmt = `INSERT INTO songs (songId, length, time_stamp, is_liked, songDataURL, title, artist, album, thumbnailURL) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
              `;
    const songVals = [
      song.songId,
      song.length,
      song.time_stamp,
      song.is_liked,
      song.songDataURL,
      song.title,
      song.artist,
      song.album,
      song.thumbnailURL
    ];
    db.queryAsync(stmt, songVals)
      .then(results => cb(null, results))
      .catch(err => cb(err));
  },
  playlistSaver: (songId, playlist, cb) => {
    const stmt = `INSERT INTO ${playlist} (songId) 
               VALUES (?)
              `;
    db.queryAsync(stmt, songId)
      .then(results => cb(null, results))
      .catch(err => cb(err));
  },
  songGetter: (songId, cb) => {
    const stmt = "SELECT * FROM songs WHERE id = ?";
    db.queryAsync(stmt, songId)
      .then(results => cb(null, results))
      .catch(err => cb(err));
  },
  // TODO COMPLETE -- AFTER CHOOSING DB
  songPoster: (songId, cb) => {
    const stmt = "SELECT * FROM songs WHERE id = ?";
    db.queryAsync(stmt, songId)
      .then(results => cb(null, results))
      .catch(err => cb(err));
  },
  // TODO COMPLETE -- AFTER CHOOSING DB
  songPutter: (songId, updatedVals, cb) => {
    const stmt = db.query("UPDATE songs SET ? WHERE id = ?");
    db.queryAsync(stmt, [updatedVals, songId])
      .then(results => cb(null, results))
      .catch(err => cb(err));
  },
  // TODO COMPLETE -- AFTER CHOOSING DB
  songDeleter: (songId, cb) => {
    const stmt = "DELETE * FROM songs WHERE id = ?";
    db.queryAsync(stmt, songId)
      .then(results => cb(null, results))
      .catch(err => cb(err));
  },
  playlistGetter: (playlist, cb) => {
    const stmt = `SELECT * FROM ${playlist}`;
    db.queryAsync(stmt)
      .then(results => cb(null, results))
      .catch(err => cb(err));
  },
  likeUpdater: (songId, like, cb) => {
    const newStatus = like ? 0 : 1;
    const stmt = `UPDATE songs SET is_liked = ${newStatus}
                  WHERE songId = ${songId}
                  `;
    db.queryAsync(stmt)
      .then(results => cb(null, results))
      .catch(err => cb(err));
  }
});
