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
  - Added additional music to accomodate for future update of being able to find songs from nested folder structure.
    - Additionally updated the JavaScript to account for this new folder structure. Functionality has not been added yet to go through folders, just updated the hard coded song list to match the file structure and use the same 5 Baroness songs.
- Bug Fixes
  - Fixed play button getting stuck on pause visually.
