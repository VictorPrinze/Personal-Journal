import React, { useState } from 'react';
import { Box, Button, TextField, MenuItem, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { journalAPI } from '../services/api';

const CreateEntry: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await journalAPI.createEntry(title, content, category);
      navigate('/entries');
    } catch (error) {
      setError('Failed to create entry. Please try again.');
      console.error('Error creating entry:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Entry
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <TextField
          fullWidth
          required
          id="title"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          required
          id="content"
          label="Content"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
        />
        <TextField
          select
          fullWidth
          required
          id="category"
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          margin="normal"
        >
          <MenuItem value="Personal">Personal</MenuItem>
          <MenuItem value="Work">Work</MenuItem>
          <MenuItem value="Travel">Travel</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Save Entry
        </Button>
      </Box>
    </Container>
  );
};

export default CreateEntry;
