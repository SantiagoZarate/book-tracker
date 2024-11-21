import { z } from 'zod';

export const loginSchema = z.object({
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

export type LoginSchema = z.infer<typeof loginSchema>;

export const signupSchema = loginSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: 'Confirm password must be identical to password',
    path: ['confirmPassword'],
  });

export type SignUpSchema = z.infer<typeof signupSchema>;
