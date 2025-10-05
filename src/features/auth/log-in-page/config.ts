import * as Yup from "yup";

// Regex patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10,15}$/;
// const passwordUppercase = /[A-Z]/;
// const passwordLowercase = /[a-z]/;
// const passwordNumber = /[0-9]/;
// const passwordSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
const passwordAlphaNumeric = /^[A-Za-z0-9]+$/;

// Yup schema validation
export const loginFormSchemaValidation = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required("Email or phone number is required")
    .test(
      "is-valid-contact",
      "Enter a valid email or phone number",
      (value) => {
        if (!value) return false;
        return emailRegex.test(value) || phoneRegex.test(value);
      }
    ),
  password: Yup.string()
    .required("Password is required")
    .matches(passwordAlphaNumeric, "Password must contain only letters and numbers")
    .min(8, "Password must be at least 8 characters long"),
});

// Type for React Hook Form
export type LoginFormValues = Yup.InferType<typeof loginFormSchemaValidation>;
