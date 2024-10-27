import React, { useState, useContext, useEffect } from 'react';
import { Fab, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Box, Grid, IconButton, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, Button, Container, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { AuthContext } from '../../../AuthContext'; // Import AuthContext to access programmes state
import axios from 'axios';
import AddTeacherDialog from '../../AdminComponent/SideBar/AddTeacherDialog';
import AddIcon from '@mui/icons-material/Add';

export default function SelectTeachersPage({ onSave }) {
  const [subjectTeachers, setSubjectTeachers] = useState({});
  const { programmes, setProgrammes, selectedProgramme, setSelectedProgramme,courseCredits } = useContext(AuthContext); // Access programmes state from AuthContext
  console.log(selectedProgramme, 'programmes');

  // Function to check if the teacher's credit limit is reached
  const isCreditLimitReached = (teacherId) => {
    console.log(teacherId, 'teacherId  in Limiting Program');
    const teacher = teachers.find(teacher => teacher.teacher_id === teacherId);
    return teacher && teacher.credits >= 5;
  };

  const handleTeacherChange = (subject, teacherId) => {
    const selectedTeacher = teachers.find(teacher => teacher.teacher_id === teacherId);

    if (!selectedTeacher) {
      // Teacher not found, handle accordingly
      return;
    }

    if (selectedTeacher.credits >= 4) { // Change the limit from 5 to 4
      alert('Teacher credit limit reached. Please select another teacher.');
      return;
    }

    setSubjectTeachers(prevState => ({
      ...prevState,
      [subject]: teacherId
    }));

    // Store the selected teacher's ID in the local storage
    localStorage.setItem(subject, teacherId);
  };

  // Dynamically generate subjects based on selectedProgramme's courses
  const subjects = selectedProgramme?.courses?.map(course => course.subname) || [];

  const [teachers, setTeachers] = useState([]);
  const [count, setCount] = useState(0);

  // Fetch the list of teachers from the backend when the component mounts
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/teacher/allteacher'); // Adjust the API endpoint as per your backend route
        setTeachers(response.data.teacher); // Set the fetched teachers in state

        // Check local storage for selected teachers and set them to the state
        const storedSubjectTeachers = {};
        subjects.forEach(subject => {
          const teacherId = localStorage.getItem(subject);
          if (teacherId) {
            storedSubjectTeachers[subject] = teacherId;
          }
        });
        setSubjectTeachers(storedSubjectTeachers);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };
    fetchTeachers(); // Call the fetchTeachers function
  }, [count]); // Empty dependency array ensures that this effect runs only once after the component mounts

  const handleSave = async () => {
    try {
      const isSubjectIncomplete = subjects.some(subject => !subjectTeachers[subject]);
      if (isSubjectIncomplete) {
        alert('Please select a teacher for all subjects. If there is no teacher, add a teacher for that subject.');
        return;
      }
  
      // Calculate total credits for each teacher
      const teacherCredits = {};
      programmes.forEach(programme => {
        programme.courses.forEach(course => {
          const teacherId = subjectTeachers[course.subname];
          if (teacherId) {
            teacherCredits[teacherId] = (teacherCredits[teacherId] || 0) + course.credits;
          }
        });
      });
  
      // Check credit limits for each teacher
      const exceedCreditLimit = Object.keys(teacherCredits).some(teacherId => {
        const teacher = teachers.find(t => t.teacher_id === teacherId);
        return teacher && teacher.credits + (teacherCredits[teacherId] || 0) > 5; // Adjust limit from 5 to 4
      });
  
      if (exceedCreditLimit) {
        alert('One or more teachers have reached the credit limit.');
        return;
      }
  
      // Update the programmes state with teacher names
      const updatedProgrammes = programmes.map(programme => {
        const updatedCourses = programme.courses.map(course => {
          const teacherId = subjectTeachers[course.subname];
          const teacher = teachers.find(t => t.teacher_id === teacherId);
          return {
            ...course,
            teacher: teacher ? teacher.name : 'Unknown Teacher',
            teacherId: teacher ? teacher._id : null // Assigning teacher's ID or null if not found
          };
        });
        return {
          ...programme,
          courses: updatedCourses
        };
      });
      setProgrammes(updatedProgrammes);
      setSelectedProgramme(updatedProgrammes[0]);
      console.log(selectedProgramme,updatedProgrammes,'selectedProgramme');
  
      console.log("Teacher names updated successfully in programmes state");
      console.log("Teacher credits updated successfully");

      onSave()
    } catch (error) {
      console.error('Error updating teacher credits:', error);
      // Handle error here
    }
  };
  
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Create a function to filter teachers based on the subject they teach
  const filterTeachersBySubject = (subject) => {
    console.log(subject,'subjectsubjectsubject');
    // Filter the teachers array to get only the teachers who teach the given subject
    return teachers.filter(teacher => {
      // Check if the teacher teaches the subject
      return teacher?.courses?.includes(subject);
    });
  };

  return (
    <Grid container justifyContent="center" gap={1}>
      <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around" }}>
        <Container sx={{ textAlign: 'right', }}>

          <Fab size="small" style={{ backgroundColor: '#33bfff', color: 'black' }} aria-label="add" onClick={handleOpenDialog}>
            <AddIcon />
          </Fab>
          <Typography style={{ display: 'inline-block', marginLeft: '10px', cursor: 'pointer' }} onClick={handleOpenDialog}>Add Teacher</Typography>
        </Container>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Teacher</DialogTitle>
        <DialogContent>
          <AddTeacherDialog onClose={handleCloseDialog}  setCount={setCount} />
        </DialogContent>
      </Dialog>
      {teachers?.length == 0 ?
        (
          <>
            <Container sx={{ textAlign: 'center', marginTop: 10 }}>
              <Typography sx={{ left: 8, position: 'relative', alignSelf: 'center', fontSize: 18 }}>No Teacher added yet.</Typography>

            </Container>

          </>
        ) :
        <>

          <Grid item xs={12} md={Object?.keys(subjectTeachers)?.length > 0 ? 5 : 6} sx={{}}>
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', borderRadius: 20, background: 'white' }}>
              <Typography variant="h6" gutterBottom>Select teacher for the subject</Typography>
              {subjects.map(subject => (
                <div key={subject} style={{ marginBottom: '10px' }}>
                  <Typography variant="subtitle1">{subject}</Typography>
                  <FormControl fullWidth variant="outlined" sx={{ mt: 1 }}>
                    {/* <InputLabel>Select Teacher</InputLabel> */}
                    <Select
                      value={subjectTeachers[subject] || ''}
                      onChange={(e) => handleTeacherChange(subject, e.target.value)}
                      size="small"
                      sx={{
                        paddingBottom: '10px', // Adjust padding bottom
                      }}
                    >
                      {filterTeachersBySubject(subject)?.length==0 ?(
<>
<MenuItem >
                          No teacher availabel for  this sub 
                          </MenuItem>
</>
                      ):(
                        filterTeachersBySubject(subject)?.map(teacher => (
                          <MenuItem key={teacher.teacher_id} value={teacher.teacher_id} disabled={teacher.credits >= 5}>
                            {teacher.name}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>
                </div>
              ))}

              <Button variant="contained" color="primary" onClick={handleSave} size="small" style={{ marginTop: '10px' }}>
                Save
              </Button>

            </Paper>
          </Grid>
        </>

      }




      <Grid item xs={12} md={6}>
        {Object.keys(subjectTeachers).length > 0 && (
          <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', borderRadius: '10px', background: 'white' }}>
            <Typography variant="subtitle1" gutterBottom>Preview</Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Teacher ID</TableCell>
                  <TableCell align="center">Teacher Name</TableCell>
                  <TableCell align="center">Subject</TableCell>
                  <TableCell align="center">Credit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {Object.entries(subjectTeachers).map(([subject, teacherId], index) => {
  console.log(courseCredits, 'courseCredits');
  const teacher = teachers.find(t => t?.teacher_id === teacherId);
  return (
    <TableRow key={subject}>
      <TableCell align="center" style={{ padding: '10px' }}>{teacher ? teacher?.teacher_id : '-'}</TableCell>
      <TableCell align="center" style={{ padding: '10px' }}>{teacher ? teacher?.name : '-'}</TableCell>
      <TableCell align="center" style={{ padding: '10px' }}>{subject}</TableCell>
      <TableCell align="center" style={{ padding: '10px' }}>{courseCredits[subject]}</TableCell>
    </TableRow>
  );
})}

              </TableBody>
            </Table>
          </Paper>
        )}
      </Grid>

    </Grid>
  );
}
