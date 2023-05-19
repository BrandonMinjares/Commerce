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
      <Button onClick={() => navigate('/login')}>Sign In</Button>
      <Button onClick={() => navigate('/register')}>Sign Up</Button>
    </div>

  );
};
