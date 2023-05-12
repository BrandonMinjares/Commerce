import {Box, Button, FormControl, MenuItem,
  TextField, TextareaAutosize} from '@mui/material';
import React, {useState} from 'react';


/**
 * @return {void}
 */
export default function CreateItem() {
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');

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
    const data = {
      fileImage: form.get('file'),
      product: form.get('product'),
      category: form.get('category'),
      price: form.get('price'),
      quantity: form.get('quantity'),
      condition: form.get('condition'),
      description: form.get('description'),
    };
    console.log(data);
    fetch('http://localhost:3010/v0/item', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'multipart/form-data',
      }),
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
          name='file'
          id="file"
        />
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


        <TextareaAutosize
          aria-label="Description"
          minRows={10}
          margin="normal"
          label="Description"
          placeholder="Enter Product Description"
          name='description'
          id="description"

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
