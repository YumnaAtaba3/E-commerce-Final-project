// src/theme/themeTokens.ts
export interface Theme {
  name: "light" | "dark";
  mode: "light" | "dark";
  primary1: string;
  Text1: string;
  Text2: string;
  ButtonCard: string;
  
  secound1: string;
  secound2: string;
  secoundCard: string;
  Button1: string;
  Button2: string;
  HoverButton: string;
  HoverButton2: string;
  bgColor: string;
  success: string;
  error: string;
  warning: string;
  warningBg: string;
  tagColor: string;
  primaryText: string;
  secondaryText: string;
  borderColor: string;
  font: string;
  headingFont: string;
  disabledBg: string;
  disabledText: string;
  heading2: {
    fontSize: string;
    fontFamily: string;
    fontWeight: string | number;
  };
  sidebarText: {
    fontSize: string;
    fontWeight: string | number;
    fontFamily: string;
  };
}

export const lightTheme: Theme = {
  name: "light",
  mode: "light",
  primary1: "#FFFFFF",
  Text1: "#000000",
  Text2: "#7D8184",
  ButtonCard: "#000000",
  secound1: "#FAFAFA",
  secound2: "#F5F5F5",
  secoundCard: "#F5F5F5",
  Button1: "#00FF66",
  Button2: "#DB4444",
  HoverButton: "#E07575",
  HoverButton2: "#A0BCE0",
  bgColor: "#F5F5F5",
  success: "#47B486",
  error: "#DB4444",
  warning: "#E2B93B",
  warningBg: "#FEFAF1",
  tagColor: "#F5F5F5",
  primaryText: "#D37643",
  secondaryText: "#363738",
  borderColor: "#A4A1A1FF",
  font: "Roboto, sans-serif",
  headingFont: "Poppins, sans-serif",
  disabledBg: "#F5F5F5",
  disabledText: "#F2F2F2FF",
  heading2: {
    fontSize: "32px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
  },
  sidebarText: {
    fontSize: "16px",
    fontWeight: 500,
    fontFamily: "Roboto, sans-serif",
  },
};

export const darkTheme: Theme = {
  name: "dark",
  mode: "dark",
  primary1: "#000000",
  Text1: "#FFFFFF",
  Text2: "#000000",
  ButtonCard: "#000000",
  secound1: "#FAFAFA",
  secound2: "#DB4444",
  secoundCard: "#3A3A3A",
   Button1: "#00FF66",
  Button2: "#DB4444",
  HoverButton: "#E07575",
  HoverButton2: "#A0BCE0",
  bgColor: "#BBBBBB",
  success: "#47B486",
  error: "#DB4444",
  warning: "#E2B93B",
  warningBg: "#4A4A2A",
  tagColor: "#3A3A3A",
  primaryText: "#FFFFFF",
  secondaryText: "#BBBBBB",
  borderColor: "#E7E7E7FF",
  font: "Roboto, sans-serif",
  headingFont: "Poppins, sans-serif",
  disabledBg: "#4A4A4A",
  disabledText: "#C3C0C0FF",
  heading2: {
    fontSize: "32px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
  },
  sidebarText: {
    fontSize: "16px",
    fontWeight: 500,
    fontFamily: "Roboto, sans-serif",
  },
};
