'use client';

import { Button } from '@/app/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { loginSchema } from '../signin/page';

const signupSchema = loginSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: 'Confirm password must be identical to password',
    path: ['confirmPassword'],
  });

type SignUpSchema = z.infer<typeof signupSchema>;

export default function SignUpPage() {
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
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      toast('User registered');
      router.push('/signin');
    } catch (error) {
      console.log(error);
      toast('Invalid Credentials');
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        action=""
        className="flex flex-col gap-4"
      >
        <Form {...form}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>Sign in</Button>
        </Form>
      </form>
      <footer className="flex justify-center">
        <Link href="/signin">already have an account? Sign in here!</Link>
      </footer>
    </section>
  );
}
