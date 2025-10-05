import React from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  useTheme as useMuiTheme,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { contactFormSchemaValidation, type ContactFormValues } from "../config";

interface ContactFormProps {
  isMobile: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ isMobile }) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isTablet = useMediaQuery(muiTheme.breakpoints.between("sm", "md"));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: yupResolver(contactFormSchemaValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    console.log("Form Submitted:", data);

    // Show success toast
    toast.success("Message sent successfully!", {
      position: "bottom-right",
      autoClose: 3000,
    });

    reset(); // clear form after submission
  };

  const labelFontSize = isMobile ? 12 : isTablet ? 13 : 14;

  const inputStyle = {
    bgcolor: theme.bgColor,
    borderRadius: 1,
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#F5F5F5" },
      "&:hover fieldset": { borderColor: theme.Button2 },
      "&.Mui-focused fieldset": {
        borderColor: theme.Button2,
        borderWidth: "2px",
      },
      "& .MuiOutlinedInput-notchedOutline legend": { display: "none" },
    },
    "& label.Mui-focused": {
      color: theme.Button2,
      background: theme.bgColor,
      padding: "0 4px",
    },
    "& label": { fontSize: labelFontSize },
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        p: 4,
        bgcolor: theme.primary1,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
        transition: "0.3s",
        "&:hover": { transform: "translateY(-6px)" },
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{
          flexWrap: isMobile ? "wrap" : "nowrap",
          minWidth: isMobile ? 0 : 800,
        }}
      >
        {["name", "email", "phone"].map((field) => (
          <Grid item xs={12} md key={field}>
            <TextField
              fullWidth
              label={
                field === "name"
                  ? "Your Name"
                  : field === "email"
                  ? "Your Email"
                  : "Your Phone"
              }
              {...register(field as keyof ContactFormValues)}
              error={!!errors[field as keyof ContactFormValues]}
              helperText={errors[field as keyof ContactFormValues]?.message}
              variant="outlined"
              sx={inputStyle}
            />
          </Grid>
        ))}
      </Grid>

      <Box mt={3}>
        <TextField
          fullWidth
          label="Your Message"
          multiline
          rows={11}
          {...register("message")}
          error={!!errors.message}
          helperText={errors.message?.message}
          variant="outlined"
          sx={inputStyle}
        />
      </Box>

      <Box textAlign={isMobile ? "center" : "right"} mt={3}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: theme.Button2,
            color: theme.primary1,
            px: 6,
            py: 1.5,
            textTransform: "none",
            fontWeight: 600,
            fontSize: 16,
            borderRadius: 1,
            "&:hover": { bgcolor: theme.Button2 },
          }}
        >
          Send Message
        </Button>
      </Box>
    </Box>
  );
};

export default ContactForm;
