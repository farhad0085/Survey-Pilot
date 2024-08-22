import React from 'react'
import { DASHBOARD_PAGE, LOGIN_PAGE, REGISTER_PAGE } from 'routes/urls'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

const Home = () => {

  const isAuthenticated = false

  return (
    <Container>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h1" gutterBottom>
          Welcome to SurveyPilot
        </Typography>
        <Typography variant="body1" gutterBottom>
          Simplify Polling and Survey Creation
        </Typography>
        <Box sx={{ my: 2 }}>
          <Button variant="outlined" color="secondary" component={Link} to="/polls" sx={{ mx: 1 }}>
            Create Poll
          </Button>
          <Button variant="outlined" color="secondary" component={Link} to="/surveys" sx={{ mx: 1 }}>
            Create Survey
          </Button>
          {isAuthenticated ? (
            <Button variant="outlined" color="secondary" component={Link} to={DASHBOARD_PAGE} sx={{ mx: 1 }}>
              Dashboard
            </Button>
          ) : (
            <>
              <Button variant="contained" color="primary" component={Link} to={LOGIN_PAGE} sx={{ mx: 1 }}>
                Login
              </Button>
              <Button variant="contained" color="primary" component={Link} to={REGISTER_PAGE} sx={{ mx: 1 }}>
                Register
              </Button>
            </>
          )}
        </Box>
      </Box>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Easy Poll Creation
              </Typography>
              <Typography variant="body1">
                Create and manage polls effortlessly with our user-friendly interface. Customize your polls with various question types and set expiration dates or limits.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Flexible Surveys
              </Typography>
              <Typography variant="body1">
                Design surveys with a range of question types to gather detailed insights. Our platform offers flexibility to accommodate different survey requirements.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Real-Time Results
              </Typography>
              <Typography variant="body1">
                View poll results and survey responses in real-time as they come in. Analyze data easily with live updates and comprehensive summaries.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          What Our Users Say
        </Typography>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="body1">
              "SurveyPilot has transformed how we conduct polls and surveys. The interface is intuitive and the results are always accurate and timely."
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              - Jane Doe, Marketing Manager
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="body1">
              "Creating surveys with SurveyPilot is a breeze. The flexibility in question types has allowed us to get deeper insights from our audience."
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              - John Smith, Product Developer
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Get Started with SurveyPilot Today!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Join thousands of users who are simplifying their polling and survey processes. Sign up now and start creating!
        </Typography>
        <Button variant="contained" color="primary" component={Link} to={REGISTER_PAGE}>
          Sign Up
        </Button>
      </Box>

      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="body2">&copy; 2024 SurveyPilot. All rights reserved.</Typography>
      </Box>
    </Container>
  )

}


export default Home