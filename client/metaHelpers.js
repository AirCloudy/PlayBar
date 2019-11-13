/* eslint-disable no-param-reassign */
import axios from "axios";

const metaHelpers = {
  // Current Player song will always be the first song in the next up playlist
  mount() {
    axios
      .get("http://localhost:3000/songs")
      .then(results => {
        // 1) Get all the songs as the default playlist
        const songs = results.data;
        // 2) Splice out first song and push to upNext playlist
        const upNext = [];
        upNext.push(songs.shift());
        // 3) When setting state, make a songDataURL out of upNext[0]
        // 4) Set state: songs, upNext, songDataURL
        this.setState({
          songs,
          upNext,
          songDataURL: new Audio(upNext[0].songDataURL)
        });
      })
      .catch(err => console.log("mount err: ", err));
  },
  tick(songDataURL) {
    const { songs, upNext, repeat } = this.state;
    // If the song has ended
    //   1) clear the interval,
    //   2) repeat song if necessary,
    //   3) call next if possible,
    //   4) if repeating all AND at the end, restart with previousPlays
    const isEnded = songDataURL.ended;
    if (isEnded) {
      clearInterval(this.time_stampID);
      if (repeat === "Song") {
        songDataURL.currentTime = 0;
        this.setState({ time_stamp: 0 });
      } else if (songs.length > 0 || upNext.length > 0) {
        this.next();
      } else if (repeat === "List") {
        // mount makes a request for the songList, and resets state for songs, upNext, and songDataURL
        this.mount();
      }
    } else {
      // Tick is called each second when playing,
      //   storing the currentTime property from the Audio element
      this.setState({ time_stamp: songDataURL.currentTime });
    }
  },
  shuffle() {
    const { shuffle } = this.state;
    let newStatus;
    //  check shuffle state and rotate between '' and '-alt', where '' references the default classname
    if (shuffle === "") {
      newStatus = "-alt";
    } else {
      newStatus = "";
    }
    this.setState({ shuffle: newStatus });
  },
  repeat() {
    const { repeat } = this.state;
    let newStatus;
    //  check repeat state and rotate between: '' to 'List' to 'Song' back to ''
    if (repeat === "") {
      newStatus = "List";
    } else if (repeat === "List") {
      newStatus = "Song";
    } else {
      newStatus = "";
    }
    this.setState({ repeat: newStatus });
  },
  like(songId, is_liked) {
    const { upNext } = this.state;
    //  Post to the "http://localhost:3000/likes:songId" route to toggle like status
    axios
      .post(`http://localhost:3000/likes/${songId}`, { is_liked: is_liked })
      .then(() => {
        this.setState(state => {
          state.upNext[0].is_liked = state.upNext[0].is_liked ? 0 : 1;
          return { upNext };
        });
      })
      .catch(err => console.log("like err", err));
  }
};

export default metaHelpers;
