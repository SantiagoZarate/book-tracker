'use client';

import { Button } from '@/app/components/ui/button';
import { Form } from '@/app/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { InputField } from '../InputField';
import { type LoginSchema, loginSchema } from '../authSchemas';

export function SignInForm() {
  // const router = useRouter();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: '',
      username: '',
    },
  });

  const handleSubmit = async (data: LoginSchema) => {
    signIn('credentials', {
      redirect: true,
      ...data,
    })
      .then((response) => {
        if (!response?.error) {
          toast('User logged in!');
          // router.push('/');
        } else {
          toast('Invalid credentials');
        }
      })
      .catch(() => {
        toast('Invalid credentials');
      });
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
