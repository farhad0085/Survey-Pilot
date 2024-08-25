import Box from '@mui/material/Box';
import ReactApexChart from 'react-apexcharts';

// chart options
const barChartOptions = {
  chart: {
    type: 'bar',
    height: 365,
    toolbar: {
      show: true
    }
  },
  plotOptions: {
    bar: {
      borderRadius: 6
    }
  },
  dataLabels: {
    enabled: true
  },
  xaxis: {
    type: 'category',
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: true
  },
  grid: {
    show: false
  },
};


export default function BarChart({ data }) {
  const seriesData = data.map(item => ({ x: item.text, y: item.vote_count }))
  const series = [{ data: seriesData, name: "Vote Count" }]

  return (
    <Box id="chart" sx={{ bgcolor: 'transparent' }}>
      <ReactApexChart options={barChartOptions} series={series} type="bar" height={365} />
    </Box>
  );
}
