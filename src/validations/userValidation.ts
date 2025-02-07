import {z, ZodType} from "zod";

class UserValidation {

  readonly login: ZodType = z.object({
    email: z.string().email("Email tidak valid").min(1, "Email tidak boleh kosong"),
    password: z.string().min(6, "Password harus memiliki minimal 6 karakter"),
  });
}

export default new UserValidation();