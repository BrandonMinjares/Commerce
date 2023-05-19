import React from 'react';
import {Box, Button, MenuItem, TextField} from '@mui/material';
import {useNavigate} from 'react-router-dom';

/**
 * @return {void}
 */
export default function Sidebar() {
  const [sortingType, setSortingType] = React.useState('Newest');
  const navigate = useNavigate();
  const navigateToCreateItem = () => {
    navigate('/product/create');
  };

  return (
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
        value={sortingType}
      >
        <MenuItem
          onClick={() => setSortingType('Newest')}
          value={'Newest'}>Newest</MenuItem>
        <MenuItem
          onClick={() => setSortingType('Oldest')}
          value={'Oldest'}>Oldest</MenuItem>
        <MenuItem
          onClick={() => setSortingType('Price High')}
          value={'Price High'}>Price High</MenuItem>
        <MenuItem
          onClick={() => setSortingType('Price Low')}
          value={'Price Low'}>Price Low</MenuItem>
      </TextField>
    </Box>
  );
}
