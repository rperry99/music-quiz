const projectName = "[Music Quiz]";

// Audio Visualizer
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
  const timerTime = 10;
  audioContext.resume();
  animate();

  // Song Timer
  setTimeout(() => {
    audio.pause();
  }, timerTime * 1000);
});
