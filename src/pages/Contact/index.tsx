import React, { useState } from "react";
import { Box, Container, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "../../theme/ThemeProvider";

import phoneIcon from "../../assets/Contact/phoneIcon.svg";
import messageIcon from "../../assets/Contact/messageIcon.svg";

import ContactBreadcrumb from "./components/ContactBreadcrumb";
import InfoCard from "./components/InfoCard";
import ContactForm from "./components/ContactForm";

const Contact: React.FC = () => {
  const { theme } = useTheme();
  const isMobile = useMediaQuery("(max-width:900px)");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ContactBreadcrumb />

      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          py: { xs: 6, md: 10 },
        }}
      >
        <Grid container spacing={isMobile ? 4 : 8} gap={4}>
          {/* Left Info Section */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                p: 3,
                bgcolor: theme.primary1,
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
                maxWidth: 340,
                mx: "auto",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-6px)" },
              }}
            >
              <InfoCard
                icon={phoneIcon}
                alt="phone"
                title="Call To Us"
                lines={[
                  "We are available 24/7, 7 days a week.",
                  "Phone: +880611122222",
                ]}
              />

              <InfoCard
                icon={messageIcon}
                alt="message"
                title="Write To Us"
                lines={[
                  "Fill out our form and we will contact you within 24 hours.",
                  "Emails: customer@exclusive.com",
                  "Emails: support@exclusive.com",
                ]}
                borderTop
              />
            </Box>
          </Grid>

          {/* Right Form Section */}
          <Grid item xs={12} md={8}>
            <ContactForm
              form={form}
              handleChange={handleChange}
              isMobile={isMobile}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Contact;
