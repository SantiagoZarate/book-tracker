import { AddMicroIcon } from '@/app/components/icons/AddMicroIcon';
import { Section, SectionHeader } from '@/app/components/ui/section';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

const STEPS = [
  {
    value: 'Step One',
    path: '/create/step-one',
  },
  {
    value: 'Step Two',
    path: '/create/step-two',
  },
  {
    value: 'Step Three',
    path: '/create/step-three',
  },
];

export default function CreateLayout({ children }: PropsWithChildren) {
  return (
    <Section>
      <SectionHeader
        title="Add book"
        description="Create a new book track"
        icon={<AddMicroIcon />}
      />
      <header className="mx-auto flex w-fit gap-2 rounded-sm bg-input p-1 shadow-inner">
        {STEPS.map((l) => (
          <Link
            className="rounded-sm border border-border bg-background px-3 text-xs"
            href={l.path}
            key={l.path}
          >
            {l.value}
          </Link>
        ))}
      </header>
      {children}
    </Section>
  );
}
