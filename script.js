const VERSION = '?v=5';
const STAGES = [
  'assets/01-envelope-fechado.png' + VERSION,
  'assets/02-envelope-abrindo.png' + VERSION,
  'assets/03-convite-aparecendo.png' + VERSION
];
const FINAL_IMAGE = 'assets/04-convite-completo.png' + VERSION;

const inviteButton = document.getElementById('inviteButton');
const sceneImage = document.getElementById('sceneImage');
const finalViewport = document.getElementById('finalViewport');
const finalImage = document.getElementById('finalImage');
const viewerWindow = document.getElementById('viewerWindow');
const tapHint = document.getElementById('tapHint');
const replayBtn = document.getElementById('replayBtn');

let isPlaying = false;
let isFinished = false;
let preloadPromise = null;
let endTimer = null;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error('Falha ao carregar ' + src));
    img.src = src;
  });
}

function preloadAll() {
  if (!preloadPromise) {
    preloadPromise = Promise.all([...STAGES, FINAL_IMAGE].map(loadImage));
  }
  return preloadPromise;
}

function clearTimers() {
  if (endTimer) {
    clearTimeout(endTimer);
    endTimer = null;
  }
}

function resetState() {
  clearTimers();
  isPlaying = false;
  isFinished = false;
  sceneImage.src = STAGES[0];
  sceneImage.classList.remove('hidden');
  finalViewport.classList.remove('visible');
  finalImage.style.transition = 'none';
  finalImage.style.transform = 'translateY(0)';
  tapHint.classList.remove('hidden');
  replayBtn.hidden = true;
}

function runFinalScroll() {
  const viewportHeight = viewerWindow.clientHeight;
  const imageHeight = finalImage.getBoundingClientRect().height;
  const overflow = Math.max(0, imageHeight - viewportHeight);

  finalImage.style.transition = 'none';
  finalImage.style.transform = 'translateY(0)';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const duration = Math.max(6500, overflow * 18);
      finalImage.style.transition = `transform ${duration}ms ease-in-out`;
      finalImage.style.transform = `translateY(-${overflow}px)`;
      endTimer = setTimeout(() => {
        isPlaying = false;
        isFinished = true;
        replayBtn.hidden = false;
      }, duration + 120);
    });
  });
}

async function playSequence() {
  if (isPlaying || isFinished) return;
  isPlaying = true;
  tapHint.classList.add('hidden');
  replayBtn.hidden = true;

  try {
    await preloadAll();
  } catch (error) {
    console.error(error);
    isPlaying = false;
    tapHint.classList.remove('hidden');
    return;
  }

  sceneImage.classList.remove('hidden');
  finalViewport.classList.remove('visible');

  sceneImage.src = STAGES[0];
  await sleep(450);
  sceneImage.src = STAGES[1];
  await sleep(950);
  sceneImage.src = STAGES[2];
  await sleep(1150);

  sceneImage.classList.add('hidden');
  finalViewport.classList.add('visible');
  runFinalScroll();
}

inviteButton.addEventListener('click', playSequence);
inviteButton.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    playSequence();
  }
});
replayBtn.addEventListener('click', resetState);
window.addEventListener('resize', () => {
  if (isFinished) {
    runFinalScroll();
  }
});

finalImage.src = FINAL_IMAGE;
preloadAll().catch((error) => console.error(error));
resetState();
