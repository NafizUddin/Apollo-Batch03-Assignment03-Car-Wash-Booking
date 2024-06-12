import { z } from 'zod';

const loginValidationSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .email('Email must be a valid email address'),
  password: z.string({ required_error: 'Password is required' }),
});

const signUpValidationSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email('Email must be a valid email address'),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  }),
  phone: z.string({
    required_error: 'Phone number is required',
    invalid_type_error: 'Phone number must be a string',
  }),
  role: z.enum(['user', 'admin'], {
    required_error: 'Role is required',
    invalid_type_error: "Role must be either 'user' or 'admin'",
  }),
  address: z.string({
    required_error: 'Address is required',
    invalid_type_error: 'Address must be a string',
  }),
});

export const authValidations = {
  signUpValidationSchema,
  loginValidationSchema,
};
