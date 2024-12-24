'use client';

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import {
  DownLine,
  downLineTransition,
  MidLine,
  midLineTransition,
  TopLine,
  topLineTransition,
} from '@/app/[locale]/(landing)/lines';
import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import { BookDrawIcon } from '../../icons/BookDrawIcon';

export const arrowLineVariants: Variants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
};

const itemAnimation: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.1, 1],
  },
};

export function StoreSession() {
  const container = useRef<HTMLDivElement>(null);
  const isInView = useInView(container);

  return (
    <>
      <div className="flex size-12 items-center justify-center rounded-md bg-input text-black/50">
        <BookDrawIcon />
      </div>
      <div className="relative" ref={container}>
        <TopLine />
        <MidLine />
        <DownLine isInView={isInView} />
      </div>
      <ul className="flex flex-col gap-3 *:flex *:h-[20px] *:w-[70px] *:items-center *:justify-center *:rounded-md *:bg-input *:text-xs *:text-black/50">
        <motion.li
          {...itemAnimation}
          transition={{
            ...topLineTransition,
            delay: topLineTransition?.delay! + 1,
          }}
        >
          session #1
        </motion.li>
        <motion.li
          {...itemAnimation}
          transition={{
            ...midLineTransition,
            delay: midLineTransition?.delay! + 1,
          }}
        >
          session #2
        </motion.li>
        <motion.li
          {...itemAnimation}
          transition={{
            ...downLineTransition,
            delay: downLineTransition?.delay! + 1,
          }}
        >
          session #3
        </motion.li>
      </ul>
    </>
  );
}
