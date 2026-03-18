import * as yup from "yup";


export const Passwordschema = yup.object({
  site: yup.string().required("Site name is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().min(4, "Min 4 characters").required(),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});


export const registerSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});