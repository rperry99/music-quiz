# Music Quiz

An app where you can use your local music files to do a name that tune style quiz.

## Music

Currently, there are 5 songs from Baroness. These are intended to just be for testing, and will be removed once testing is done.

## Change Log

### 9/8/26

---

- Added a visualizer for the song that reacts to the current song playing.
- Add a timer so the song only plays for 10 seconds.
- Add Custom play/pause button and removed HTML controls for audio.
- Add a pop up after 10 seconds that shows the information on the song. Metadata pulled with `jsmediatags`.
- Add a countdown timer for the amount of time you get to guess for.
- A random song is chosen from the song list when play it clicked. (This will be a temporary change).

### 9/9/26

---

- Updates
  - Added a setting for adjusting the time the song plays.
  - Added a setting for adjusting the time of the guess.
  - Music now can reside within nested folders.
    - Currently, I have to run `node generateSongList.js` to be able to generate the `songlist.js` file. This `songlist.js` file is the same as the hard-coded array I had in `app.js` just not written by me. **Imporatant:** If I update the folder for the songs, I will need to run `node generateSongList.js` again to update the list of songs.
- Bug Fixes
  - Fixed play button getting stuck on pause visually.
