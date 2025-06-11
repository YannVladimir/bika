import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getTheme } from "theme/theme";

type ThemeContextType = {
  mode: "light" | "dark";
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const savedMode = localStorage.getItem("themeMode");
    return (savedMode as "light" | "dark") || "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = getTheme(mode);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
