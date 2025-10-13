/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  Box,
  Button,
  Typography,
  Link,
  useMediaQuery,
  useTheme as useMuiTheme,
  styled,
} from "@mui/material";
import { motion, type Variants, easeOut } from "framer-motion";
import { useTheme } from "../../../theme/ThemeProvider";
import { Link as RouterLink, useNavigate, useLocation } from "react-router";
import GoogleSvg from "../../../assets/Sign-up/Icon-Google.svg";
import { appRoutes } from "../../../routes";
import FormFields from "./components/FormFields";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpFormSchemaValidation, type SignUpFormValues } from "./config";
import { useSignUpMutation } from "./hook/mutations";
import { toast } from "react-toastify";

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
const PrimaryButton = styled(Button)({
  marginTop: "24px",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
  textTransform: "none",
  padding: "10px 0",
});
const GoogleButton = styled(Button)({
  marginTop: "16px",
  textTransform: "none",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
  padding: "10px 0",
});
const FooterText = styled(Typography)({
  marginTop: "16px",
  fontFamily: "'Inter', sans-serif",
  textAlign: "center",
});

const SignUpForm: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { from?: Location } | null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(signUpFormSchemaValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      avatar: "https://example.com/default-avatar.png",
    },
  });

  const { mutateAsync: signUp, isPending } = useSignUpMutation();

  const onSubmit = handleSubmit(async (values) => {
    try {
      const user = await signUp(values);
      console.log("user"+user.id)
      toast.success("Account created successfully!", { autoClose: 2000 });
      
      navigate(appRoutes.auth.login, {
        state: {
          from: locationState?.from,
          email: values.email,
          password: values.password,
        },
      });
    } catch (error: any) {
      console.error("Sign-up error:", error);
      toast.error(error.message || "Sign-up failed. Please try again.", {
        autoClose: 4000,
      });
    }
  });

  const headingFont = isMobile ? "24px" : "32px";
  const subHeadingFont = isMobile ? "14px" : "16px";
  const inputFont = isMobile ? "14px" : "16px";
  const labelFont = isMobile ? "12px" : "14px";
  const buttonFont = isMobile ? "14px" : "16px";
  const linkFont = isMobile ? "12px" : "14px";

  // Motion variants for slide from right (TypeScript-safe)
  const formVariants: Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: easeOut, // ✅ TypeScript-safe
      },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={formVariants}>
      <Container sx={{ mx: isMobile ? 5 : 0 }}>
        <Heading sx={{ fontSize: headingFont, color: theme.Text1 }}>
          Create an account
        </Heading>
        <SubHeading sx={{ fontSize: subHeadingFont, color: theme.Text1 }}>
          Enter your details below
        </SubHeading>

        <form onSubmit={onSubmit}>
          <FormFields
            inputFont={inputFont}
            labelFont={labelFont}
            register={register}
            errors={errors}
          />
          <input type="hidden" {...register("avatar")} />

          <PrimaryButton
            fullWidth
            sx={{
              fontSize: buttonFont,
              backgroundColor: theme.Button2,
              color: "#fff",
              "&:hover": { backgroundColor: theme.error },
            }}
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Account"}
          </PrimaryButton>
        </form>

        <GoogleButton
          fullWidth
          variant="outlined"
          startIcon={
            <Box
              component="img"
              src={GoogleSvg}
              alt="Google"
              sx={{ width: 20, height: 20 }}
            />
          }
          sx={{
            fontSize: buttonFont,
            color: theme.secondaryText,
            borderColor: theme.borderColor,
            "&:hover": { borderColor: theme.primaryText },
          }}
        >
          Sign up with Google
        </GoogleButton>

        <FooterText sx={{ fontSize: linkFont, color: theme.secondaryText }}>
          Already have an account?
          <Link
            component={RouterLink}
            to={appRoutes.auth.login}
            underline="hover"
            sx={{
              ml: 1,
              fontFamily: "'Inter', sans-serif",
              fontSize: linkFont,
              color: theme.primaryText,
            }}
          >
            Log in
          </Link>
        </FooterText>
      </Container>
    </motion.div>
  );
};

export default SignUpForm;
