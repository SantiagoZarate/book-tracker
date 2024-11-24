'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/app/lib/utils';
import { BuiltInProviderType } from 'next-auth/providers/index';
import { LiteralUnion, signIn } from 'next-auth/react';
import Image from 'next/image';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        icon: 'border rounded-sm p-1 hover:bg-input',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
    compoundVariants: [
      {
        size: 'default',
        variant: 'icon',
        className: 'p-1 h-fit w-fit',
      },
    ],
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

type Providers = LiteralUnion<BuiltInProviderType>;

interface ProviderButtonProps extends ButtonProps {
  provider: Providers;
  img: string;
}

export function ProviderButton({
  provider,
  img,
  ...args
}: ProviderButtonProps) {
  return (
    <Button
      onClick={() => signIn(provider, { redirect: true, callbackUrl: '/home' })}
      className="font-semibold capitalize"
      variant="secondary"
      {...args}
    >
      <figure className="">
        <Image src={img} alt={`${provider} logo`} width={16} height={16} />
      </figure>
      {provider}
    </Button>
  );
}

type IconPos = 'left' | 'right';

interface Props extends ButtonProps {
  icon: JSX.Element;
  iconPos?: IconPos;
}

export function IconButton({
  icon,
  iconPos = 'left',
  className,
  ...args
}: Props) {
  const style =
    iconPos === 'left'
      ? { icon: 'translate-x-2', children: '-translate-x-2 ' }
      : { icon: '-translate-x-2', children: 'translate-x-2 ' };

  return (
    <Button
      className={cn(
        'group/button',
        className,
        `${iconPos === 'left' ? '' : 'flex-row-reverse'}`,
      )}
      {...args}
    >
      <span
        className={
          style.icon +
          ' opacity-0 transition [filter:blur(5px)] group-hover/button:translate-x-0 group-hover/button:opacity-100 group-hover/button:[filter:blur(0px)]'
        }
      >
        {icon}
      </span>
      <span
        className={
          style.children +
          ' transition-transform group-hover/button:translate-x-0'
        }
      >
        {args.children}
      </span>
    </Button>
  );
}

export { Button, buttonVariants };
