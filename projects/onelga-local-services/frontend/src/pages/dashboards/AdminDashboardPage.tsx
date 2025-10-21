import { useQuery } from "@tanstack/react-query";
import { Alert, Card, CardContent, CircularProgress, Grid, Typography } from "@mui/material";
import { fetchAdminStats } from "../../services/api";
import { useAppSelector } from "../../store/hooks";

const AdminDashboardPage = () => {
  const { token } = useAppSelector((state) => state.auth);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => fetchAdminStats(token ?? ""),
    enabled: Boolean(token),
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error || !data) {
    return <Alert severity="error">Unable to load dashboard statistics.</Alert>;
  }

  const cards = [
    { label: "Total Users", value: data.totalUsers },
    { label: "Total Applications", value: data.totalApplications },
    { label: "Pending Applications", value: data.pendingApplications },
    { label: "Published Articles", value: data.publishedArticles },
  ];

  return (
    <Grid container spacing={2}>
      {cards.map((card) => (
        <Grid item xs={12} md={3} key={card.label}>
          <Card>
            <CardContent>
              <Typography variant="h6">{card.label}</Typography>
              <Typography variant="h4" color="primary">
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AdminDashboardPage;
