import {useNavigate} from 'react-router-dom';
import React from 'react';
import {Button} from '@mui/material';

/**
 * @return {void}
 */
export default function SignOn() {
  const navigate = useNavigate();

  return (
    <div>
      <Button color='primary'
        type="submit"
        aria-label='Create'
        variant="contained"
        onClick={() => navigate('/login')}>Sign In</Button>
      <Button
        type="submit"
        aria-label='Create'
        onClick={() => navigate('/register')}>Sign Up</Button>
    </div>

  );
};
