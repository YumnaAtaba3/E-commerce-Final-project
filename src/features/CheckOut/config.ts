import * as Yup from "yup";

// Regex for phone validation (10–15 digits)
const phoneRegex = /^[0-9]{10,15}$/;

export const billingFormSchemaValidation = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters"),

  companyName: Yup.string().optional().nullable(), // ✅ explicitly optional
  streetAddress: Yup.string()
    .required("Street address is required")
    .min(5, "Street address must be at least 5 characters"),

  apartment: Yup.string().optional().nullable(),
  townCity: Yup.string()
    .required("Town/City is required")
    .min(2, "Town/City must be at least 2 characters"),

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(phoneRegex, "Enter a valid phone number"),

  emailAddress: Yup.string()
    .required("Email address is required")
    .email("Enter a valid email address"),

  saveInfo: Yup.boolean().optional().nullable(),
});

// ✅ Make it stricter for RHF compatibility
export type BillingFormValues = {
  firstName: string;
  companyName?: string;
  streetAddress: string;
  apartment?: string;
  townCity: string;
  phoneNumber: string;
  emailAddress: string;
  saveInfo?: boolean;
};
