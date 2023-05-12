import {Box, Button, FormControl, Grid, InputAdornment, InputLabel,
  MenuItem, Select, TextField,
  TextareaAutosize} from '@mui/material';
import React from 'react';

const categories = [
  {value: 'category1', label: 'Category 1'},
  {value: 'category2', label: 'Category 2'},
  {value: 'category3', label: 'Category 3'},
];

const CreateItem = () => {
  return (
    <Grid container spacing={2} sx={{backgroundColor: 'white'}}>
      <Grid item xs={12}>
        <Box sx={{backgroundColor: 'grey'}}>
            pictures
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Product Name" />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select>
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Price" fullWidth
              InputProps={{startAdornment:
            <InputAdornment position="start">$</InputAdornment>}} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Quantity" fullWidth type="number" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <TextareaAutosize
          minRows={16}
          placeholder="Enter product description..." />
      </Grid>

      <Grid item xs={6}>
        <Button fullWidth>Cancel</Button>
      </Grid>
      <Grid item xs={6}>
        <Button fullWidth>Create</Button>
      </Grid>
    </Grid>
  );
};

export default CreateItem;
