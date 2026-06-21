import { z } from 'zod';

export const RegistrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters").regex(/[A-Z]/, "Password must contain an uppercase letter"),
});

export const LoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const ActivitySchema = z.object({
  type: z.enum(['transport', 'food', 'energy', 'shopping']),
  value: z.number().positive("Value must be positive"),
  unit: z.string().min(1),
  date: z.string().datetime(),
});

export type RegistrationInput = z.infer<typeof RegistrationSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type ActivityInput = z.infer<typeof ActivitySchema>;
