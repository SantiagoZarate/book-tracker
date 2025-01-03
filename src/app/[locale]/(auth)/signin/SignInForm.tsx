'use client';

import { Button } from '@/app/components/ui/button';
import { Form } from '@/app/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { InputField } from '../InputField';
import { type LoginSchema, loginSchema } from '../authSchemas';

export function SignInForm() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: '',
      username: '',
    },
  });

  const handleSubmit = async (data: LoginSchema) => {
    setIsPending(true);
    signIn('credentials', {
      redirect: true,
      callbackUrl: '/home',
      ...data,
    })
      .then((response) => {
        if (!response?.error) {
          toast('User logged in!');
        } else {
          toast('Invalid credentials');
        }
      })
      .catch(() => {
        toast('Invalid credentials');
      })
      .finally(() => setIsPending(false));
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex flex-col gap-4"
    >
      <Form {...form}>
        <InputField name="username" placeholder="John" />
        <InputField name="password" placeholder="*******" type="password" />
      </Form>
      <Button disabled={isPending}>Sign in</Button>
    </form>
  );
}
