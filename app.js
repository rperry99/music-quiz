const projectName = "[Music Quiz]";

///////////////////////////////////
//////// Element Constants ////////
///////////////////////////////////
// Answer Box
const answerBox = document.querySelector(".answerBox");
const albumArt = document.querySelector(".albumArt");
const songName = document.querySelector(".songName");
const albumArtist = document.querySelector(".albumArtist");
const albumName = document.querySelector(".albumName");
const albumYear = document.querySelector(".albumYear");

// Countdown Timer
const countdownTimer = document.querySelector(".countdown");
const overlay = document.querySelector(".overlay");

//////////////////////////////////
//////// Various Settings ////////
//////////////////////////////////
// How long the song plays
const playTime = 3; // in seconds

// How long you get to guess after the song plays
const guessTime = 5; // in seconds

///////////////////////////////////////////////////
//////// Load a Random Song from the start ////////
///////////////////////////////////////////////////

// This method is temporary. This will need to be reworked once I have access to the local files on my computer.
const songlist = [
  "Songs/01 - Bullhead's Psalm.mp3",
  "Songs/02 - The Sweetest Curse.mp3",
  "Songs/03 - Jake Leg.mp3",
  "Songs/04 - Steel That Sleeps the Eye.mp3",
  "Songs/05 - Swollen and Halo.mp3",
];

//////////////////////////////////
//////// Audio Visualizer ////////
//////////////////////////////////
const audio = document.querySelector("#quizAudio");
const bars = document.querySelectorAll(".bar");
let timerActive = false;

const audioContext = new AudioContext();
const analyzer = audioContext.createAnalyser();

analyzer.fftSize = 256;

const source = audioContext.createMediaElementSource(audio);
source.connect(analyzer);
analyzer.connect(audioContext.destination);

const data = new Uint8Array(analyzer.frequencyBinCount);

function animate() {
  analyzer.getByteFrequencyData(data);

  bars.forEach((bar, index) => {
    const value = data[index];
    const height = Math.max(5, (value / 255) * 100);
    bar.style.height = `${height}px`;
  });

  requestAnimationFrame(animate);
}

audio.addEventListener("play", () => {
  audioContext.resume();
  animate();

  // Song Timer
  setTimeout(() => {
    audio.pause();
    countdownTimer.style.display = "block";
    timerActive = true;
    overlay.style.display = "block";
    startCountdown();
    setTimeout(() => {
      answerBox.style.display = "block";
      countdownTimer.style.display = "none";
      timerActive = false;
    }, guessTime * 1000);
  }, playTime * 1000);
});

/////////////////////////////////////
//////// Play / Pause Button ////////
/////////////////////////////////////
const playPause = document.querySelector(".playPause");

playPause.addEventListener("click", () => {
  playPause.classList.toggle("paused");

  if (audio.paused) {
    const randomSong = songlist[randomNumGen(songlist.length)];

    console.log("Song:", randomSong);
    console.log("Full URL:", new URL(randomSong, window.location.href).href);

    audio.src = randomSong;
    audio.load();

    audio.play().catch((error) => {
      console.error("Playback failed:", error);
    });
    loadSongMetadata();
    audio.play();
  } else {
    audio.pause();
  }
});

/////////////////////////////////////////////////////
//////// jsmediatags // Song Metadata Gabber ////////
/////////////////////////////////////////////////////
function loadSongMetadata() {
  jsmediatags.read(audio.src, {
    onSuccess: function (tag) {
      console.log(tag.tags);

      songName.innerText = tag.tags.title;
      albumArtist.innerText = tag.tags.artist;
      albumName.innerText = tag.tags.album;
      albumYear.innerText = tag.tags.year;

      // Album Art
      const picture = tag.tags.picture;

      if (picture) {
        const byteArray = new Uint8Array(picture.data);
        const blob = new Blob([byteArray], { type: picture.format });
        const imageUrl = URL.createObjectURL(blob);

        albumArt.style.backgroundImage = `url("${imageUrl}")`;
      }
    },

    onError: function (error) {
      console.error("Could not reead metadata:", error);
    },
  });
}

/////////////////////////////////
//////// Countdown Timer ////////
/////////////////////////////////
function startCountdown(duration = guessTime) {
  const number = document.querySelector(".countdownNumber");
  const ring = document.querySelector(".ringProgress");

  countdownTimer.style.display = "block";

  const circumference = 283;

  let startTime = null;

  function update(timestamp) {
    if (!startTime) {
      startTime = timestamp;
    }

    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / (duration * 1000), 1);

    // Update number
    const remaining = Math.ceil(duration - elapsed / 1000);
    number.textContent = remaining;

    // Deplete ring
    ring.style.strokeDashoffset = circumference * progress;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      number.textContent = "0";
    }
  }

  requestAnimationFrame(update);
}

/////////////////////////////////
//////// Overlay OnClick ////////
/////////////////////////////////
overlay.addEventListener("click", () => {
  if (!timerActive) {
    overlay.style.display = "none";
    answerBox.style.display = "none";
  }
});

/////////////////////////////////////////
//////// Random Number Generator ////////
/////////////////////////////////////////
function randomNumGen(max) {
  const min = 0;
  return Math.floor(Math.random() * max);
}
