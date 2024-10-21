import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Card, CardContent, Button } from '@mui/material';
import { JournalEntry } from '../types';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState<JournalEntry>({
    title: '',
    content: '',
    category: '',
    date: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/journals').then((res) => setEntries(res.data));
  }, []);

  const handleAddEntry = () => {
    axios.post('/api/journals', newEntry).then((res) => {
      setEntries([...entries, res.data]);
      setNewEntry({ title: '', content: '', category: '', date: '' });
    });
  };

  const logout = () => {
    axios.post('/api/logout').then(() => {
      navigate('/login');
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Your Journal Entries</Typography>
      {entries.map((entry) => (
        <Card key={entry.id} style={{ marginBottom: 16 }}>
          <CardContent>
            <Typography variant="h6">{entry.title}</Typography>
            <Typography>{entry.content}</Typography>
            <Typography color="textSecondary">{entry.date}</Typography>
          </CardContent>
        </Card>
      ))}

      <Typography variant="h6" gutterBottom>Add New Entry</Typography>
      <TextField
        label="Title"
        fullWidth
        value={newEntry.title}
        onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
        margin="normal"
      />
      <TextField
        label="Content"
        fullWidth
        value={newEntry.content}
        onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
        margin="normal"
      />
      <TextField
        label="Category"
        fullWidth
        value={newEntry.category}
        onChange={(e) => setNewEntry({ ...newEntry, category: e.target.value })}
        margin="normal"
      />
      <TextField
        label="Date"
        fullWidth
        value={newEntry.date}
        onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddEntry} style={{ marginTop: 16 }}>
        Add Entry
      </Button>
      <Button variant="contained" color="secondary" onClick={logout} style={{ marginTop: 16, marginLeft: 8 }}>
        Logout
      </Button>
    </Container>
  );
};
