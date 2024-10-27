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
  const [error, setError] = useState(null);

  const handleRole = (e) => {
    setRole(e.target.value);
    setId('');
    setPassword('');
  };

  const LoginSubmit = async () => {
    console.log('Id', id);
    console.log('password', password);
    console.log(role, 'Roles');
    try {
      let response;
      if (role === 'Admin') {
        response = await axios.post('http://localhost:3000/api/admin/login', { admin_id: id, password: password });
        if (response.data.success) {
          let Token = response.data.authToken;
          await localStorage.setItem('Token', JSON.stringify(Token));
          await localStorage.setItem('AdminId', JSON.stringify(id));
          alert("Login successful !")

          navigate("/AdminHome");
        }
        if(response.data.success==false){
          setError('Incorrect Id or password')
        }
      } else if (role === 'Teacher') {
        response = await axios.post('http://localhost:3000/api/teacher/login', { teacher_id: id, password: password });
        if (response.data.success) {
          let Token = response.data.authToken;
          await localStorage.setItem('Token', JSON.stringify(Token));
          await localStorage.setItem('TeacherId', JSON.stringify(id));

          alert("Login successful !")

          navigate("/TeacherHome");
        }
        if(response.data.success==false){
          setError('Incorrect Id or password')
        }
      } else if (role === 'Student') {
        response = await axios.post('http://localhost:3000/api/student/login', { student_id: id, password: password });
        if (response.data.success) {
          let Token = response.data.authToken;
          await localStorage.setItem('Token', JSON.stringify(Token));
          await localStorage.setItem('StudentId', JSON.stringify(id));

          alert("Login successful !")

          navigate("/StudentHome");
        }
        if(response.data.success==false){
          setError('Incorrect Id or password')
        }
      }
      console.log(response.data, 99999999999);
    } catch (err) {
      console.log(err);
    }
  };

  const handleIdChange = (e) => {
    setError('')
    setId(e.target.value);
}
  const handlePaswordChange = (e) => {
    setError('')
    setPassword(e.target.value);
}


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
          <b>Login</b>
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
          {error&&(
            <Typography variant="h9" gutterBottom sx={{color:'red'}}>
              {error}
            </Typography>
          )}
          {role === 'Student' && (
            <Grid>
              <TextField
                value={id}
                // onChange={(e) => setId(e.target.value)}
                onChange={handleIdChange}
                fullWidth
                label="Campus id"
                name="student_id"
                className='input'
                variant="outlined"
                placeholder='Enter your campus id'
                required
              />
            </Grid>
          )}
          {role === 'Admin' && (
            <Grid>
              <TextField
                value={id}
                // onChange={(e) => setId(e.target.value)}
                onChange={handleIdChange}

                name="admin_id"
                fullWidth
                label="Admin id"
                className='input'
                variant="outlined"
                placeholder='Enter your admin id'
                required
              />
            </Grid>
          )}
          {role === 'Teacher' && (
            <Grid>
              <TextField
                value={id}
                // onChange={(e) => setId(e.target.value)}
                onChange={handleIdChange}

                name="teacher_id"
                fullWidth
                label="Teacher id"
                className='input'
                variant="outlined"
                placeholder='Enter your teacher id'
                required
              />
            </Grid>
          )}
          <Grid>
            <TextField
              value={password}
              // onChange={(e) => setPassword(e.target.value)}
              onChange={handlePaswordChange}

              name="password"
              fullWidth
              label="Password"
              className='input'
              variant="outlined"
              placeholder='Enter your password'
              required
            />
          </Grid>
          <Button sx={{ backgroundColor: '#435ebe', marginTop: 2, marginBottom: 2, minWidth: '100%' }} variant="contained" onClick={LoginSubmit}>
            Login
          </Button>
          <Typography style={{ fontWeight: 400 }} align="center" gutterBottom>
            Don't have an account? <Link to={"/"}>Register</Link>
          </Typography>
        </FormControl>
      </Box>
    </Container>
  );
};

export default Register;