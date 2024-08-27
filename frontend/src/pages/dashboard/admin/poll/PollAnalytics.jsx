import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination
} from '@mui/material';
import UAParser from 'ua-parser-js'
import moment from 'moment'
import { getPollAnalytics } from 'apis/poll';
import { showErrorMessage } from 'utils/toast';

const AnalyticsTable = ({ pollId }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Adjust rows per page as needed
  const [analytics, setAnalytics] = useState({});
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page on rows per page change
  };

  const paginatedVotes = analytics.votes?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const getBrowserDetails = (userAgent) => {
    const uaParser = UAParser(userAgent)
    return uaParser.browser.name
  }

  useEffect(() => {
    setAnalyticsLoading(true);
    getPollAnalytics(pollId)
      .then(res => {
        setAnalytics(res.data);
        setAnalyticsLoading(false);
      })
      .catch(error => {
        setAnalyticsLoading(false);
        showErrorMessage("Couldn't load analytical data, please try again later!");
      });
  }, [pollId])

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 4 }}>
        <Typography variant="h5">Analytics</Typography>
      </Box>
      {analyticsLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>IP Address</TableCell>
                  <TableCell>Browser</TableCell>
                  <TableCell>Choice</TableCell>
                  <TableCell>Timestamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedVotes?.map(vote => (
                  <TableRow key={vote.id}>
                    <TableCell>{vote.email || "-"}</TableCell>
                    <TableCell>{vote.ip_address}</TableCell>
                    <TableCell>{getBrowserDetails(vote.user_agent)}</TableCell>
                    <TableCell>{vote.choice?.text}</TableCell>
                    <TableCell>{moment(vote.updated_at).format('DD-MM-YYYY hh:mm a')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={analytics.votes?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </>
  );
};

export default AnalyticsTable;
