import { Variants } from "framer-motion";

export const fadeInAndOut: Variants = {
  initial: {
    opacity: 0,
    filter: "blur(5px)",
    x: -10,
  },
  exit: {
    opacity: 0,
    filter: "blur(5px)",
    x: -10,
  },
  animate: {
    opacity: 0.5,
    filter: "blur(0px)",
    x: 0,
  },
};
