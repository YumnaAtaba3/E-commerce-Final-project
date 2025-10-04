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
import { useTheme } from "../../theme/ThemeProvider";
import { Link as RouterLink } from "react-router";
import GoogleSvg from "../../assets/Sign-up/Icon-Google.svg";
import { appRoutes } from "../../routes";
import FormFields from "./components/FormFields";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpFormSchemaValidation, type SignUpFormValues } from "./config";
import { useSignUpMutation } from "./services/mutations";
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(signUpFormSchemaValidation),
  });

  const { mutateAsync: signUp, isLoading } = useSignUpMutation();

  const onSubmit = handleSubmit(async (values) => {
    try {
      await signUp(values);
      toast.success("Account created successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Sign-up failed. Please try again.");
    }
  });

  // Responsive fonts
  const headingFont = isMobile ? "24px" : "32px";
  const subHeadingFont = isMobile ? "14px" : "16px";
  const inputFont = isMobile ? "14px" : "16px";
  const labelFont = isMobile ? "12px" : "14px";
  const buttonFont = isMobile ? "14px" : "16px";
  const linkFont = isMobile ? "12px" : "14px";

  return (
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

        <PrimaryButton
          fullWidth
          sx={{
            fontSize: buttonFont,
            backgroundColor: theme.Button2,
            color: "#fff",
            "&:hover": { backgroundColor: theme.error },
          }}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Account"}
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
  );
};

export default SignUpForm;
