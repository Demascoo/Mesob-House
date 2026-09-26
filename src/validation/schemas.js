import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Enter a valid email."),
    phone: z.string().regex(/^(?:\+251|0)9\d{8}$/, "Use 09… or +2519…"),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords do not match.",
    path: ["confirm"],
  });

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email."),
  password: z.string().min(1, "Password required."),
});

export const checkoutSchema = z.object({
  name: z.string().min(2, "Full name required."),
  phone: z.string().regex(/^(?:\+251|0)9\d{8}$/, "Use 09… or +2519…"),
  address: z.string().min(5, "Please enter a delivery address."),
});
