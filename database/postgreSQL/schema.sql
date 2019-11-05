DROP DATABASE IF EXISTS playbar;

CREATE DATABASE playbar;

\c playbar;

CREATE TABLE songs 
(
  songId integer PRIMARY KEY,
  likeId integer,
  album VARCHAR (50),
  artist VARCHAR (50),
  likeCount integer DEFAULT 0,
  likeUserName VARCHAR(50),
  songDataURL VARCHAR (150),
  songName VARCHAR (50),
  thumbnailURL VARCHAR (150)
);

CREATE TABLE likes 
(
  id serial PRIMARY KEY,
  songId integer,
  userName VARCHAR(50),
  FOREIGN KEY (songId)
    REFERENCES songs(songId)
);

CREATE TABLE playHistory 
(
  id serial,
  songId integer,
  userName VARCHAR(50),
  FOREIGN KEY (songId)
    REFERENCES songs(songId)
);

-- INSERT INTO songs (
--   songId,
--   likeId,
--   album, 
--   artist, 
--   likeCount, 
--   likeUserName,
--   songDataURL, 
--   songName, 
--   thumbnailURL
-- )
-- VALUES (   
--   1,
--   2,   
--   'Iron Maiden Album',
--   'Iron Maiden',
--   5,
--   'testlikeusername', 
--   'http://my_song.aws', 
--   'Hallowed Be Thy Name', 
--   'https://my_thumbnail.com/thumbnail1'
-- );

-- INSERT INTO likes (
--   songId, 
--   userName
-- )
-- VALUES (      
--   1,
--   'jonathanO'
-- );

-- INSERT INTO playHistory (
--   songId, 
--   userName
-- )
-- VALUES (      
--   1,
--   'jonathanO'
-- );

-- SELECT * FROM songs;
-- SELECT * FROM likes;
-- SELECT * FROM playHistory;
