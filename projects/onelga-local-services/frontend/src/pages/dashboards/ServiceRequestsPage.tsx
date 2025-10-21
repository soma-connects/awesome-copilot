import { useQuery } from "@tanstack/react-query";
import { Alert, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { fetchApplications } from "../../services/api";
import { useAppSelector } from "../../store/hooks";
import type { ApplicationSummary } from "../../types";

const ServiceRequestsPage = () => {
  const { token } = useAppSelector((state) => state.auth);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-applications"],
    queryFn: () => fetchApplications(token ?? ""),
    enabled: Boolean(token),
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">Unable to load service requests.</Alert>;
  }

  if (!data?.length) {
    return <Typography>No service requests found.</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((application: ApplicationSummary) => (
            <TableRow key={application.id}>
              <TableCell>{application.type}</TableCell>
              <TableCell>{application.status}</TableCell>
              <TableCell>{new Date(application.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ServiceRequestsPage;
