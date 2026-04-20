const VERSION = '?v=4';
const STAGES = [
  'assets/01-envelope-fechado.png' + VERSION,
  'assets/02-envelope-abrindo.png' + VERSION,
  'assets/03-convite-aparecendo.png' + VERSION
];
const FINAL_IMAGE = 'assets/04-convite-completo.png' + VERSION;

const inviteButton = document.getElementById('inviteButton');
const stageImage = document.getElementById('stageImage');
const finalViewport = document.getElementById('finalViewport');
const finalImage = document.getElementById('finalImage');
const viewerWindow = document.getElementById('viewerWindow');
const tapHint = document.getElementById('tapHint');
const replayBtn = document.getElementById('replayBtn');

let playing = false;
let finished = false;
let scrollTimeout = null;

function preloadImages(urls) {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function resetState() {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
    scrollTimeout = null;
  }
  playing = false;
  finished = false;
  stageImage.src = STAGES[0];
  stageImage.classList.remove('is-hidden');
  finalViewport.classList.remove('is-visible');
  finalImage.style.transition = 'none';
  finalImage.style.transform = 'translateY(0)';
  tapHint.classList.remove('hidden');
  replayBtn.hidden = true;
}

function animateFinalScroll() {
  const viewportHeight = viewerWindow.clientHeight;
  const imageHeight = finalImage.getBoundingClientRect().height;
  const overflow = Math.max(0, imageHeight - viewportHeight);

  finalImage.style.transition = 'none';
  finalImage.style.transform = 'translateY(0)';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const duration = Math.max(7000, overflow * 16);
      finalImage.style.transition = `transform ${duration}ms ease-in-out`;
      finalImage.style.transform = `translateY(-${overflow}px)`;
      scrollTimeout = setTimeout(() => {
        finished = true;
        playing = false;
        replayBtn.hidden = false;
      }, duration + 100);
    });
  });
}

async function playSequence() {
  if (playing || finished) return;
  playing = true;
  tapHint.classList.add('hidden');

  for (let i = 0; i < STAGES.length; i++) {
    stageImage.src = STAGES[i];
    await sleep(i === 0 ? 550 : 1050);
  }

  stageImage.classList.add('is-hidden');
  finalViewport.classList.add('is-visible');

  if (finalImage.complete) {
    animateFinalScroll();
  } else {
    finalImage.onload = () => animateFinalScroll();
  }
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
  if (finished) {
    animateFinalScroll();
  }
});

preloadImages([...STAGES, FINAL_IMAGE]);
finalImage.src = FINAL_IMAGE;
resetState();
