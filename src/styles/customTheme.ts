import { createTheme } from "@mui/material";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#0581e6",
      light: "#38a5ff",
    },
    secondary: {
      main: "#fcc419",
    },
    success: {
      main: "#2f9e44",
    },
    error: {
      main: "#f03e3e", // Change
    },
  },
});

export default theme;
