import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <RouterLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            JournalApp
          </RouterLink>
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/entries">
            Entries
          </Button>
          <Button color="inherit" component={RouterLink} to="/create">
            New Entry
          </Button>
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;