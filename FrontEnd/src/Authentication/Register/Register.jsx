import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Box, RadioGroup, FormControlLabel, Radio, FormControl } from '@mui/material';
import YenLogo from "../../assets/Image/Yen-logo.png"

import '../Auth.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  let navigate = useNavigate();
  const [role, setRole] = useState('Admin');
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleRole = (e) => {
    setRole(e.target.value);
    setId('');
    setPassword('');
  };

  const RegisterSubmit = async () => {
    console.log('Id', id);
    console.log('password', password);
    console.log(role, 'Roles');
    try {
      let response;
      if (role === 'Admin') {
        response = await axios.post('http://localhost:3000/api/admin/register', { admin_id: id, password: password });
        if (response.data.success) {
          alert("Registration successful !")
          navigate("/login");
        }
      } else if (role === 'Teacher') {
        response = await axios.post('http://localhost:3000/api/teacher/register', { teacher_id: id, password: password });
        if (response.data.success) {
          alert("Registration successful !")

          navigate("/login");
          
        }
      } else if (role === 'Student') {
        response = await axios.post('http://localhost:3000/api/student/register', { student_id: id, password: password });
        if (response.data.success) {
          alert("Registration successful !")

          navigate("/login");
        }
      }
      console.log(response.data, 99999999999);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{ width: '100%', textAlign: 'center', maxWidth: 500, border: '5px solid #ccc', borderRadius: '10px', p: 2 }}>
        <img className='logo' src={YenLogo} alt="Yen Logo" />
        <Typography style={{ textTransform: 'uppercase' }} variant="h5" align="center" gutterBottom>
          Yenepoya
        </Typography>
        <Typography style={{ fontWeight: 400 }} align="center" gutterBottom>
          (Deemed to be University)
        </Typography>
        <Typography variant="h6" gutterBottom>
          Auto-Scheduler
        </Typography>
        <Typography variant="h6" gutterBottom>
          <b>Register</b>
        </Typography>
        <FormControl sx={{ width: '100%' }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={role}
            name="radio-buttons-group"
            sx={{ display: "flex", flexDirection: 'row', justifyContent: 'center' }}
            onChange={handleRole}
          >
            <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
            <FormControlLabel value="Teacher" control={<Radio />} label="Teacher" />
            <FormControlLabel value="Student" control={<Radio />} label="Student" />
          </RadioGroup>
          {role === 'Student' && (
            <Grid>
              <TextField
                value={id}
                onChange={(e) => setId(e.target.value)}
                fullWidth
                label="Campus id"
                name="student_id"
                className='input'
                variant="outlined"
                placeholder='Enter your valid campus id'
                required
              />
            </Grid>
          )}
          {role === 'Admin' && (
            
            <Grid>
              <TextField
                value={id}
                onChange={(e) => setId(e.target.value)}
                name="admin_id"
                fullWidth
              
                label="Admin id"
                className='input'
                variant="outlined"
                placeholder='Enter your valid admin id'
                required
              />
            </Grid>
          )}
          {role === 'Teacher' && (
            <Grid>
              
              <TextField
                value={id}
                onChange={(e) => setId(e.target.value)}
                name="teacher_id"
                fullWidth
                label="Teacher id"
                className='input'
                variant="outlined"
                placeholder='Enter your valid teacher id'
                required
              />
            </Grid>
          )}
          <Grid>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              fullWidth
              label="Password"
              className='input'
              variant="outlined"
              placeholder='Enter new password'
              required
            />
          </Grid>
          <Button sx={{ backgroundColor: '#435ebe', marginTop: 2, marginBottom: 2, minWidth: '100%' }} variant="contained" onClick={RegisterSubmit}>
            Register
          </Button>
          <Typography style={{ fontWeight: 400 }} align="center" gutterBottom>
            Already registered? <Link to={"/login"}>Login</Link>
          </Typography>
        </FormControl>
      </Box>
    </Container>
  );
};

export default Register;