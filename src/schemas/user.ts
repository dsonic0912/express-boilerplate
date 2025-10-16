import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().optional(),
  email: z.email(),
  password: z.string().min(6),
  created_at: z.date().optional(),
});

export type User = z.infer<typeof userSchema>;
