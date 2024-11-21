import { cn } from '@/app/lib/utils';
import { ComponentProps } from 'react';

export function Section({ className, ...args }: ComponentProps<'section'>) {
  return (
    <section className={cn('flex flex-col gap-2 p-2', className)} {...args} />
  );
}

interface SectionHeaderProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

export function SectionHeader({
  description,
  icon,
  title,
}: SectionHeaderProps) {
  return (
    <header className="flex items-center gap-2">
      <span>{icon}</span>
      <section className="flex flex-col">
        <p className="text-sm font-semibold capitalize">{title}</p>
        <p className="text-xs opacity-50">{description}</p>
      </section>
    </header>
  );
}
