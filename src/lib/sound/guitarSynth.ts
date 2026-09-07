"use client";

// Web Audio API pure synthesizer for realistic rock guitar chords, harmonics, and stomp clicks.
// Zero external mp3 dependencies; works instantly and purely in-browser.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play heavy distorted guitar power chord (E5, A5, D5, etc.)
export function playGuitarChord(rootFreq: number = 82.41) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 1.4;

  // Root and 5th harmonic frequencies (Power Chord)
  const frets = [rootFreq, rootFreq * 1.498, rootFreq * 2];

  frets.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Distortion waveshaper
    const waveshaper = ctx.createWaveShaper();
    waveshaper.curve = makeDistortionCurve(180);
    waveshaper.oversample = "4x";

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 1.5, now);

    // Filter to simulate guitar cabinet speaker response (roll off harsh highs)
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2800, now);
    filter.frequency.exponentialRampToValueAtTime(1200, now + duration);

    // Dynamic pluck envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18 / (idx + 1), now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(waveshaper);
    waveshaper.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  });
}

// Single guitar string pluck harmonic
export function playStringPluck(stringIndex: number = 0) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const standardTuning = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63]; // E A D G B E
  const freq = standardTuning[stringIndex % standardTuning.length];
  const now = ctx.currentTime;
  const duration = 0.8;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, now);

  filter.type = "bandpass";
  filter.frequency.setValueAtTime(freq * 2.5, now);
  filter.Q.setValueAtTime(3, now);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.15, now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration);
}

// Mechanical footswitch / pedal toggle click sound
export function playStompClick() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(140, now);
  osc.frequency.exponentialRampToValueAtTime(30, now + 0.05);

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.06);
}

function makeDistortionCurve(amount: number = 50) {
  const k = typeof amount === "number" ? amount : 50;
  const n_samples = 44100;
  const curve = new Float32Array(n_samples);
  const deg = Math.PI / 180;
  for (let i = 0; i < n_samples; ++i) {
    const x = (i * 2) / n_samples - 1;
    curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
  }
  return curve;
}
