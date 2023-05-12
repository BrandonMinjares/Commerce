

import React from 'react';
import Items from './Items';
import CreateItem from './CreateItem';

import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Box, Container, Grid} from '@mui/material';


const mdTheme = createTheme();

const Dashboard = () => {
  return (
    <div>
      Hello from dashboard
      <ThemeProvider theme={mdTheme}>
        <Box sx={{display: 'flex'}}>
          <CreateItem />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'? theme.palette.grey[100] :
                  theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
              <Grid container spacing={3}>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Items />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Dashboard;
