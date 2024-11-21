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
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const loginSchema = z.object({
  username: z
    .string()
    .min(4, { message: 'Username must have at least 4 characters' })
    .regex(/^[a-zA-Z0-9]+$/, {
      message:
        'Username must be alphanumerical and have no spaces or special characters',
    }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/, {
      message: 'Password must be alphanumerical',
    }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Page() {
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
      await signIn('credentials', {
        redirect: false,
        ...data,
      });
      toast('Invalid Credentials');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="">
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
          <Button>Sign in</Button>
        </Form>
      </form>
    </section>
  );
}
