
import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string(),
  })
});

const UpdateValidationSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  password: z.string().nonempty({ message: "Password is required" }).optional(),
  role: z.enum(['user', 'admin']).default('user').optional(),
  isBlocked: z.boolean().default(false).optional(),
});

export const UserValidation = {
  userValidationSchema,
  UpdateValidationSchema
};
