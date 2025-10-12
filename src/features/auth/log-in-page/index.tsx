/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme as useMuiTheme,
  styled,
  Link,
} from "@mui/material";
import { useTheme } from "../../../theme/ThemeProvider";
import { Link as RouterLink, useLocation, useNavigate } from "react-router";
import { appRoutes } from "../../../routes";
import LoginFormFields from "./components/LoginFormFields";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormSchemaValidation, type LoginFormValues } from "./config";
import { useLoginMutation } from "./hook/mutations";
import { userStorage } from "../storage/userStorage";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Container = styled(Box)({ maxWidth: 370, width: "100%" });
const Heading = styled(Typography)({
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600,
});
const SubHeading = styled(Typography)({
  fontFamily: "'Inter', sans-serif",
  fontWeight: 400,
  marginBottom: "32px",
});

const MotionContainer = motion(Container);
const MotionHeading = motion(Heading);
const MotionSubHeading = motion(SubHeading);
const MotionFieldsContainer = motion.div;
const MotionButton = motion(Button); // ✅ motion-enabled MUI button

const LoginForm: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as {
    from?: Location;
    email?: string;
    password?: string;
  } | null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginFormSchemaValidation),
    defaultValues: {
      email: locationState?.email || "",
      password: locationState?.password || "",
    },
  });

  const { mutateAsync: login, isPending } = useLoginMutation();

  const onSubmit = handleSubmit(async (values) => {
    try {
      const data = await login(values);
      userStorage.set(data.access_token);

      toast.success("Login successful!", { autoClose: 1000 });
      navigate(-2);
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed. Please try again.", {
        autoClose: 1500,
      });
    }
  });

  const headingFont = isMobile ? "24px" : "32px";
  const subHeadingFont = isMobile ? "14px" : "16px";
  const inputFont = isMobile ? "14px" : "16px";
  const labelFont = isMobile ? "12px" : "14px";
  const buttonFont = isMobile ? "14px" : "16px";
  const linkFont = isMobile ? "12px" : "14px";

  return (
    <MotionContainer
      sx={{ mx: isMobile ? 5 : 0 }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <MotionHeading
        sx={{ fontSize: headingFont, color: theme.Text1 }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Log in to Exclusive
      </MotionHeading>

      <MotionSubHeading
        sx={{ fontSize: subHeadingFont, color: theme.Text1 }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Enter your details below
      </MotionSubHeading>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit().catch((err) => {
            console.error(err);
            toast.error("Unexpected error occurred");
          });
        }}
      >
        <MotionFieldsContainer initial="hidden" animate="visible">
          <LoginFormFields
            register={register}
            errors={errors}
            inputFont={inputFont}
            labelFont={labelFont}
          />
        </MotionFieldsContainer>

        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "stretch" : "center",
            justifyContent: "space-between",
            gap: isMobile ? 2 : 0,
          }}
        >
          <MotionButton
            type="submit"
            fullWidth={isMobile}
            variant="contained"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              fontSize: buttonFont,
              backgroundColor: theme.Button2,
              color: "white",
              "&:hover": { backgroundColor: theme.Button2 },
              px: 5,
            }}
          >
            {isPending ? "Loading..." : "Log In"}
          </MotionButton>

          <Link
            component={RouterLink}
            to={appRoutes.home}
            underline="hover"
            sx={{
              fontSize: linkFont,
              color: theme.Button2,
              textAlign: isMobile ? "center" : "left",
              mt: isMobile ? 1 : 0,
            }}
          >
            Forgot Password?
          </Link>
        </Box>
      </form>
    </MotionContainer>
  );
};

export default LoginForm;
