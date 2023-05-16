import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Items from './Items';
import {Button, IconButton, MenuItem, TextField} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {useNavigate} from 'react-router-dom';

const drawerWidth = 325;

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
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
      // setMail([]);
      // setError(`${error.status} - ${error.statusText}`);
    });
};


/**
 * @return {void}
 */
export default function Dashboard() {
  const navigate = useNavigate();

  const navigateToCreateItem = () => {
    // 👇️ navigate to /
    navigate('/product/create');
  };

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'white',
          color: 'black'}}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            E-Commerce
          </Typography>
          <IconButton onClick={() => checkout()}>
            <ShoppingCartOutlinedIcon/>
          </IconButton>

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
        <Box sx={{textAlign: 'center', padding: 2}}>
          <Button variant="contained" fullWidth sx={{padding: 1.5}}
            onClick={navigateToCreateItem}>Create New Product
          </Button>
          <TextField
            select
            margin="normal"
            required
            fullWidth
            id="condition"
            name="condition"
            autoFocus
            aria-label='Condition'
            value={'Newest'}
          >
            <MenuItem value={'Newest'}>Newest</MenuItem>
            <MenuItem value={'Oldest'}>Oldest</MenuItem>
            <MenuItem value={'Price High'}>Price High</MenuItem>
            <MenuItem value={'Price Low'}>Price Low</MenuItem>
          </TextField>
        </Box>
      </Drawer>
      <Box component='main' sx={{flexGrow: 1, p: 3}}>
        <Toolbar />
        <Items/>
      </Box>
    </Box>
  );
}
