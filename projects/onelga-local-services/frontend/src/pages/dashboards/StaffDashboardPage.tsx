import { Alert, Box, Typography } from "@mui/material";
import { useAppSelector } from "../../store/hooks";

const StaffDashboardPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return <Alert severity="error">You must be signed in.</Alert>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Welcome back, {user.firstName}
      </Typography>
      <Typography color="text.secondary">
        Use the admin dashboard to review and manage service assignments.
      </Typography>
    </Box>
  );
};

export default StaffDashboardPage;
