'use client';

import { cn } from '@/app/lib/utils';
import { HTMLMotionProps, motion, Variants } from 'framer-motion';
import { forwardRef } from 'react';

const itemVariants: Variants = {
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  hidden: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 },
    filter: 'blur(10px)',
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 },
    filter: 'blur(10px)',
  },
};

type Props = HTMLMotionProps<'li'>;

export const MotionListItem = forwardRef<HTMLLIElement, Props>((args, ref) => (
  <motion.li
    className={cn(args.className)}
    variants={itemVariants}
    ref={ref}
    {...args}
  />
));

MotionListItem.displayName = 'MotionListItem';
