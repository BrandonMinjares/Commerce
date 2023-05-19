import {AppBar, IconButton,
  Toolbar, Tooltip, Typography} from '@mui/material';
import React from 'react';
import SignIn from './Login';
import {useNavigate} from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

/**
 * @return {void}
 */
export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div>
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
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
        fakecommerce
          </Typography>
          <SignIn />
          <Tooltip title="Checkout">
            <IconButton onClick={() => navigate('/checkout')}>
              <ShoppingCartOutlinedIcon/>
            </IconButton>
          </Tooltip>

        </Toolbar>
      </AppBar>
    </div>
  );
}
