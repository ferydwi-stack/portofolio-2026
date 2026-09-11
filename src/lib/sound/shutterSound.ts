/**
 * Web Audio API Camera Shutter Sound Synthesizer
 * Provides authentic mechanical shutter click and recharge sound without external audio files.
 */

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

/**
 * Play a vintage camera shutter click:
 * 1. Initial mirror slap / shutter curtain opening (quick noise click)
 * 2. Secondary mechanical click (spring release & blade closing)
 */
export function playShutterSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Initial click (noise buffer)
    const bufferSize = Math.floor(ctx.sampleRate * 0.04);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1400, now);
    filter.Q.setValueAtTime(3.0, now);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.35, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.04);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    whiteNoise.start(now);

    // 2. Metallic mechanical body resonance (damped oscillator)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.05);

    oscGain.gain.setValueAtTime(0.2, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);

    // 3. Second shutter curtain close click (after 80ms)
    setTimeout(() => {
      if (!ctx || ctx.state === "closed") return;
      const t2 = ctx.currentTime;
      const osc2 = ctx.createOscillator();
      const osc2Gain = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(450, t2);
      osc2Gain.gain.setValueAtTime(0.18, t2);
      osc2Gain.gain.exponentialRampToValueAtTime(0.001, t2 + 0.04);

      osc2.connect(osc2Gain);
      osc2Gain.connect(ctx.destination);
      osc2.start(t2);
      osc2.stop(t2 + 0.045);
    }, 75);
  } catch {
    // Graceful silent fallback if Web Audio is blocked or unsupported
  }
}
