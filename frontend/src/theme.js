import { createTheme } from "@mui/material/styles";

// Centralized palette so MainLayout's hardcoded shell colors and every
// theme.palette.* reference across chart/KPI components resolve to the
// same dark, industrial-analytics look.
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3B82F6",
      dark: "#2563EB",
      light: "#60A5FA",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#8B5CF6",
      dark: "#7C3AED",
      light: "#A78BFA",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#22C55E",
      dark: "#16A34A",
      light: "#4ADE80",
    },
    warning: {
      main: "#F59E0B",
      dark: "#D97706",
      light: "#FBBF24",
    },
    error: {
      main: "#EF4444",
      dark: "#DC2626",
      light: "#F87171",
    },
    background: {
      default: "#0B1220",
      paper: "#0F1A2E",
    },
    text: {
      primary: "#F1F5F9",
      secondary: "#94A3B8",
      disabled: "#64748B",
    },
    divider: "rgba(255, 255, 255, 0.08)",
    action: {
      hover: "rgba(255, 255, 255, 0.06)",
      selected: "rgba(59, 130, 246, 0.16)",
      disabled: "rgba(255, 255, 255, 0.26)",
      disabledBackground: "rgba(255, 255, 255, 0.08)",
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: [
      "Inter",
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Arial",
      "sans-serif",
    ].join(","),
    h4: {
      fontWeight: 800,
    },
    h6: {
      fontWeight: 700,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none", // avoid MUI's default dark-mode gradient overlay
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#1E293B",
          fontSize: "0.75rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;