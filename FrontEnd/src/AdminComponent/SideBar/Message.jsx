import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, MenuItem, FormControl, InputLabel, Select } from '@mui/material';

function Messaging() {
  const [searchId, setSearchId] = useState('');
  const [message, setMessage] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [selectedRole, setSelectedRole] = useState('student'); // Default to searching for students

  const handleSearchChange = (event) => {
    setSearchId(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSearch = () => {
    // Here you would perform a search for the selected role based on the ID
    // For demonstration purposes, let's just set a mock search result
    setSearchResult(`Employee with ID "${searchId}" and role "${selectedRole}" found.`);
  };

  const handleSendMessage = () => {
    // Logic to send message using searchId and message
    console.log(`Sending message "${message}" to employee with ID "${searchId}"`);
    // Clear input fields after sending message
    setSearchId('');
    setMessage('');
    setSearchResult(null); // Clear search result after sending message
  };

  return (
    <div style={{ padding: 20 }}>
      <Paper style={{ width: '10cm', padding: 20 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ marginBottom: '10px' }}> {/* Adjust margin bottom */}
            <FormControl fullWidth>
              <InputLabel shrink>Select Role</InputLabel>
              <Select
                value={selectedRole}
                onChange={handleRoleChange}
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={`Search by ${selectedRole === 'student' ? 'Student' : 'Teacher'} ID`}
              variant="outlined"
              fullWidth
              value={searchId}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSearch}>Search</Button>
          </Grid>
          <Grid item xs={12}>
            {searchResult && (
              <Paper style={{ padding: 10, borderRadius: 10, backgroundColor: '#f0f0f0' }}>
                {searchResult}
              </Paper>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Type your message here..."
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={message}
              onChange={handleMessageChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSendMessage}>Send</Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Messaging;
