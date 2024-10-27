import React, { useState, useEffect } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, IconButton, Divider, Box, Typography, Grid } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Addinstudents({ selectedProgram, selectedBatch,onClose }) {
  const [studentProfile, setStudentProfile] = useState({
    student_id: '',
    name: '',
    phone: '',
    email: '',
    password: '',
  });

  const [error,setError]=useState(null)

  let navigate = useNavigate();

  const handleInputChange = (e) => {
    setError('')
    const { name, value } = e.target;
    setStudentProfile(prevProfile => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveStudent = async () => {
    console.log(studentProfile, 'studentProfile');
    if (!studentProfile?.student_id || !studentProfile.name) {
      alert('Please fill in all fields');
      return;
    }
    let NewStudentData={...studentProfile,batch:selectedBatch,programme:selectedProgram}
    console.log('Saved Student Profile:', NewStudentData);
    await axios.post('http://localhost:3000/api/student/add', NewStudentData)
      .then(response => {
        console.log('Student profile added successfully:', response);
        if (response.data.success) {
          alert('Student profile added successfully');
          onClose()
        }
        if (response.data.success==false) {
       setError("Student Id Already Exists",)
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
          <Typography variant="h5" align="center">{error}</Typography>
          
          <TextField
            name="student_id"
            value={studentProfile?.student_id}
            onChange={handleInputChange}

            margin="normal"
            label="Id"

          />
         
          <TextField
            name="name"
            label="Name"
            value={studentProfile?.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          
          <TextField
            name="phone"
            label="Phone"
            value={studentProfile?.phone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
           <TextField
            name="email"
            label="Email"
            value={studentProfile?.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
           <TextField
            name="password"
            label="Password"
            value={studentProfile?.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Program"
            value={selectedProgram}
            fullWidth
            margin="normal"
            disabled

          />
          <TextField
            label="Batch"
            value={selectedBatch}
            fullWidth
            margin="normal"
            disabled
          />

          <Button variant="contained" onClick={handleSaveStudent} sx={{ mt: 2 }}>Save</Button>
        </div>
      </Grid>
    </Grid>
  );
}