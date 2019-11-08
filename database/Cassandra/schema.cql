DROP KEYSPACE IF EXISTS mykeyspace;

CREATE KEYSPACE mykeyspace WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 2
};

USE mykeyspace;

CREATE TABLE songs (  
   songId int,
   likeId int,
   album text,
   artist text,
   likeCount int,
   likeUserName text,
   songDataURL text,
   songName text,
   thumbnailURL text,
   PRIMARY KEY (songId, likeID)
);

CREATE TABLE playHistory (
   songId int,
   userName text, 
   PRIMARY KEY (songId, userName)
);

INSERT INTO songs (
   songId, 
   likeId,
   album,
   artist,
   likeCount,
   likeUserName,
   songDataURL,
   songName,
   thumbnailURL
   ) 
   VALUES (
      1, 
      12,
      'Iron Maiden Album',
      'Iron Maiden',
      5, 
      'myUsername',
      'http://my_song.aws', 
      'Hallowed Be Thy Name', 
      'https://my_thumbnail.com/thumbnail1'
      );

select * from songs;
select * from playHistory;