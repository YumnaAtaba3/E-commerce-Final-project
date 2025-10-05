import React, { useEffect } from "react";
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

// Styled Components
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
const LoginButton = styled(Button)({
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
  textTransform: "none",
  py: 1.2,
});

const LoginForm: React.FC = () => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we came from SignUp
  const fromSignUp = location.state as {
    email?: string;
    password?: string;
  } | null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginFormSchemaValidation),
    defaultValues: {
      email: fromSignUp?.email || "",
      password: fromSignUp?.password || "",
    },
  });



  const { mutateAsync: login, isPending } = useLoginMutation();

  const onSubmit = handleSubmit(async (values) => {
    try {
      const data = await login(values);
      userStorage.set(data.access_token);
      toast.success("Login successful!", {
        className: "toast-success",
        autoClose: 10000,
      });
      navigate(appRoutes.home); // only navigate on success
    } catch (error: any) {
      // Do not reset the form, keep input values
      toast.error(error.message || "Login failed. Please try again.", {
        className: "toast-error",
        autoClose:off,
      });
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
        Log in to Exclusive
      </Heading>
      <SubHeading sx={{ fontSize: subHeadingFont, color: theme.Text1 }}>
        Enter your details below
      </SubHeading>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit().catch((err) => {
            console.error(err);
            toast.error("Unexpected error occurred");
          });
        }}
      >
        <LoginFormFields
          register={register}
          errors={errors}
          inputFont={inputFont}
          labelFont={labelFont}
        />

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
          <LoginButton
            type="submit"
            fullWidth={isMobile}
            variant="contained"
            sx={{
              fontSize: buttonFont,
              backgroundColor: theme.Button2,
              color: "#fff",
              "&:hover": { backgroundColor: theme.Button2 },
              px: 5,
            }}
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Log In"}
          </LoginButton>

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
    </Container>
  );
};

export default LoginForm;
