import { useState } from "react";
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../services/api";
import { useAppDispatch } from "../store/hooks";
import { setCredentials } from "../store/slices/authSlice";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@onelga.local");
  const [password, setPassword] = useState("Passw0rd!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await loginRequest(email, password);
      dispatch(setCredentials(response));
      navigate("/admin");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack alignItems="center" justifyContent="center">
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <TextField label="Email" type="email" fullWidth required value={email} onChange={(event) => setEmail(event.target.value)} />
            <TextField label="Password" type="password" fullWidth required value={password} onChange={(event) => setPassword(event.target.value)} />
            {error ? <Alert severity="error">{error}</Alert> : null}
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Stack>
  );
};

export default LoginPage;
