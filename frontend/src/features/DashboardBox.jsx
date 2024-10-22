import { Box, Typography, Button, Grid } from "@mui/material";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DashboardBox = ({ title, content, buttonLabel, onButtonClick, chartData, chartOptions }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        padding: 3,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: "200px",
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        {content}
      </Typography>
      {chartData && (
        <Box sx={{ width: '100%', height: '200px' }}>
          <Bar data={chartData} options={chartOptions} />
        </Box>
      )}
      {buttonLabel && (
        <Button
          variant="contained"
          color="primary"
          onClick={onButtonClick}
          sx={{ backgroundColor: '#FF8C00', color: '#fff' }}
        >
          {buttonLabel}
        </Button>
      )}
    </Box>
  );
};

// Example Usage on a Dashboard Page
const DashboardPage = () => {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [300, 200, 400, 500, 600, 700, 800],
        backgroundColor: '#FF8C00', // Orange bars
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Grid container spacing={4} sx={{ padding: 4 }}>
      <Grid item xs={12} sm={6} md={4}>
        <DashboardBox
          title="Active Auctions"
          content="View and manage your active auctions."
          buttonLabel="View Auctions"
          onButtonClick={handleClick}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DashboardBox
          title="Sales Overview"
          content="Monthly sales data."
          chartData={chartData}
          chartOptions={chartOptions}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DashboardBox
          title="Wallet Balance"
          content="$150.00"
          buttonLabel="Add Funds"
          onButtonClick={handleClick}
        />
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
