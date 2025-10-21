import { Box, Button, Grid, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const HomePage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome to Onelga Local Services
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Access government services, manage applications, and stay informed with the latest community news.
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item>
          <Button variant="contained" component={RouterLink} to="/login">
            Login
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" component={RouterLink} to="/news">
            View News
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
