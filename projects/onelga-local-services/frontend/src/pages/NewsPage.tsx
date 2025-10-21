import { useQuery } from "@tanstack/react-query";
import { Alert, Card, CardContent, CircularProgress, Grid, Typography } from "@mui/material";
import { fetchPublicNews } from "../services/api";

const NewsPage = () => {
  const { data, isLoading, error } = useQuery({ queryKey: ["news"], queryFn: fetchPublicNews });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">Failed to load news.</Alert>;
  }

  if (!data?.length) {
    return <Typography>No articles available.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {data.map((article) => (
        <Grid item xs={12} md={6} key={article.id}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {article.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {article.content.slice(0, 140)}...
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default NewsPage;
