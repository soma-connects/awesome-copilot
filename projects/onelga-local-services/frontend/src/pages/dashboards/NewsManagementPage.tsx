import { useQuery } from "@tanstack/react-query";
import { Alert, CircularProgress, List, ListItem, ListItemText, Typography } from "@mui/material";
import { fetchAdminArticles } from "../../services/api";
import { useAppSelector } from "../../store/hooks";

const NewsManagementPage = () => {
  const { token } = useAppSelector((state) => state.auth);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-articles"],
    queryFn: () => fetchAdminArticles(token ?? ""),
    enabled: Boolean(token),
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">Unable to load articles.</Alert>;
  }

  if (!data?.length) {
    return <Typography>No articles found.</Typography>;
  }

  return (
    <List>
      {data.map((article) => (
        <ListItem key={article.id} divider>
          <ListItemText
            primary={article.title}
            secondary={article.published ? "Published" : "Draft"}
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default NewsManagementPage;
