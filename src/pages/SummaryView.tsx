import React, { useState, useEffect } from 'react';
import { Box, Typography, MenuItem, Select, Container, Grid, Card, CardContent } from '@mui/material';
import { journalAPI } from '../services/api';
import { format, startOfWeek, startOfMonth, isWithinInterval } from 'date-fns';

const Summary: React.FC = () => {
  const [entries, setEntries] = useState([]);
  const [period, setPeriod] = useState('daily');
  
  useEffect(() => {
    const fetchEntries = async () => {
      const response = await journalAPI.getEntries();
      setEntries(response.data);
    };
    fetchEntries();
  }, []);

  const getSummary = () => {
    const now = new Date();

    if (period === 'daily') {
      return entries.filter((entry: any) =>
        format(new Date(entry.date), 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd')
      );
    }

    if (period === 'weekly') {
      const start = startOfWeek(now);
      return entries.filter((entry: any) =>
        isWithinInterval(new Date(entry.date), { start, end: now })
      );
    }

    if (period === 'monthly') {
      const start = startOfMonth(now);
      return entries.filter((entry: any) =>
        isWithinInterval(new Date(entry.date), { start, end: now })
      );
    }

    return entries;
  };

  const summaryEntries = getSummary();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4">Journal Summary</Typography>
        <Select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          fullWidth
          sx={{ my: 2 }}
        >
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </Select>
        <Grid container spacing={2}>
          {summaryEntries.map((entry: any) => (
            <Grid item xs={12} key={entry._id}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{entry.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {entry.content.substring(0, 100)}...
                  </Typography>
                  <Typography variant="caption" display="block">
                    {new Date(entry.date).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Summary;
