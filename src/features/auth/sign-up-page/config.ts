import * as Yup from "yup";

// Regex patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10,15}$/;
// const passwordUppercase = /[A-Z]/;
// const passwordLowercase = /[a-z]/;
// const passwordNumber = /[0-9]/;
// const passwordSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;


const passwordAlphaNumeric = /^[A-Za-z0-9]+$/;

export const signUpFormSchemaValidation = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
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
  avatar: Yup.string()
    .required("Avatar is required")
    .url("Avatar must be a valid URL"),
});


// Type for React Hook Form
export type SignUpFormValues = Yup.InferType<typeof signUpFormSchemaValidation>;
