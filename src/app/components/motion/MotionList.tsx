'use client';

import { cn } from '@/app/lib/utils';
import { HTMLMotionProps, motion, Variants } from 'framer-motion';

type Props = HTMLMotionProps<'ul'>;

const variants: Variants = {
  hidden: {
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.3,
    },
  },
  visible: {
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
  },
  exit: {
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.3,
    },
  },
};

export function MotionList({ ...args }: Props) {
  return (
    <motion.ul
      className={cn(args.className)}
      variants={variants}
      animate="visible"
      initial="hidden"
      exit="exit"
      {...args}
    />
  );
}
