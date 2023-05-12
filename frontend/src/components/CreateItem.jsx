import {Box, Button, FormControl, MenuItem,
  TextField, TextareaAutosize} from '@mui/material';
import React from 'react';


/**
 * @return {void}
 */
export default function CreateItem() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get('email'),
      password: data.get('password'),
    };
    fetch('http://localhost:3010/v0/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw res;
        return res.json();
      })
      .catch((err) => {
        console.log(err);
        // setError(`${err.status} - ${err.statusText}`);
      });
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
      <FormControl>
        <TextField
          type="file"
          inputProps={{accept: 'image/*'}}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="product"
          label="Product Name"
          name="name"
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
          margin="normal"
          required
          fullWidth
          id="quantity"
          label="Quantity"
          name="quantity"
          autoFocus
          aria-label='Quantity'
          type='number'
          min={0}

        />
        <TextareaAutosize
          aria-label="minimum height"
          minRows={10}
          label="Description"
          placeholder="Enter Product Description"
        />
        <Button
          type="submit"
          aria-label='Cancel'
          fullWidth
          variant="contained"
          sx={{mt: 3, mb: 2}}
        >
              Cancel
        </Button>
        <Button
          type="submit"
          aria-label='Create'
          fullWidth
          variant="contained"
          sx={{mt: 3, mb: 2}}
        >
              Create
        </Button>
      </FormControl>

    </Box>
  );
};
