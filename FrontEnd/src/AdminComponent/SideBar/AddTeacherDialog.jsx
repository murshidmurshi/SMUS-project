import React, { useEffect, useState } from 'react';
import { Button, TextField, IconButton, Divider, Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddingTeachers({onClose,setCount}) {
  const [newTeacher, setNewTeacher] = useState({
    teacher_id: '',
    name: '',
    phone: '',
    courses: [''],
  });

  const [error, setError] = useState('');



  let navigate = useNavigate();

  const handleInputChange = (e, index) => {
    setError('')
    const { name, value } = e.target;
    if (name === 'courses') {
      const courses = [...newTeacher.courses];
      courses[index] = value;
      setNewTeacher(prevProfile => ({
        ...prevProfile,
        courses,
      }));
    } else {
      setNewTeacher(prevProfile => ({
        ...prevProfile,
        [name]: value,
      }));
    }
  };

  const handleAddCourse = () => {
    setNewTeacher(prevProfile => ({
      ...prevProfile,
      courses: [...prevProfile.courses, ''],
    }));
  };

  const handleSaveTeacher = async () => {
    if (!newTeacher?.teacher_id || !newTeacher.name) {
      alert('Please enter ID number and name');
      return;
    }

    // You can save the teacher profile here using an API call or other means
    console.log('Saved Teacher Profile:', newTeacher);
    await axios.post('http://localhost:3000/api/teacher/add', newTeacher)

      .then(response => {
        console.log('new Teacher added successfully:', response);
        if(response.data.success) {
          alert('Teacher profile added successfully');
          if(response?.data?.success){
            setCount((prev)=>prev+1)
            onClose()
          }else{
            console.log(response?.data?.error,55555555555);
            alert('Something went wrong')
          }
        }
        else  if(response.data.error) {
          // setError(response.data.error);
        setError('teacher Alerady exists');


        }
      })

      
      .catch(error => {
        setError('An error occurred while adding the teacher.');
        console.error('Error adding teacher:', error);      });
  };


  return (
    <div style={{ borderRadius: '10px', border: '1px solid #ccc', padding: '20px', marginTop: '1cm', marginLeft: '0.7cm' }}>
      {error &&(
        <div style={{ color:'red' }}>
          {error}
        </div>
      )}
      <TextField
        name="teacher_id"
        label="ID"
        value={newTeacher?.teacher_id}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="name"
        label="Name"
        value={newTeacher.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="phone" // Setting the name attribute to 'phone'
        label="Phone"
        value={newTeacher.phone}
        onChange={handleInputChange} // Handling phone number input change
        fullWidth
        margin="normal"
      />
       <TextField
        name="password" // Setting the name attribute to 'phone'
        label="Password"
        value={newTeacher.password}
        onChange={handleInputChange} // Handling phone number input change
        fullWidth
        margin="normal"
      />
      <Divider sx={{ my: 2 }} />
      {newTeacher.courses.map((course, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            name="courses"
            label={`Course ${index + 1}`}
            value={course}
            onChange={(e) => handleInputChange(e, index)}
            fullWidth
            margin="normal"
          />
          {index === newTeacher.courses.length - 1 && ( // Display add icon only for the last course
            <IconButton onClick={handleAddCourse} color="primary">
              <AddCircleIcon />
            </IconButton>
          )}
        </Box>
      ))}
      <Button variant="contained" onClick={handleSaveTeacher} sx={{ mt: 2 }}>Save</Button>
    </div>
  );
}
