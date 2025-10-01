import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  CssBaseline,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ResumeAnalyzer from "./ResumeAnalyzer";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#1976d2" }, // Blue
      secondary: { main: "#9c27b0" }, // Purple
      background: {
        default: darkMode ? "#121212" : "#f9f9f9",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
    },
    typography: { fontFamily: "Poppins, Arial, sans-serif" },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        {/* 🌟 Hero Section */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            color: "white",
            py: { xs: 6, md: 8 },
            textAlign: "center",
            position: "relative",
            minHeight: "40vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Dark Mode Toggle */}
          <IconButton
            onClick={() => setDarkMode(!darkMode)}
            color="inherit"
            sx={{ position: "absolute", top: 20, right: 20 }}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* Title + Subtitle */}
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            🚀 Smart Resume Analyzer
          </Typography>
          <Typography
            variant="h6"
            sx={{ maxWidth: "700px", mx: "auto", opacity: 0.9 }}
          >
            Upload your resume and job description — instantly discover your
            matched skills, missing gaps, and personalized recommendations.
          </Typography>

          {/* CTA Button */}
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 3, px: 4, py: 1.5, fontSize: "1rem" }}
            href="#analyzer"
          >
            Get Started
          </Button>
        </Box>

        {/* Analyzer Section */}
        <Container id="analyzer" sx={{ mt: 6, mb: 6 }}>
          <ResumeAnalyzer />
        </Container>

        {/* Footer */}
        <Box
          sx={{
            bgcolor: darkMode ? "grey.900" : "grey.200",
            color: darkMode ? "grey.300" : "text.secondary",
            py: 3,
            textAlign: "center",
            mt: 4,
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Smart Resume Analyzer | Flask + React +
            Material UI
          </Typography>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
