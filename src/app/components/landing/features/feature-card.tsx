import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  title: string;
  description: string;
}

export function FeatureCard({ description, title, children }: Props) {
  return (
    <section className="flex flex-col overflow-hidden rounded-md border border-muted bg-primary/5 shadow-lg transition hover:border-primary/30">
      <div className="relative flex h-full max-h-[146px] min-h-[146px] items-center justify-center overflow-hidden bg-background px-2">
        <div className="absolute inset-0 z-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(circle_at_50%_50%,black,transparent)]"></div>
        {children}
      </div>
      <footer className="flex flex-col gap-2 border-t border-muted px-2 py-4">
        <p className="text-sm font-bold capitalize">{title}</p>
        <p className="text-xs font-light">{description}</p>
      </footer>
    </section>
  );
}
