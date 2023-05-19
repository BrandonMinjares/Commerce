import {Box, Button, CssBaseline, FormControl, Grid, IconButton, MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography} from '@mui/material';
import React, {useState} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {useNavigate} from 'react-router-dom';

const theme = createTheme({
  palette: {
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

/**
 * @return {void}
 */
export default function CreateItem() {
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleConditionChange = (event) => {
    setCondition(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();


    const item = localStorage.getItem('user');
    if (!item) {
      return;
    }
    const user = JSON.parse(item);
    const bearerToken = user ? user.accessToken : '';
    const form = new FormData(event.currentTarget);
    fetch('http://localhost:3010/v0/item', {
      method: 'POST',
      body: form,
      headers: new Headers({
        'Authorization': `Bearer ${bearerToken}`,
      }),
    })
      .then((res) => {
        if (!res.ok) throw res;
        window.location.href =
        'http://localhost:3000/';
      })
      .catch((err) => {
        console.log(err);
        setError(`${err.status} - ${err.statusText}`);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{mr: 2}}
        >
        </IconButton>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}
        >
          <a href='/'>fakecommerce</a>
        </Typography>
        <Tooltip title="Checkout">
          <IconButton onClick={() => navigate('/checkout')}>
            <ShoppingCartOutlinedIcon/>
          </IconButton>
        </Tooltip>

      </Toolbar>

      <Box component="form" noValidate onSubmit={handleSubmit}
        sx={{mt: 2, justifyContent: 'center'}}>
        <Typography textAlign={'center'} fontSize={30}>
          Create a Product
        </Typography>
        <Grid container direction='row' justifyContent="center">
          <FormControl>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <TextField
                  type="file"
                  inputProps={{accept: 'image/*'}}
                  name='file'
                  id="file"
                  fullWidth
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="product"
                  label="Product Name"
                  name="product"
                  placeholder="Enter Name"
                  autoFocus
                  aria-label='Product Name'
                />
                <TextField
                  select
                  margin="normal"
                  required
                  fullWidth
                  id="category"
                  label="Category"
                  name="category"
                  value={category}
                  onChange={handleCategoryChange}
                  placeholder="Select category"
                  autoFocus
                  aria-label='Category'
                >
                  <MenuItem value={'Vehicles'}>Vehicles</MenuItem>
                  <MenuItem value={'Property'}>Property</MenuItem>
                  <MenuItem value={'Apparel'}>Apparel</MenuItem>
                  <MenuItem value={'Electronics'}>Electronics</MenuItem>
                  <MenuItem value={'Computers'}>Computers</MenuItem>
                  <MenuItem value={'Instruments'}>Instruments</MenuItem>
                  <MenuItem value={'Toys & Games'}>Toys & Games</MenuItem>
                  <MenuItem value={'Sporting Goods'}>Sporting Goods</MenuItem>
                  <MenuItem value={'Home Goods'}>Home Goods</MenuItem>
                </TextField>

                <TextField
                  type="number"
                  margin="normal"
                  required
                  fullWidth
                  id="price"
                  label="$ Price"
                  name="price"
                  autoFocus
                  aria-label='Price'
                />
                <TextField
                  type="number"
                  margin="normal"
                  required
                  fullWidth
                  id="quantity"
                  label="Quantity"
                  name="quantity"
                  autoFocus
                  aria-label='Quantity'
                  min={0}

                />

                <TextField
                  select
                  margin="normal"
                  required
                  fullWidth
                  id="condition"
                  label="Condition"
                  name="condition"
                  value={condition}
                  onChange={handleConditionChange}
                  placeholder="Select condition"
                  autoFocus
                  aria-label='Condition'
                >
                  <MenuItem value={'Like New'}>Like New</MenuItem>
                  <MenuItem value={'Very Good'}>Very Good</MenuItem>
                  <MenuItem value={'Good'}>Good</MenuItem>
                  <MenuItem value={'Acceptable'}>Acceptable</MenuItem>
                </TextField>
              </Grid>

              <Grid item sm={6}>
                <TextField
                  margin="normal"
                  required
                  aria-label="Description"
                  fullWidth
                  multiline
                  label="Description"
                  placeholder="Enter Product Description"
                  name='description'
                  id="description"
                  InputProps={{
                    rows: 6,
                  }}
                />
              </Grid>
              <Grid item sm={6}>
                <Button
                  color='neutral'
                  type="submit"
                  aria-label='Cancel'
                  fullWidth
                  variant="contained"
                  sx={{mt: 3, mb: 2}}
                >
              Cancel
                </Button>
              </Grid>
              <Grid item sm={6} justifyContent={'center'}>
                <Button
                  color='primary'
                  type="submit"
                  aria-label='Create'
                  fullWidth
                  variant="contained"
                  sx={{mt: 3, mb: 2}}
                >
              Create
                </Button>
                {error}
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
