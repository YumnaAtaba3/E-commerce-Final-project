import React, { useEffect } from "react";
import {
  Box,
  Grid,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import { motion, type Variants, easeOut } from "framer-motion";
import { useTheme } from "../../theme/ThemeProvider";

import phoneIcon from "../../assets/Contact/phoneIcon.svg";
import messageIcon from "../../assets/Contact/messageIcon.svg";

import ContactBreadcrumb from "./components/ContactBreadcrumb";
import InfoCard from "./components/InfoCard";
import ContactForm from "./components/ContactForm";

const Contact: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();

  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(muiTheme.breakpoints.between("sm", "md"));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  const infoCardVariant: Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  };


  const formVariant: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  return (
    <>
      <ContactBreadcrumb />

      {/* --- Full-Width Section --- */}
      <Box
        sx={{
          width: "100%",
          bgcolor: theme.primary1,
          display: "flex",
          justifyContent: "center",
          py: { xs: 6, sm: 8, md: 10 },
          px: { xs: 2, sm: 4, md: 8 },
          overflowX: "hidden",
        }}
      >
        <Grid
          container
          spacing={isMobile ? 4 : isTablet ? 6 : 8}
          sx={{
            flexDirection: isMobile ? "column" : "row",
            justifyContent: isMobile ? "center" : "space-between",
            alignItems: "flex-start",
            maxWidth: "1600px",
            width: "95%",
          }}
        >
          {/* --- Left Info Section --- */}
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: isMobile ? 4 : 0,
              flexDirection: "column",
              gap: 4,
            }}
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={infoCardVariant}
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
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={infoCardVariant}
              transition={{ delay: 0.2 }}
            >
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
            </motion.div>
          </Grid>

          {/* --- Right Form Section --- */}
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={formVariant}
              style={{ width: "100%" }}
            >
              <ContactForm isMobile={isMobile || isTablet} />
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Contact;
