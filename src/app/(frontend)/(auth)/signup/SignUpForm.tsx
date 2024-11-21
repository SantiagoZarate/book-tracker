'use client';

import { Button } from '@/app/components/ui/button';
import { Form } from '@/app/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { SignUpSchema, signupSchema } from '../authSchemas';
import { InputField } from '../InputField';

export function SignUpForm() {
  const router = useRouter();
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      password: '',
      username: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = async (data: SignUpSchema) => {
    console.log({ data });
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (!json.ok) {
        toast('There was an error');
        return;
      }
      toast('User registered');
      router.push('/signin');
    } catch (error) {
      console.log(error);
      toast('Invalid Credentials');
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex flex-col gap-4"
    >
      <Form {...form}>
        <InputField name="username" placeholder="John" />
        <InputField name="password" placeholder="******" type="password" />
        <InputField
          name="confirmPassword"
          placeholder="******"
          type="password"
        />
        <Button>Sign in</Button>
      </Form>
    </form>
  );
}
