import React, { useState, useEffect } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, IconButton, Divider, Box, Typography, Grid } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateStudentProfile() {
  const [studentProfile, setStudentProfile] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    programme: '', // New field for selected programme
    batch: '', // New field for selected batch
  });

  const [programmes, setProgrammes] = useState([]); // State variable to store the list of programmes
  const [batches, setBatches] = useState([]); // State variable to store the list of batches

  const [frommongo, setFromMongo] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('Token'));
    // Fetch programmes from backend endpoint
    axios.get('http://localhost:3000/api/student/programmes', {
      headers: {
        Authorization: token
      }
    })
    .then(response => {
      console.log(response.data.programmes,22222222);
      setProgrammes(response.data.programmes);
    })
    .catch(error => {
      console.error('Error fetching programmes:', error);
    });
  }, []);

  const handleProgrammeChange = (e) => {
    const selectedProgramme = e.target.value;
    // Fetch batches based on the selected programme from backend endpoint
    axios.get("http://localhost:3000/api/batches/${selectedProgramme}")
    .then(response => {
      setBatches(response.data.batches);
      setStudentProfile(prevProfile => ({
        ...prevProfile,
        programme: selectedProgramme,
        batch: '', // Reset batch selection when programme changes
      }));
    })
    .catch(error => {
      console.error('Error fetching batches:', error);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentProfile(prevProfile => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveStudent = async () => {
    if (!studentProfile.id || !studentProfile.name || !studentProfile.programme || !studentProfile.batch) {
      alert('Please fill in all fields');
      return;
    }

    // You can save the student profile here using an API call or other means
    let StudentData = { ...studentProfile, frommongo };
    console.log('Saved Student Profile:', StudentData);
    await axios.post('http://localhost:3000/api/student/student-profile', StudentData)
      .then(response => {
        console.log('Student profile added successfully:', response);
        if (response.data.success) {
          alert('Student profile added successfully');
          navigate('/studenthome');
        }
      })
      .catch(error => {
        console.error('Error adding student profile:', error);
      });
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} md={6}>
        <div style={{ borderRadius: '10px', border: '1px solid #ccc', padding: '20px' }}>
          <Typography variant="h5" align="center">Create Profile</Typography>
          <TextField
            name="id"
            value={studentProfile.id}
            disabled // Make the TextField non-editable
            fullWidth
            margin="normal"
          />
          <TextField
            name="email"
            label="Email"
            value={studentProfile.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="name"
            label="Name"
            value={studentProfile.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="phone"
            label="Phone"
            value={studentProfile.phone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Select Programme</InputLabel>
            <Select
              name="programme"
              value={studentProfile.programme}
              onChange={handleProgrammeChange}
            >
              {programmes.map(programme => (
                <MenuItem key={programme} value={programme}>{programme}</MenuItem>
              ))}
            </Select>
          </FormControl>

          
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Batch</InputLabel>
            <Select
              name="batch"
              value={studentProfile.batch}
              onChange={handleInputChange}
            >
              {batches.map(batch => (
                <MenuItem key={batch} value={batch}>{batch}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleSaveStudent} sx={{ mt: 2 }}>Save</Button>
        </div>
      </Grid>
    </Grid>
  );
}