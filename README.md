# AirCloudy Play Bar Module

A backend microservice for a fixed-position song playback center, focusing mostly on user interaction via 'like'/'dislike' song status. 

This service was scaled as a proof-of-concept in horizontal scaling, employing a 10-node Apache Cassandra cluster, four Express server instances, and an NGING reverse-proxy/load balancer, all hosted on AWS T2 micro/small services. This scaling (from original 1-node Cassandra, 1 Express server, NGINX reverse-proxy) resulted in an increase from an original ~290 requests per second to ~2100 requests per second with a 0% error rate and a maximum request latency of 140ms.

## Future Considerations

Further improvements could easily by made via vertical scaling (as incredibly underpowered AWS T2 micro and small instances were used), where Cassnadra documentation recommends many more cores of a more powerful CPU with increased RAM for caching. This would easily increase the throughput RPS, which would cause increased stress on already-highly-stressed Express server CPUs, but this should be largely, if not completely, mitigated by commensurate vertical scaling of Express servers.

## Server Routes

### GET /songs/:songid

Get a specific song by songId. The response returns a JSON object of song data.

**Response**

| Name           | Type      | Description                             |
| -------------- | --------- | --------------------------------------- |
| `songId`       | `integer` | Identifier for current song.            |
| `likeCount`    | `integer` | Number of total likes for current song. |
| `isLiked`      | `integer` | Boolean integer of if song is liked.    |
| `songDataURL`  | `string`  | URL of the song audio file.             |
| `songName`     | `string`  | Name of the song.                       |
| `artist`       | `string`  | Astist name.                            |
| `album`        | `string`  | Identifier for the song album.          |
| `thumbnailURL` | `string`  | URL of the song art file.               |

### POST /songs

Insert a new song record into the database. Data should be sent as a JSON object in the body of the request.

**Body**

| Name           | Type     | Description                                |
| -------------- | -------- | ------------------------------------------ |
| `songName`     | `string` | _Required_. Name of the song.              |
| `artist`       | `string` | _Required_. Astist name.                   |
| `album`        | `string` | _Required_. Identifier for the song album. |
| `songDataURL`  | `string` | _Required_. URL of the song audio file.    |
| `thumbnailURL` | `string` | _Required_. URL of the song art file.      |

### PUT /songs

Update a song record in the database. Data should be sent as a JSON object in the body of the request.

**Body**

| Name           | Type      | Description                                      |
| -------------- | --------- | ------------------------------------------------ |
| `songId`       | `integer` | _Required_. Identifier for the song.             |
| `length`       | `integer` | _Optional_. Song length in seconds.              |
| `isLiked`      | `integer` | _Optional_. Boolean integer of if song is liked. |
| `songDataURL`  | `string`  | _Optional_. URL of the song audio file.          |
| `songName`     | `string`  | _Optional_. Song name.                           |
| `artist`       | `string`  | _Optional_. Astist name.                         |
| `album`        | `string`  | _Optional_. Album name.                          |
| `thumbnailURL` | `string`  | _Optional_. URL of the song art file.            |

### DELETE /songs/:songId

Removes a song record from the database, and removes any "like" records related to the song.

**Parameters**

| Name     | Type      | Description                          |
| -------- | --------- | ------------------------------------ |
| `songId` | `integer` | _Required_. Identifier for the song. |

### GET /likes/:songId/:userId

Get current user's like status for a song. Returns true if user has liked song, else false.

**Parameters**

| Name     | Type      | Description                                          |
| -------- | --------- | ---------------------------------------------------- |
| `songId` | `integer` | _Required_. Identifier for the song.                 |
| `userId` | `integer` | _Required_. Identifier for the user liking the song. |

**Response**

| Name            | Type      | Description                                |
| --------------- | --------- | ------------------------------------------ |
| `userLikesSong` | `boolean` | Current user like status for song === true |

### PUT /likes/

Update like for a song. Song data is sent as an object in the request body.

**Parameters**

| Name     | Type      | Description                                          |
| -------- | --------- | ---------------------------------------------------- |
| `songId` | `integer` | _Required_. Identifier for the song.                 |
| `userId` | `integer` | _Required_. Identifier for the user liking the song. |

**Response**

| Text    |
| ------- |
| SUCCESS |

## Installing Dependencies

From within the root directory:

```bash
npm install
```

## Development

From within the root directory, do each of the following:

- Run webpack to build bundle.js

```bash
npm run build
```

- Start the server at port 3000

```bash
npm start
```

```bash
npm run db
```
