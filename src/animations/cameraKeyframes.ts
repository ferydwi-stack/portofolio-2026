import * as THREE from "three";

export interface CameraKeyframe {
  at: number;
  pos: [number, number, number];
  rot: [number, number, number];
}

export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  { at: 0.0, pos: [0, 1.4, 5.8], rot: [0, 0, 0] }, // Hero dolly-in start
  { at: 0.15, pos: [0, 1.3, 4.5], rot: [0, 0, 0] }, // Hero settled
  { at: 0.35, pos: [-2.2, 1.0, 4.2], rot: [0, 0.28, 0] }, // About pull-back-diagonal (positions guitarist cleanly on right)
  { at: 0.55, pos: [0, 2.0, 7.8], rot: [0, 0, 0] }, // Skills wide shot
  { at: 0.75, pos: [1.5, 1.0, 3.5], rot: [0, -0.2, 0] }, // Projects/Certs
  { at: 1.0, pos: [0, 1.2, 3.0], rot: [0, 0, 0] }, // Contact close-up
];

export function mapScrollToCameraKeyframes(progress: number) {
  const p = Math.max(0, Math.min(1, progress));

  // Find the two adjacent keyframes
  let i = 0;
  while (i < CAMERA_KEYFRAMES.length - 1 && CAMERA_KEYFRAMES[i + 1].at < p) {
    i++;
  }

  const k1 = CAMERA_KEYFRAMES[i];
  const k2 = CAMERA_KEYFRAMES[Math.min(i + 1, CAMERA_KEYFRAMES.length - 1)];

  if (k1 === k2 || k2.at === k1.at) {
    return {
      pos: k1.pos,
      rot: k1.rot,
    };
  }

  const t = (p - k1.at) / (k2.at - k1.at);
  const smoothT = THREE.MathUtils.smoothstep(t, 0, 1);

  return {
    pos: [
      THREE.MathUtils.lerp(k1.pos[0], k2.pos[0], smoothT),
      THREE.MathUtils.lerp(k1.pos[1], k2.pos[1], smoothT),
      THREE.MathUtils.lerp(k1.pos[2], k2.pos[2], smoothT),
    ] as [number, number, number],
    rot: [
      THREE.MathUtils.lerp(k1.rot[0], k2.rot[0], smoothT),
      THREE.MathUtils.lerp(k1.rot[1], k2.rot[1], smoothT),
      THREE.MathUtils.lerp(k1.rot[2], k2.rot[2], smoothT),
    ] as [number, number, number],
  };
}
