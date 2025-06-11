import React, { useState } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Link,
  styled,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { tokens } from "../../theme/theme";

const LoginRoot = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  background: `linear-gradient(135deg, 
    ${tokens.primary.main} 0%, 
    ${tokens.primary.light} 50%,
    ${tokens.secondary.main} 100%)`,
});

const LoginCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  width: "100%",
  maxWidth: 400,
  borderRadius: 16,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
}));

const Logo = styled("img")({
  width: 120,
  height: "auto",
  marginBottom: 32,
});

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

const ForgotPassword = styled(Link)({
  textAlign: "right",
  textDecoration: "none",
  marginTop: -16,
  marginBottom: 16,
  "&:hover": {
    textDecoration: "underline",
  },
});

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <LoginRoot>
      <LoginCard>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Logo src="/logo.png" alt="Bika Logo" />
          <Typography variant="h5" fontWeight={600} mb={3}>
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4}>
            Enter your credentials to access your account
          </Typography>
        </Box>

        <Form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email address"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <ForgotPassword
            href="#"
            variant="body2"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              // Handle forgot password
            }}
          >
            Forgot password?
          </ForgotPassword>

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{
              height: 48,
              background: `linear-gradient(90deg, ${tokens.primary.main}, ${tokens.secondary.main})`,
              "&:hover": {
                background: `linear-gradient(90deg, ${tokens.primary.dark}, ${tokens.secondary.dark})`,
              },
            }}
          >
            Sign in
          </Button>
        </Form>
      </LoginCard>
    </LoginRoot>
  );
};

export default Login;
