'use client';

import { Button } from '@/app/components/ui/button';
import { Form } from '@/app/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { type SignUpSchema, signupSchema } from '../authSchemas';
import { InputField } from '../InputField';
import { registerUserAction } from './actions';

export function SignUpForm() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      password: '',
      username: '',
      confirmPassword: '',
      email: '',
    },
  });

  const { execute, isPending } = useServerAction(registerUserAction, {
    onSuccess() {
      toast('User registered');
    },
    onError({ err }) {
      toast(err.data);
    },
  });

  const handleSubmit = async (data: SignUpSchema) => {
    console.log({ data });
    execute(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex flex-col gap-4"
    >
      <Form {...form}>
        <InputField name="username" placeholder="John" />
        <InputField name="email" placeholder="johndoe@example.com" />
        <InputField name="password" placeholder="******" type="password" />
        <InputField
          name="confirmPassword"
          placeholder="******"
          type="password"
        />
        <Button disabled={isPending}>Sign in</Button>
      </Form>
    </form>
  );
}
