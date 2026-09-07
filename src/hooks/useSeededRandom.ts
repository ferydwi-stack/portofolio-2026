export function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getSeededCertificateTransforms(index: number) {
  const rand = mulberry32(index * 1000 + 7);
  const rot = rand() * 16 - 8; // -8deg to +8deg
  const offsetY = (rand() - 0.5) * 24; // -12px to +12px
  const offsetX = (rand() - 0.5) * 16; // -8px to +8px

  return {
    rotation: Math.round(rot),
    offsetY: Math.round(offsetY),
    offsetX: Math.round(offsetX),
  };
}
