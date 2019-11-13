/* eslint-disable node/no-unsupported-features/es-syntax */
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 240,
  duration: "5s"
};

let songId = 12000000;

export default function() {
  const songObj = {
    songId: songId++,
    likeCount: 1,
    songDataURL: "http://69.com",
    songName: "song 69 test2",
    artist: "artist 69",
    album: "album 69 2",
    thumbnailURL: "http://69.com",
    likeId: 1
  };
  const payload = JSON.stringify(songObj);
  const params = { headers: { "Content-Type": "application/json" } };
  let res = http.post(
    "http://localhost:3000/songs/10000000/jonathan",
    payload,
    params
  );
  check(res, {
    "status was 200": r => r.status == 200,
    "transaction time OK": r => r.timings.duration < 200
  });
  sleep(1);
}
