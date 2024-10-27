import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function StudentProfile() {
  const [studentProfile, setStudentProfile] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    programme: '',
    batch: '',
  });

  const [programmes, setProgrammes] = useState([]);

  const [batchnumber, setBatchNumber] = useState(['Batch 1', 'Batch 2', 'Batch 3']);


  let navigate = useNavigate();
  const [frommongo, setFromMongo] = useState('')


  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('Token'));

    // Fetch programmes
    axios.get('http://localhost:3000/api/student/programmes')
      .then(response => {
        setProgrammes(response.data.programs);
      })
      .catch(error => {
        console.error('Error fetching programmes:', error);
      });


    // Fetch user details
    axios.get('http://localhost:3000/api/student/userid', {
      headers: {
        Authorization: token
      }
    })
      .then(response => {
        let studentDetail = response.data.studentDetail;
        setStudentProfile(prevProfile => ({
          ...prevProfile,
          id: studentDetail.student_id,
          name: studentDetail?.name,
          email: studentDetail?.email,
          phone: studentDetail?.phone,
          programme: studentDetail?.programme || '',
          batch: studentDetail?.batch || '',
        }));
        setFromMongo(response.data.mongoId)

      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentProfile(prevProfile => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveStudent = async () => {
    console.log(studentProfile.batch);
    if (!studentProfile?.id || !studentProfile?.name || !studentProfile?.programme || !studentProfile?.batch) {
      alert('Please fill in all fields');
      return;
    }

    console.log('Saved Student Profile:', studentProfile);
    let StudentProfile={  ...studentProfile,frommongo,  }

    await axios.post('http://localhost:3000/api/student/student-profile', StudentProfile)
      .then(response => {
        console.log('Student profile added successfully:', response);
        if (response.data.success) {
          alert('Student profile updated successfully !!');
          navigate('/studenthome');
        }
      })
      .catch(error => {
        console.error('Error adding student profile:', error);
      });
  };

  return (
    <div style={{ borderRadius: '10px', border: '1px solid #ccc', padding: '20px', marginTop: '1cm', marginLeft: '25%', width: '50%' }}>
      <Typography variant="h5">Update Profile  123</Typography>
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
      <TextField
        select
        label="Programme"
        name="programme"
        value={studentProfile.programme}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      >
        {programmes.map((programme, index) => (
          <MenuItem key={index} value={programme?.name}>
            {programme?.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Batch"
        name="batch"
        value={studentProfile.batch}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      >
        {batchnumber.map((batch, index) => (
          <MenuItem key={index} value={batch}>
            {batch}
          </MenuItem>
        ))}

      </TextField>
      <Button variant="contained" onClick={handleSaveStudent} style={{ marginTop: '1rem' }}>Save</Button>
    </div>
  );
}