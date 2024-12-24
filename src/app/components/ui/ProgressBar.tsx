import { cva, VariantProps } from 'class-variance-authority';
import { HTMLMotionProps, motion } from 'framer-motion';

const progressBarStyle = cva('h-full absolute left-0 top-0 rounded-md', {
  variants: {
    variant: {
      regular: 'z-20 bg-green-700',
      future: 'h-10 bg-green-400',
    },
  },
  defaultVariants: {
    variant: 'regular',
  },
});

type Props = HTMLMotionProps<'div'> &
  VariantProps<typeof progressBarStyle> & {
    percentaje: string;
  };

export function ProgressBar({
  percentaje,
  className,
  variant,
  ...args
}: Props) {
  return (
    <motion.div
      className={progressBarStyle({ className, variant })}
      animate={{
        width: `${percentaje}%`,
      }}
      initial={{
        width: 0,
      }}
      transition={{
        duration: 2,
        type: 'spring',
      }}
      {...args}
    />
  );
}
