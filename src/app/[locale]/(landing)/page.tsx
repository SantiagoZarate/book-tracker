/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
'use client';

import { BookDrawIcon } from '@/app/components/icons/BookDrawIcon';
import { HeroSection } from '@/app/components/landing/hero/hero-section';
import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import {
  DownLine,
  downLineTransition,
  MidLine,
  midLineTransition,
  TopLine,
  topLineTransition,
} from './lines';

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

export default function LandingPage() {
  const container = useRef<HTMLDivElement>(null);
  const isInView = useInView(container);

  return (
    <main className="relative mx-auto grid h-full max-w-screen-lg grid-rows-[1fr_auto] flex-col gap-6">
      <HeroSection />
      <section className="grid grid-cols-3">
        <section className="flex flex-col gap-1 rounded-md bg-muted p-2 shadow-xl">
          <p>Store sessions</p>
          <div className="flex items-center rounded-md border border-muted bg-background p-2">
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
          </div>
        </section>
      </section>
    </main>
  );
}
