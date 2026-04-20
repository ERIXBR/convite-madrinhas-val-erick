const stageSources = [
  'assets/01-envelope-fechado.png',
  'assets/02-envelope-abrindo.png',
  'assets/03-convite-aparecendo.png'
];
const finalSource = 'assets/04-convite-completo.png';

const inviteTrigger = document.getElementById('inviteTrigger');
const stageImage = document.getElementById('stageImage');
const finalWrapper = document.getElementById('finalWrapper');
const finalImage = document.getElementById('finalImage');
const viewport = document.getElementById('viewport');
const tapHint = document.getElementById('tapHint');
const replayBtn = document.getElementById('replayBtn');

let playing = false;
let finished = false;
let endTimer = null;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function preload(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

async function preloadAll() {
  await Promise.all([...stageSources, finalSource].map(preload));
}

function clearEndTimer() {
  if (endTimer) {
    clearTimeout(endTimer);
    endTimer = null;
  }
}

function resetState() {
  clearEndTimer();
  playing = false;
  finished = false;
  stageImage.src = stageSources[0];
  stageImage.classList.remove('hidden');
  finalWrapper.classList.remove('visible');
  finalImage.style.transition = 'none';
  finalImage.style.transform = 'translateY(0)';
  tapHint.classList.remove('hidden');
  replayBtn.hidden = true;
}

function startFinalScroll() {
  const viewportHeight = viewport.clientHeight;
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
        playing = false;
        finished = true;
        replayBtn.hidden = false;
      }, duration + 120);
    });
  });
}

async function ensureFinalLoaded() {
  if (finalImage.complete && finalImage.naturalWidth > 0) return;
  await new Promise(resolve => {
    finalImage.onload = () => resolve();
    finalImage.onerror = () => resolve();
  });
}

async function playSequence() {
  if (playing || finished) return;
  playing = true;
  tapHint.classList.add('hidden');
  replayBtn.hidden = true;

  stageImage.src = stageSources[0];
  await sleep(450);
  stageImage.src = stageSources[1];
  await sleep(950);
  stageImage.src = stageSources[2];
  await sleep(1150);

  stageImage.classList.add('hidden');
  finalWrapper.classList.add('visible');
  await ensureFinalLoaded();
  startFinalScroll();
}

inviteTrigger.addEventListener('click', playSequence);
inviteTrigger.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    playSequence();
  }
});
replayBtn.addEventListener('click', resetState);
window.addEventListener('resize', () => {
  if (finished) startFinalScroll();
});

finalImage.src = finalSource;
preloadAll();
resetState();
