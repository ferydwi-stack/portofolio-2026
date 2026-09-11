import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isRegistered = false;

export function registerGSAP() {
  if (typeof window !== "undefined" && !isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });
    isRegistered = true;
  }
}

export const EASINGS = {
  /** Shutter closing — snappy in-out */
  shutterInOut: "power3.inOut",
  /** Flash fading out */
  flashOut: "power4.out",
  /** Photo developing — smooth reveal */
  developing: "power2.out",
  /** Snap focus — quick settle with overshoot */
  snapFocus: "back.out(1.4)",
  /** Gentle float for polaroid entrance */
  polaroidDrop: "power2.out",
  /** Elastic bounce for confetti */
  confettiBounce: "elastic.out(1, 0.5)",
};
