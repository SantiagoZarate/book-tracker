import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Button, ButtonProps } from '../ui/button';

interface Props extends ButtonProps {
  isPending: boolean;
}

export function MotionLoaderButton({ isPending, ...args }: Props) {
  return (
    <Button disabled={isPending} {...args}>
      <AnimatePresence mode="wait">
        {isPending ? (
          <motion.span
            key="spinner"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Loader2 className="animate-spin" />
          </motion.span>
        ) : (
          <motion.span
            key="create"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            Create
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
