import React from "react";
import { Box, Grid, TextField, Button   ,useTheme as useMuiTheme,
  useMediaQuery,
} from "@mui/material";
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
    const muiTheme = useMuiTheme();
    const isTablet = useMediaQuery(muiTheme.breakpoints.between("sm", "md"));
 const labelFontSize = isMobile ? 12: isTablet ? 13 : 14;
const inputStyle = {
  bgcolor: theme.bgColor,
  borderRadius: 1,
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#F5F5F5" },
    "&:hover fieldset": { borderColor: theme.Button2 },
    "&.Mui-focused fieldset": {
      borderColor: theme.Button2, // only the input border changes
      borderWidth: "2px",
    },
    "& .MuiOutlinedInput-notchedOutline legend": {
      display: "none", // this removes the small notch that appears around the floating label
    },
  },
  "& label.Mui-focused": {
    color: theme.Button2,
    background: theme.bgColor, // prevents overlap with border
    padding: "0 4px", // optional: give small padding around label
  },
  "& label": {
    fontSize: labelFontSize,
  },
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
        sx={{ flexWrap: isMobile ? "wrap" : "nowrap", minWidth:isMobile?0:800 }}
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
