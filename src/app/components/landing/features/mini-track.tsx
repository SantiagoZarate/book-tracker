'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function getRandomPercentage() {
  return (Math.random() * 90 + 10).toFixed(0);
}

interface Props {
  order: number;
}

function getTranslate(order: number) {
  if (order === 1) return '1.5em';
  if (order === 2) return '1em';
  if (order === 3) return '.5em';
  if (order === 5) return '-.5em';
  if (order === 6) return '-1em';
  if (order === 7) return '-1.5em';
  return '0em';
}

export function MiniTrack({ order }: Props) {
  const [percentage, setPercentage] = useState<string>('');

  useEffect(() => {
    setPercentage(getRandomPercentage());

    const interval = setInterval(() => {
      setPercentage(getRandomPercentage());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.li
      initial={{
        opacity: 0,
        x: 100,
      }}
      animate={{
        opacity: 1,
        x: getTranslate(order),
      }}
      transition={{
        type: 'spring',
        duration: 1,
      }}
      data-completed={Number(percentage) >= 90}
      className="flex w-[40%] items-center gap-1 rounded-md border border-muted bg-background px-2 py-[2px] shadow-lg transition-colors data-[completed='true']:bg-green-800"
    >
      <p className="text-[10px] text-border">{percentage}%</p>
      <section className="relative h-[2px] w-full overflow-hidden rounded-full">
        <div className="absolute inset-0 bg-border" />
        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: `${percentage}%`,
          }}
          transition={{
            duration: 2,
            type: 'spring',
          }}
          className="absolute inset-0 bg-blue-500"
        />
      </section>
    </motion.li>
  );
}
