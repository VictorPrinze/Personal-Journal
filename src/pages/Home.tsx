import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container>
      <Typography variant="h2">Welcome to Personal Journaling App</Typography>
      <Button component={Link} to="/login" variant="contained" color="primary">
        Login
      </Button>
      <Button component={Link} to="/register" variant="outlined" color="secondary">
        Register
      </Button>
    </Container>
  );
}

export default Home;