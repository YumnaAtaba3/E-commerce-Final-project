import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import { useTheme } from "../../theme/ThemeProvider";

import phoneIcon from "../../assets/Contact/phoneIcon.svg";
import messageIcon from "../../assets/Contact/messageIcon.svg";

import ContactBreadcrumb from "./components/ContactBreadcrumb";
import InfoCard from "./components/InfoCard";
import ContactForm from "./components/ContactForm";

const Contact: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();

  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm")); // <600px
  const isTablet = useMediaQuery(muiTheme.breakpoints.between("sm", "md")); // 600-900px

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
          py: { xs: 6, sm: 8, md: 10 },
        }}
      >
        <Grid
          container
          spacing={isMobile ? 4 : isTablet ? 6 : 8}
          sx={{
            flexDirection: isMobile ? "column" : "row",
            justifyContent: isMobile ? "center" : "flex-start",
            alignItems: "flex-start",
          }}
        >
          {/* Left Info Section */}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              width: isMobile ? "100%" : "auto",
              maxWidth: isMobile ? 450 : "none",
              display: "flex",
              justifyContent: "center",
              mb: isMobile ? 4 : 0,
            }}
          >
            <Box
              sx={{
                width: "100%",
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                p: 3,
                bgcolor: theme.primary1,
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
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
          <Grid
            item
            xs={12}
            sm={6}
            md={8}
            sx={{
              width: isMobile ? "100%" : "auto",
              maxWidth: isMobile ? 450 : "none",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <ContactForm
                form={form}
                handleChange={handleChange}
                isMobile={isMobile || isTablet}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Contact;
