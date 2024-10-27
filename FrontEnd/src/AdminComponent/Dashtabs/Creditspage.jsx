import React, { useContext, useState } from 'react';
import { Typography, TextField, Button, Grid, Paper, FormControl } from '@mui/material';
import { AuthContext } from '../../../AuthContext';

export default function Creditspage({onSave}) {
  const { programmes, setProgrammes, selectedProgramme,setSelectedProgramme,courseCredits, setCourseCredits } = useContext(AuthContext);

  console.log(programmes,courseCredits,'programmesprogrammesprogrammesprogrammes');

  const handleCreditsChange = (courseSubname, credits) => {
    // Ensure credits are within range
    if (credits >= 1 && credits <= 5) {
      setCourseCredits(prevState => ({
        ...prevState,
        [courseSubname]: parseInt(credits), // Parse credits to ensure it's a number
      }));
    } else {
      // Notify the user about invalid credits
      alert("Please enter credits between 1 and 5.");
    }
  };
  
  const handleSave = () => {
    const updatedProgrammes = programmes.map(programme =>
      programme.name === selectedProgramme.name
        ? {
          ...programme,
          courses: programme.courses.map(course => ({
            ...course,
            credits: courseCredits.hasOwnProperty(course.subname) ? courseCredits[course.subname] : undefined
          }))
        }
        : programme
    );
  
    setProgrammes(prevProgrammes => {
      return prevProgrammes.map(programme =>
        programme.name === selectedProgramme.name ? updatedProgrammes.find(p => p.name === selectedProgramme.name) : programme
      );
    });
  
    // Update selectedProgramme state with the modified data
    const updatedSelectedProgramme = updatedProgrammes.find(programme => programme.name === selectedProgramme.name);
    setSelectedProgramme(updatedSelectedProgramme);
  
    // console.log("Updated Programmes:", updatedProgrammes);
    // console.log("Updated Selected Programme:", updatedSelectedProgramme);

    onSave()

    // Perform further actions like saving to backend, etc.
  };
  
  

  console.log(selectedProgramme,'selectedProgramme');
  

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} md={6} lg={5}>
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', borderRadius:20, background: 'white' }}>
          <Typography variant="h6" gutterBottom>Select the Credits</Typography>
          <form style={{ background: '#fff', padding: '15px', borderRadius: '10px' }}>
            {selectedProgramme?.courses?.map(course => (
              <div key={course.subname} style={{ marginBottom: '20px' }}>
                <Typography variant="subtitle1">{course.subname}</Typography>
                <FormControl fullWidth>
                  <TextField
                    type="number"
                    label="Hours"
                    InputLabelProps={{ shrink: true }}
                    value={courseCredits[course.subname] || ''}
                    onChange={(e) => handleCreditsChange(course.subname, e.target.value)}
                    size="small"
                    inputProps={{ min: 1, max: 5 }}
                    required
                  />
                </FormControl>
              </div>
            ))}
            <Button variant="contained" size="small" onClick={handleSave} disabled={!Object.keys(courseCredits).length}>Save</Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
