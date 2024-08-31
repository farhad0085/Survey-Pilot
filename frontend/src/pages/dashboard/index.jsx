// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import DashboardCard from 'components/cards/statistics/DashboardCard';
import OrdersTable from './OrdersTable';
import { useEffect, useState } from 'react';
import { getDashboardData } from 'apis/auth';
import { showErrorMessage } from 'utils/toast';
import { Box, CircularProgress } from '@mui/material';


export default function Dashboard() {

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getDashboardData()
    .then(res => {
      setLoading(false)
      setData(res.data)
    })
    .catch(error => {
      setLoading(false)
      showErrorMessage("Couldn't load data, please try again later!")
    })
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return (
      <MainCard title="Poll Result">
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      </MainCard>
    );
  }

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DashboardCard title="Polls" count={data.cards?.polls?.total} activeCount={data.cards?.polls?.active} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DashboardCard title="Surveys" count={data.cards?.surveys?.total} activeCount={data.cards?.surveys?.active} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DashboardCard title="Users" count={data.cards?.users?.total} activeCount={data.cards?.users?.active} />
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} md={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Recent Orders</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>
    </Grid>
  );
}
