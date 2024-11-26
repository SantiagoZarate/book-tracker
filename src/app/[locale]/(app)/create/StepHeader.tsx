'use client';

import { usePathname } from 'next/navigation';

export interface Step {
  value: string;
  path: string;
}

const STEPS = [
  {
    value: 'Step One',
    path: 'step-one',
  },
  {
    value: 'Step Two',
    path: 'step-two',
  },
  {
    value: 'Step Three',
    path: 'step-three',
  },
];

export function StepHeader() {
  const pathname = usePathname();
  const path = pathname.split('/')[3];

  return (
    <header className="mx-auto flex w-fit gap-2 rounded-sm bg-input p-1 shadow-inner">
      {STEPS.map((s, index) => (
        <p
          className={`rounded-sm border border-border bg-background px-3 text-xs transition ${path === s.path ? 'bg-black text-background' : 'bg-background'}`}
          key={s.path}
        >
          {index + 1}
        </p>
      ))}
    </header>
  );
}
