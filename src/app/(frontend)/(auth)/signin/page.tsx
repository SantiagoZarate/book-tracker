'use client';

import { Button, ButtonProps } from '@/app/components/ui/button';
import { BuiltInProviderType } from 'next-auth/providers/index';
import { LiteralUnion, signIn } from 'next-auth/react';
import Image from 'next/image';

type Providers = LiteralUnion<BuiltInProviderType>;

export default function page() {
  return (
    <section className="mx-auto flex w-full max-w-[320px] flex-col gap-2">
      <ProviderButton provider={'github'} img="/images/github-logo.png" />
      <ProviderButton provider={'google'} img="/images/google-logo.png" />
    </section>
  );
}

interface ProviderButtonProps extends ButtonProps {
  provider: Providers;
  img: string;
}

export function ProviderButton({ provider, img }: ProviderButtonProps) {
  return (
    <Button
      onClick={() => signIn(provider)}
      className="font-semibold capitalize"
      variant="secondary"
    >
      <figure className="">
        <Image src={img} alt={`${provider} logo`} width={16} height={16} />
      </figure>
      {provider}
    </Button>
  );
}
