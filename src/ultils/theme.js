import { Inter } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#F80759",
      50: "#FFF0F0",
      100: "#FECFCD",
      200: "#FE9B9F",
      300: "#FC697E",
      400: "#FA4470",
      500: "#F80759",
      600: "#D50560",
      700: "#BB0052",
      800: "#8F025C",
      900: "#770157",
    },
    secondary: {
      main: "#1D96D2",
      50: "#CFEFFF",
      100: "#9BD3EF",
      200: "#69B5DB",
      300: "#54AAD6",
      400: "#2E9FD7",
      500: "#1D96D2",
      600: "#008ED4",
      700: "#0083C5",
      800: "#0373AB",
      900: "#006293",
    },
    error: {
      main: "#CF0026",
    },
    white: {
      main: "#fff",
    },
    black: {
      main: "#222",
    },
    gray: {
      main: "#888",
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontSize: "2rem",
      color: "#F80759",
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h2: {
      fontSize: "1.6rem",
      color: "#F80759",
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h3: {
      fontSize: "1.4rem",
      color: "#F80759",
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h4: {
      fontSize: "1.2rem",
      color: "#F80759",
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: "1rem",
      color: "#F80759",
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1rem",
      color: "#F80759",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem",
      color: "#333",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.9rem",
      color: "#333",
      fontWeight: 300,
      lineHeight: 1.5,
    },
    pSmall: {
      fontSize: "0.8125rem",
      lineHeight: 1.5,
      color: "#333",
      fontWeight: 500,
    },
  },
});

export default theme;
