import z from "zod";
import { ZodError } from "zod";

type T = {
  email: string;
  password: string;
};

//extende T type to include role
type RegisterInput = T & { username: string };

type ValidateLogin =
  | { success: true; data: T }
  | { success: false; error: ZodError };

type ValidateIdType =
  | { success: true; data: RegisterInput }
  | { success: false; error: ZodError };

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

function validateRegister(input: any): ValidateIdType {
  const result = registerSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { success: false, error: result.error };
  }
}

function validateLogin(input: any): ValidateLogin {
  const result = loginSchema.safeParse(input);

  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { success: false, error: result.error };
  }
}

export { validateRegister, validateLogin };
