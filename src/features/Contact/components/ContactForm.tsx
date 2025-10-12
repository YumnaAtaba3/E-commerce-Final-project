import React from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  useTheme as useMuiTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "../../../theme/ThemeProvider";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { contactFormSchemaValidation, type ContactFormValues } from "../config";
import { useNavigate } from "react-router";
import { appRoutes } from "../../../routes";

interface ContactFormProps {
  isMobile: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ isMobile }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
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

    toast.success("Message sent successfully!", {
      className: "toast-success",
      autoClose: 3000,
    });

    reset();
    navigate(appRoutes.home);
  };

  const labelFontSize = isMobile ? 12 : isTablet ? 13 : 14;

  const inputStyle = {
    borderRadius: 1,
    "& .MuiOutlinedInput-root": {
      bgcolor: theme.bgColor,
      color: theme.Text1,
      "& fieldset": { borderColor: "#F5F5F5" },
      "&:hover fieldset": { borderColor: theme.Button2 },
      "&.Mui-focused fieldset": {
        borderColor: theme.Button2,
        borderWidth: "2px",
      },
      "&.Mui-error fieldset": {
        borderColor: theme.error,
      },
      "& input": { color: theme.Text1 },
      "& textarea": { color: theme.Text1, fontSize: labelFontSize },
    },
    "& label": {
      fontSize: labelFontSize,
      color: theme.Text1,
    },
    "& label.Mui-focused": {
      color: theme.Button2,
      background: theme.bgColor,
      padding: "0 4px",
    },
    "& .MuiFormHelperText-root": {
      fontSize: 10,
      color: theme.error,
    },
    "& input:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0 1000px ${theme.primary1} inset`,
      WebkitTextFillColor: theme.Text1,
      transition: "background-color 5000s ease-in-out 0s",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <motion.div
        whileHover={{ scale: 1.005 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            p: 4,
            bgcolor: theme.primary1,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
            transition: "0.3s ease",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.15)",
            },
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
              <Grid  key={field}>
                <motion.div
                  whileHover={{
                    y: -3,
                    transition: { type: "spring", stiffness: 150 },
                  }}
                >
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
                    helperText={
                      errors[field as keyof ContactFormValues]?.message
                    }
                    variant="outlined"
                    sx={inputStyle}
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box mt={3}>
            <motion.div
              whileHover={{
                y: -3,
                transition: { type: "spring", stiffness: 150 },
              }}
            >
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
            </motion.div>
          </Box>

          <Box textAlign={isMobile ? "center" : "right"} mt={3}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: theme.Button2,
                  color: "white",
                  px: 6,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: 16,
                  borderRadius: 1,
                  "&:hover": {
                    bgcolor: theme.Button2,
                    boxShadow: "0px 5px 20px rgba(255,100,0,0.4)",
                  },
                }}
              >
                Send Message
              </Button>
            </motion.div>
          </Box>
        </Box>
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;
