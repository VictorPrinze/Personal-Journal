import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, CardActions, Grid, Container } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { journalAPI } from '../services/api';

interface JournalEntry {
  _id: string;
  title: string;
  content: string;
  category: string;
  date: string;
}

const JournalEntries: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await journalAPI.getEntries();
        setEntries(response.data);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          // Redirect to login if user is unauthorized
          navigate('/login');
        } else {
          setError('Failed to fetch entries. Please try again later.');
        }
        console.error('Error fetching entries:', error);
      }
    };

    fetchEntries();
  }, [navigate]);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Journal Entries
        </Typography>
        <Button component={RouterLink} to="/create" variant="contained" color="primary">
          New Entry
        </Button>
      </Box>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Grid container spacing={2}>
        {entries.map((entry) => (
          <Grid item xs={12} key={entry._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {entry.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {entry.content.substring(0, 100)}...
                </Typography>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  {entry.category} | {new Date(entry.date).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={RouterLink} to={`/entries/${entry._id}`}>
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default JournalEntries;
