import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required.' })
      .email('Email must be a valid email address')
      .trim(),
    password: z.string({ required_error: 'Password is required' }).trim(),
  }),
});

const signUpValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .trim(),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email('Email must be a valid email address')
      .trim(),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .trim(),
    phone: z
      .string({
        required_error: 'Phone number is required',
        invalid_type_error: 'Phone number must be a string',
      })
      .trim(),
    role: z.enum(['user', 'admin'], {
      required_error: 'Role is required',
      invalid_type_error: "Role must be either 'user' or 'admin'",
    }),
    address: z
      .string({
        required_error: 'Address is required',
        invalid_type_error: 'Address must be a string',
      })
      .trim(),
    image: z.string({
      required_error: 'Image is required',
    }),
  }),
});

const updateUserStatusValidationSchema = z.object({
  body: z.object({
    role: z
      .enum(['admin', 'user'], {
        required_error: 'Role is required',
        invalid_type_error: "Role must be either 'admin' or 'user'",
      })
      .optional(),
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .trim()
      .optional(),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email('Email must be a valid email address')
      .trim()
      .optional(),
    phone: z
      .string({
        required_error: 'Phone number is required',
        invalid_type_error: 'Phone number must be a string',
      })
      .trim()
      .optional(),
    address: z
      .string({
        required_error: 'Address is required',
        invalid_type_error: 'Address must be a string',
      })
      .trim()
      .optional(),
    image: z
      .string({
        required_error: 'Image is required',
      })
      .optional(),
  }),
});

export const authValidations = {
  signUpValidationSchema,
  loginValidationSchema,
  updateUserStatusValidationSchema,
};
