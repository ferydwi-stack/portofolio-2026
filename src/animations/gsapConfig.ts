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
  stageIn: "power4.out",
  stageInOut: "power4.inOut",
  elasticSlam: "elastic.out(1, 0.4)",
  smoothTrack: "power2.out",
  guitarSnap: "back.out(1.7)",
};
