const basePath = import.meta.env.BASE_URL;

const sounds = {
  match: new Audio(`${basePath}assets/correct.mp3`),
  mismatch: new Audio(`${basePath}assets/incorrect.mp3`),
  tick: new Audio(`${basePath}assets/ticking.mp3`)
};

export const playSound = (type, isMuted) => {
  if (isMuted || !sounds[type]) return;
  
  const audioNode = sounds[type].cloneNode();
  audioNode.volume = type === 'tick' ? 0.3 : 0.8;
  audioNode.play().catch(e => console.log("Sound play blocked:", e));
};

let bgAudio = null;

export const playBackground = (isMuted) => {
  if (isMuted) {
    if (bgAudio) bgAudio.pause();
    return;
  }
  
  if (!bgAudio) {
    bgAudio = new Audio(`${basePath}assets/background.mp3`);
    bgAudio.loop = true;
    bgAudio.volume = 0.2;
  }
  
  bgAudio.play().catch(e => {
    // Browser might block autoplay
  });
};
