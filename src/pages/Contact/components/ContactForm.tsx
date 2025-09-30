import React from "react";
import { Box, Grid, TextField, Button } from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";

interface ContactFormProps {
  form: { name: string; email: string; phone: string; message: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isMobile: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({
  form,
  handleChange,
  isMobile,
}) => {
  const { theme } = useTheme();

  const inputStyle = {
    bgcolor: theme.bgColor,
    borderRadius: 1,
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#F5F5F5" },
      "&:hover fieldset": { borderColor: theme.Button2 },
      "&.Mui-focused fieldset": { borderColor: theme.Button2 },
    },
    "& label.Mui-focused": { color: theme.Button2 },
  };

  return (
    <Box
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
        sx={{ flexWrap: isMobile ? "wrap" : "nowrap", maxWidth: 800 }}
      >
        {["name", "email", "phone"].map((field) => (
          <Grid item xs={12} md key={field}>
            <TextField
              fullWidth
              name={field}
              label={
                field === "name"
                  ? "Your Name"
                  : field === "email"
                  ? "Your Email"
                  : "Your Phone"
              }
              value={form[field as keyof typeof form]}
              onChange={handleChange}
              variant="outlined"
              sx={inputStyle}
            />
          </Grid>
        ))}
      </Grid>

      <Box mt={3}>
        <TextField
          fullWidth
          name="message"
          label="Your Message"
          value={form.message}
          onChange={handleChange}
          multiline
          rows={11}
          variant="outlined"
          sx={inputStyle}
        />
      </Box>

      <Box textAlign={isMobile ? "center" : "right"} mt={3}>
        <Button
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
