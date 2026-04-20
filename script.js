const frameSources = [
  'assets/01-envelope-fechado.png',
  'assets/02-envelope-abrindo.png',
  'assets/03-convite-aparecendo.png'
];

const frameImage = document.getElementById('frameImage');
const frameLayer = document.getElementById('frameLayer');
const scrollLayer = document.getElementById('scrollLayer');
const scrollImage = document.getElementById('scrollImage');
const tapOverlay = document.getElementById('tapOverlay');
const inviteArea = document.getElementById('inviteArea');
const viewerWindow = document.getElementById('viewerWindow');
const replayBtn = document.getElementById('replayBtn');

let playing = false;
let revealed = false;
let scrollTimer = null;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function resetScrollState() {
  if (scrollTimer) {
    clearTimeout(scrollTimer);
    scrollTimer = null;
  }
  scrollImage.style.transition = 'none';
  scrollImage.style.transform = 'translateY(0)';
  scrollLayer.classList.remove('active');
  frameLayer.classList.remove('fade-out');
  frameImage.src = frameSources[0];
  tapOverlay.classList.remove('hidden');
  replayBtn.hidden = true;
  revealed = false;
}

function animateTallInvite() {
  const viewportHeight = viewerWindow.clientHeight;
  const imageHeight = scrollImage.getBoundingClientRect().height;
  const overflow = Math.max(0, imageHeight - viewportHeight);

  scrollImage.style.transition = 'none';
  scrollImage.style.transform = 'translateY(0)';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const duration = Math.max(7000, overflow * 14);
      scrollImage.style.transition = `transform ${duration}ms ease-in-out`;
      scrollImage.style.transform = `translateY(-${overflow}px)`;
      scrollTimer = setTimeout(() => {
        replayBtn.hidden = false;
        revealed = true;
        playing = false;
      }, duration + 120);
    });
  });
}

async function playSequence() {
  if (playing) return;
  playing = true;
  tapOverlay.classList.add('hidden');
  replayBtn.hidden = true;

  frameLayer.classList.remove('fade-out');
  scrollLayer.classList.remove('active');
  scrollImage.style.transition = 'none';
  scrollImage.style.transform = 'translateY(0)';

  for (let i = 0; i < frameSources.length; i++) {
    frameImage.src = frameSources[i];
    await sleep(i === 0 ? 500 : 950);
  }

  frameLayer.classList.add('fade-out');
  scrollLayer.classList.add('active');

  if (scrollImage.complete) {
    animateTallInvite();
  } else {
    scrollImage.onload = animateTallInvite;
  }
}

function restartSequence() {
  resetScrollState();
}

inviteArea.addEventListener('click', () => {
  if (!revealed) {
    playSequence();
  }
});

inviteArea.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    if (!revealed) {
      playSequence();
    }
  }
});

replayBtn.addEventListener('click', restartSequence);
window.addEventListener('resize', () => {
  if (revealed) {
    scrollImage.style.transition = 'none';
    scrollImage.style.transform = 'translateY(0)';
    requestAnimationFrame(() => {
      animateTallInvite();
    });
  }
});

resetScrollState();
