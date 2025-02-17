import {z, ZodType} from "zod";

export class UserValidation {

  static readonly login: ZodType = z.object({
    email: z.string().email("Email tidak valid").min(1, "Email tidak boleh kosong"),
    password: z.string().min(6, "Password harus memiliki minimal 6 karakter"),
  });

  static readonly logout: ZodType = z.object({
    id: z.number().int()
  });

  static readonly register: ZodType = z.object({
    email: z.string().email("Email tidak valid").min(1, "Email tidak boleh kosong"),
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    address: z.string().min(5, { message: "Address is required" }),
    phone: z.string().min(10, { message: "Phone number is required" }),
    password: z.string().min(6, "Password harus memiliki minimal 6 karakter"),
  });

  static readonly updateAccount: ZodType = z.object({
    email: z.string().email("Email tidak valid").min(1, "Email tidak boleh kosong").optional(),
    name: z.string().min(2, { message: "Name must be at least 2 characters" }).optional(),
    address: z.string().min(5, { message: "Address is required" }).optional(),
    phone: z.string().min(10, { message: "Phone number is required" }).optional(),
    id: z.number().int()
  });

  static readonly password: ZodType = z.object({
    id: z.number().int(),
    currentPassword: z.string().min(1, { message: 'Password saat ini harus diisi' }),
    newPassword: z.string().min(6, { message: 'Password minimal 6 karakter' }),
    confirmPassword: z.string().min(6, { message: 'Password minimal 6 karakter' }),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });
}