'use client';

import { Button } from '@/app/components/ui/button';
import { Form } from '@/app/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { InputField } from '../InputField';
import { LoginSchema, loginSchema } from '../authSchemas';

export function SignInForm() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: '',
      username: '',
    },
  });

  const handleSubmit = async (data: LoginSchema) => {
    console.log({ data });
    try {
      signIn('credentials', {
        redirect: false,
        ...data,
      })
        .then(() => {
          toast('User logged in!');
        })
        .catch(() => {
          toast('Invalid credentials');
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      action=""
      className="flex flex-col gap-4"
    >
      <Form {...form}>
        <InputField name="username" placeholder="John" />
        <InputField name="password" placeholder="*******" type="password" />
      </Form>
      <Button>Sign in</Button>
    </form>
  );
}
