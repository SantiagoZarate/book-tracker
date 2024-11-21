'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { ComponentProps } from 'react';
import { useFormContext } from 'react-hook-form';
import { SignUpSchema } from './authSchemas';

interface Props extends ComponentProps<'input'> {
  name: keyof SignUpSchema;
}

export function InputField({ name, ...args }: Props) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{name}</FormLabel>
          <FormControl>
            <Input {...field} {...args} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
