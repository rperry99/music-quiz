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

//////////////////////////////////
//////// Audio Visualizer ////////
//////////////////////////////////
const audio = document.querySelector("#quizAudio");
const bars = document.querySelectorAll(".bar");

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
  const timerTime = 10; // In Seconds
  audioContext.resume();
  animate();

  // Song Timer
  setTimeout(() => {
    audio.pause();
    setTimeout(() => {
      answerBox.style.display = "block";
    }, 3000);
  }, timerTime * 1000);
});

/////////////////////////////////////
//////// Play / Pause Button ////////
/////////////////////////////////////
const playPause = document.querySelector(".playPause");

playPause.addEventListener("click", () => {
  playPause.classList.toggle("paused");

  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

/////////////////////////////////////////////////////
//////// jsmediatags // Song Metadata Gabber ////////
/////////////////////////////////////////////////////
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
