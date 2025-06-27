import { z } from 'zod';

export const userSignupSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z.string()
});
