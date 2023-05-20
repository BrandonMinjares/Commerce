import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Items from './Items';
import {IconButton, Tooltip} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {useNavigate} from 'react-router-dom';
import SignOn from './SignOn';
import Sidebar from './Sidebar';

const drawerWidth = 325;

/*
const checkout = () => {
  console.log('checkout');
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }

  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch(`http://localhost:3010/v0/checkout`, {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log('notok');
        throw response;
      }
      return response.json();
    })
    .then((res) => {
      window.location = res.url;
    })
    .catch((error) => {
      console.log(error);
      // setMail([]);
      // setError(`${error.status} - ${error.statusText}`);
    });
};
*/


/**
 * @return {void}
 */
export default function Dashboard() {
  const navigate = useNavigate();


  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'white',
          color: 'black'}}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
          >
          </IconButton>
          <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
          fakecommerce
          </Typography>
          <SignOn />
          <Tooltip title="Checkout">
            <IconButton onClick={() => navigate('/checkout')}>
              <ShoppingCartOutlinedIcon/>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Sidebar />
      </Drawer>
      <Box component='main' sx={{flexGrow: 1, p: 3}}>
        <Toolbar />
        <Items/>
      </Box>
    </Box>
  );
}
