import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearCredentials } from "../store/slices/authSlice";

const AppLayout = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate("/login");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }} component={RouterLink} to="/" color="inherit" style={{ textDecoration: "none" }}>
            Onelga Local Services
          </Typography>
          {user ? (
            <>
              <Button color="inherit" component={RouterLink} to="/admin">
                Dashboard
              </Button>
              <Button color="inherit" component={RouterLink} to="/news">
                News
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default AppLayout;
