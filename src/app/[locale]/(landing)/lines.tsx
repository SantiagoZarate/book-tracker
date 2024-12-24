import { arrowLineVariants } from '@/app/components/landing/features/store-session';
import { AnimationProps, motion } from 'framer-motion';

export const topLineTransition: AnimationProps['transition'] = {
  duration: 2,
  delay: 0,
  repeat: Infinity,
  repeatDelay: 3.5,
};

export const midLineTransition: AnimationProps['transition'] = {
  duration: 2,
  delay: 2,
  repeat: Infinity,
  repeatDelay: 2,
};

export const downLineTransition: AnimationProps['transition'] = {
  duration: 2,
  delay: 1,
  repeat: Infinity,
  repeatDelay: 5,
};

export function TopLine() {
  const width = 81;
  const height = 36;

  return (
    <svg width="81" height="36" viewBox="0 0 81 36" fill="none">
      <motion.path
        d="M0 34.9999C47.5 34.9999 28.5 0.999908 81 0.999908"
        stroke="#E5E7EB"
        strokeWidth={1}
      />
      <motion.path
        d="M0 34.9999C47.5 34.9999 28.5 0.999908 81 0.999908"
        strokeLinecap={'round'}
        stroke="url(#top-line)"
        strokeWidth={1}
      />
      <defs>
        <motion.linearGradient
          id="top-line"
          gradientUnits="userSpaceOnUse"
          initial={{
            x1: 0,
            y1: 0,
            x2: 81,
            y2: 36,
          }}
          animate={{
            x1: [0, width * 2],
            x2: [0 - width * 2, width],
            y1: [height, 0 - height],
            y2: [0 - height * 2, 0],
          }}
          transition={topLineTransition}
        >
          <stop offset={0} stopColor="#1d1d20" stopOpacity={0} />
          <stop offset={0.5} stopColor="#3b82f6 " stopOpacity={1} />
          <stop offset={1} stopColor="#292929" stopOpacity={0} />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}

export function MidLine() {
  const width = 82;
  const height = 2;

  return (
    <svg width={width} height={height} viewBox="0 0 82 2" fill="none">
      <motion.path
        d="M0.500244 1.02605L81.4998 0.973946M0.500244 1.02605L81.4998 0.973946"
        stroke="#E5E7EB"
      />
      <motion.path
        d="M0.500244 1.02605L81.4998 0.973946M0.500244 1.02605L81.4998 0.973946"
        stroke="url(#mid-line)"
        strokeWidth="1"
      />
      <defs>
        <motion.linearGradient
          id="mid-line"
          gradientUnits="userSpaceOnUse"
          initial={{
            y1: 0,
            y2: 0,
            x1: -30,
            x2: 0,
          }}
          animate={{
            x1: [0, width * 2],
            x2: [0 - width * 2, width],
            y1: [0, height * 2],
            y2: [0 - height, height],
          }}
          transition={midLineTransition}
        >
          <stop offset="0" stopColor="#1d1d20" stopOpacity="0" />
          <stop offset="0.5" stopColor="#3b82f6 " stopOpacity="1" />
          <stop offset="1" stopColor="#292929" stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}

export function DownLine({ isInView }: { isInView: boolean }) {
  const width = 81;
  const height = 36;

  return (
    <svg width={width} height={height} viewBox="0 0 81 36" fill="none">
      <motion.path
        d="M0 1C47.5 1 28.5 35 81 35"
        stroke="#E5E7EB"
        strokeWidth="1"
        variants={arrowLineVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      />
      <motion.path
        d="M0 1C47.5 1 28.5 35 81 35"
        stroke="url(#down-line)"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <defs>
        <motion.linearGradient
          id="down-line"
          gradientUnits="userSpaceOnUse"
          initial={{
            x1: 0,
            y1: 0,
            x2: 81,
            y2: 36,
          }}
          animate={{
            x1: [0, width * 2],
            x2: [0 - width * 2, width],
            y1: [0, height * 2],
            y2: [0 - height, height],
          }}
          transition={downLineTransition}
        >
          <stop offset="0" stopColor="#1d1d20" stopOpacity="0" />
          <stop offset="0.5" stopColor="#3b82f6" stopOpacity="0.7" />
          <stop offset="1" stopColor="#292929" stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}
