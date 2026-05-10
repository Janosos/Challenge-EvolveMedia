let audioCtx = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const playSound = (type, isMuted) => {
  if (isMuted) return;
  initAudio();
  
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  const now = audioCtx.currentTime;
  
  if (type === 'match') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
    gainNode.gain.setValueAtTime(0.5, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  } else if (type === 'mismatch') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.2);
    gainNode.gain.setValueAtTime(0.5, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  } else if (type === 'tick') {
    osc.type = 'square';
    osc.frequency.setValueAtTime(1000, now);
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    osc.start(now);
    osc.stop(now + 0.05);
  }
};

// For background, we'll just mock it as it's complex to generate a song.
// We'll use an HTML Audio element if a source is provided, otherwise ignore.
let bgAudio = null;

export const playBackground = (isMuted) => {
  if (isMuted) {
    if (bgAudio) bgAudio.pause();
    return;
  }
  
  if (!bgAudio) {
    // Dummy audio URL that fails gracefully
    bgAudio = new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=');
    bgAudio.loop = true;
    bgAudio.volume = 0.2;
  }
  
  bgAudio.play().catch(e => {
    // console.log("No actual background audio file to play");
  });
};
