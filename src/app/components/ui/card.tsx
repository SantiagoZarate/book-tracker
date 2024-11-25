import { Motion } from '@/app/lib/motion';
import { Variants } from 'framer-motion';
import React, { ComponentProps } from 'react';

interface Props extends ComponentProps<'section'> {
  description: string;
  isInView: boolean;
  title: string;
}

const textVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const Card = React.forwardRef<HTMLDivElement, Props>(
  ({ isInView, ...args }, ref) => (
    <div
      className="rounded-lg border border-muted bg-background p-2 shadow-lg"
      ref={ref}
      {...args}
    >
      <header className="flex flex-col gap-1">
        <Motion
          animate={isInView ? 'visible' : 'hidden'}
          variants={textVariants}
          initial="hidden"
        >
          {args.title}
        </Motion>
        <Motion>{args.description}</Motion>
      </header>
      {args.children}
    </div>
  ),
);

Card.displayName = 'Card';

export { Card };
