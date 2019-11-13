/* eslint-disable node/no-unsupported-features/es-syntax */
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 240,
  duration: "30m"
};

export default function() {
  let res = http.get("http://localhost:3000/songs/10000000/jonathan");
  check(res, {
    "status was 200": r => r.status == 200,
    "transaction time OK": r => r.timings.duration < 200
  });
  sleep(1);
}
