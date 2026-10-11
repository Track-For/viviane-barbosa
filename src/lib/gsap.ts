"use client";

import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { Flip } from "gsap/Flip";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip, CustomEase, useGSAP);
  CustomEase.create("calm", "M0,0 C0.16,1 0.3,1 1,1");
}

export { CustomEase, Flip, ScrollTrigger, SplitText, gsap, useGSAP };
