import React, { useState, useEffect } from 'react';
import { Button, TextField, IconButton, Divider, Box, Typography, Paper, Grid } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TeacherProfile() {
  const [teacherProfile, setTeacherProfile] = useState({
    id:'',
    name: '',
    email: '',
    phone: '',
    courses: [''],
  });

  const [frommongo, setFromMongo] = useState('')
  let navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('Token'));
  
    // Make request to backend endpoint
    axios.get('http://localhost:3000/api/teacher/userid', {
      headers: {
        Authorization: token
      }
    })
    .then(response => {
      let teacherDetail=response.data.teacherDetail
      setTeacherProfile(prevProfile => ({
        ...prevProfile,
        id: teacherDetail.teacher_id,
        name: teacherDetail?.name,
        email: teacherDetail?.email,
        phone: teacherDetail?.phone,
        courses: teacherDetail?.courses,

      }));
      setFromMongo(response.data.mongoId)
    })
    .catch(error => {
      console.error('Error fetching user ID:', error);
    });
  }, []);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'courses') {
      const courses = [...teacherProfile.courses];
      courses[index] = value;
      setTeacherProfile(prevProfile => ({
        ...prevProfile,
        courses,
      }));
    } else {
      setTeacherProfile(prevProfile => ({
        ...prevProfile,
        [name]: value,
      }));
    }
  };

  const handleAddCourse = () => {
    setTeacherProfile(prevProfile => ({
      ...prevProfile,
      courses: [...prevProfile.courses, ''],
    }));
  };

  const handleSaveTeacher = async () => {
    if (!teacherProfile.id || !teacherProfile.name) {
      alert('Please enter ID number and name');
      return;
    }

    // You can save the teacher profile here using an API call or other means
    let TeacherData={  ...teacherProfile,frommongo  }
    console.log('Saved Teacher Profile:', TeacherData);
    await axios.post('http://localhost:3000/api/teacher/teacher-profile', TeacherData)

      .then(response => {
        console.log('Teacher profile added successfully:', response);
        if(response.data.success) {
          alert('Teacher profile  updated successfully !!');
          navigate('/teacherhome')
        }
      })
      .catch(error => {
        console.error('Error adding teacher profile:', error);
      });
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '1cm' }}>
          <Typography variant="h5" align="center" gutterBottom>
          Update Profile
          </Typography>
          <TextField
            name="id"
            value={teacherProfile.id}
            disabled // Make the TextField non-editable
            fullWidth
            margin="normal"
          />
          <TextField
            name="email"
            label="Email"
            value={teacherProfile.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="name"
            label="Name"
            value={teacherProfile.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="phone"
            label="Phone"
            value={teacherProfile.phone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Divider sx={{ my: 2 }} />
          {teacherProfile.courses.map((course, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                name="courses"
                label={`Course ${index + 1}`}
                value={course}
                onChange={(e) => handleInputChange(e, index)}
                fullWidth
                margin="normal"
              />
              {index === teacherProfile.courses.length - 1 && (
                <IconButton onClick={handleAddCourse} color="primary">
                  <AddCircleIcon />
                </IconButton>
              )}
            </Box>
          ))}
          <Button variant="contained" onClick={handleSaveTeacher} sx={{ mt: 2, display: 'block', margin: 'auto' }}>Save</Button>
        </Paper>
      </Grid>
    </Grid>
  );
}