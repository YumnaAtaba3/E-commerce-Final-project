import * as Yup from "yup";

// Regex for phone validation
const phoneRegex = /^[0-9]{10,15}$/;

export const contactFormSchemaValidation = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email address"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(phoneRegex, "Enter a valid phone number"),
  message: Yup.string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message cannot exceed 1000 characters"),
});

// Type for React Hook Form
export type ContactFormValues = Yup.InferType<typeof contactFormSchemaValidation>;
