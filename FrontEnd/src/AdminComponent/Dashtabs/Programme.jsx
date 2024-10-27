import React, { useContext, useEffect, useState } from 'react';
import { Typography, Grid, Paper, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, Select, MenuItem, Button, TextField, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../../../AuthContext';
import axios from 'axios';

export default function Programme() {
  const { programmes, setProgrammes, selectedProgramme, setSelectedProgramme,academicYear, setAcademicYear } = useContext(AuthContext);
  const [newProgrammeName, setNewProgrammeName] = useState('');
  const [newCourses, setNewCourses] = useState([]);
  const [newCourseName, setNewCourseName] = useState('');
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [courseToDeleteIndex, setCourseToDeleteIndex] = useState(null);
  const [addProgramModalOpen, setAddProgramModalOpen] = useState(false);
  const [addCourseModalOpen, setAddCourseModalOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);


  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const Save=()=>{

     
    handleCloseDialog()

  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch programs from the API
        const response = await axios.get('http://localhost:3000/api/admin/allprograms');
        // console.log('Response:', response);
        setProgrammes(response.data.programs);
        setSelectedProgramme(response.data.programs[0]); // Set the selected program to the first one by default
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    // Call fetchData function
    fetchData();
  handleOpenDialog()

    console.log('Fetching programs from database ');
  }, []); // Empty dependency array ensures that this effect runs only once after the component mounts

  const handleAddProgramme = () => {
    if (newProgrammeName.trim() === '') {
      alert('Please enter a programme name.');
      return;
    }

    const newProgramme = {
      name: newProgrammeName.trim(),
      courses: newCourses,
    };

    console.log(newProgramme, 1516556465);
    // Send POST request to backend to add new program
    axios.post('http://localhost:3000/api/admin/addprogramm', newProgramme)
      .then(response => {
        setProgrammes([...programmes, response.data.program]); // Assuming backend returns the added program with an ID
        setNewProgrammeName('');
        setNewCourses([]);
        setAddProgramModalOpen(false);
      })
      .catch(error => {
        console.error('Error adding new program:', error);
        alert('Error adding new program. Please try again.');
      });
  };


  const handleAddCourseToSelectedProgramme = async () => {
    if (newCourseName.trim() === '') {
      alert('Please enter a course name.');
      return;
    }

    // Create a new course object
    const newCourse = { subname: newCourseName.trim() };

    console.log(selectedProgramme, 'selectedProgrammeselectedProgramme');
    // Send a request to the backend API to add the new course to the selected program
    // await axios.post(`http://localhost:3000/api/admin/course/add`, newCourse)
    //   .then(response => {
    //     console.log(response.data,333333333333333333333333333);
    //   })
    //   .catch(error => {
    //     console.error('Error adding new course:', error);
    //     alert('Error adding new course. Please try again.');
    //   });
    
    // Send a request to the backend API to add the new course to the selected program
    await axios.post(`http://localhost:3000/api/admin/addcourse/${selectedProgramme?._id}`, newCourse)
      .then(response => {
        // Update the local state with the updated program's courses
        const updatedProgrammes = programmes.map(programme =>
          programme._id === selectedProgramme._id
            ? { ...programme, courses: [...programme.courses, response.data.course] }
            : programme
        );

        setProgrammes(updatedProgrammes);
        setNewCourseName('');

        const updatedSelectedProgramme = updatedProgrammes.find(
          programme => programme._id === selectedProgramme._id
        );
        setSelectedProgramme(updatedSelectedProgramme);
        setAddCourseModalOpen(false);
      })
      .catch(error => {
        console.error('Error adding new course:', error);
        alert('Error adding new course. Please try again.');
      });
  };


  const handleRemoveCourseFromSelectedProgramme = async (index) => {
    try {
      alert(' do you want to remove the course !');
      // Send a DELETE request to the backend to remove the course from the selected program
      const response = await axios.delete(`http://localhost:3000/api/admin/removecourse/${selectedProgramme._id}/${selectedProgramme.courses[index]._id}`);
      const updatedProgram = response.data.program;

      // Update the state with the updated program
      const updatedProgrammes = programmes.map(program =>
        program._id === updatedProgram._id ? updatedProgram : program
      );
      setProgrammes(updatedProgrammes);
      setSelectedProgramme(updatedProgram);

      // Close the delete confirmation dialog
      setDeleteConfirmationOpen(false);
      setCourseToDeleteIndex(null);
    } catch (error) {
      console.error('Error removing course:', error);
      // Handle error here
    }
  };


  const handleConfirmDeleteCourse = () => {
    const updatedProgrammes = programmes.map(programme =>
      programme.name === selectedProgramme.name
        ? {
          ...programme,
          courses: programme.courses.filter((_, idx) => idx !== courseToDeleteIndex),
        }
        : programme
    );

    setProgrammes(updatedProgrammes);
    setDeleteConfirmationOpen(false);

    const updatedSelectedProgramme = updatedProgrammes.find(
      programme => programme.name === selectedProgramme.name
    );
    setSelectedProgramme(updatedSelectedProgramme);
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
    setCourseToDeleteIndex(null);
  };

  const handleAddNewProgrammeClick = () => {
    setAddProgramModalOpen(true);
  };

  const handleAddNewCourseClick = () => {
    setAddCourseModalOpen(true);
  };

  const handleCloseAddProgrammeModal = () => {
    setAddProgramModalOpen(false);
  };

  const handleCloseAddCourseModal = () => {
    setAddCourseModalOpen(false);
  };

  // const handleDeleteProgram = (programId) => {
  //   // Send DELETE request to backend to remove the program
  //   axios.delete(`http://localhost:3000/api/admin/program/delete/${programId}`)
  //     .then(response => {
  //       // Filter out the deleted program from the state
  //       const updatedPrograms = programmes?.filter(program => program._id !== programId);
  //       setProgrammes(updatedPrograms);
  //       alert('Program deleted successfully');
  //     })
  //     .catch(error => {
  //       console.error('Error deleting program:', error);
  //       alert('Error deleting program. Please try again.');
  //     });
  // };


  return (

    <Grid container spacing={2} justifyContent="center">
      
      


      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Set Timetable Academic Year </DialogTitle>
        <DialogContent>
          
          <TextField
            margin="dense"
            label="Academic Year"
            fullWidth
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={Save}>Save</Button>
        </DialogActions>
      </Dialog>









      <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', justifyContent: "flex-end" }}>
        <Fab color="primary" aria-label="add" onClick={handleAddNewProgrammeClick}>
          <AddIcon />
        </Fab>
        <Typography sx={{ left: 8, position: 'relative', alignSelf: 'center' }}>New Programs</Typography>
      </Grid>
      {programmes?.length == 0 ? 
      (
        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
          <Typography sx={{ left: 8, position: 'relative', alignSelf: 'center',fontSize:18 }}>No programs added yet.</Typography>
        </Grid>
      )
      : (
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 6, background: 'white', marginBottom: 2 }}>
            <Typography variant="h5" sx={{ textAlign: 'left' }}>Select Programme</Typography>

            <FormControl fullWidth sx={{ mt: 3, mb: 2 }}>
              <Select
                value={selectedProgramme?.name}
                onChange={e => {
                  const selectedProgrammeName = e.target.value;
                  const newSelectedProgramme = programmes?.find(programme => programme.name === selectedProgrammeName);
                  setSelectedProgramme(newSelectedProgramme);
                }}
                fullWidth
                sx={{ background: '#fff', borderRadius: 2, '&:focus': { backgroundColor: '#fff' } }}
              >
                {programmes?.map((programme, index) => (
                  <MenuItem key={index} value={programme?.name}>
                    {programme?.name}
                  </MenuItem>
                ))}
                {/* <Button onClick={() => handleDeleteProgram(selectedProgramme._id)} color="secondary">
Delete 
</Button> */}

              </Select>
            </FormControl>

            <List>
              {selectedProgramme?.courses.length == 0 ? "No courses available" : ''}
              {selectedProgramme?.courses && selectedProgramme?.courses.map((course, idx) => (
                <ListItem key={idx}>
                  <ListItemText primary={course?.subname} />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => handleRemoveCourseFromSelectedProgramme(idx)}>
                      <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>


            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', marginTop: 3 }}>
              <AddIcon onClick={handleAddNewCourseClick} />
              <Typography sx={{ left: 5, position: 'relative' }}>New Course</Typography>
            </Grid>
          </Paper>



        </Grid>

      )}





      <Dialog open={deleteConfirmationOpen} onClose={handleCloseDeleteConfirmation}>
        <DialogTitle>Delete Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this course?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation}>Cancel</Button>
          <Button onClick={handleConfirmDeleteCourse} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addProgramModalOpen} onClose={handleCloseAddProgrammeModal} sx={{ minWidth: "60%" }}>
        <DialogTitle>Add New Program</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Program Name"
            fullWidth
            value={newProgrammeName}
            onChange={(e) => setNewProgrammeName(e.target.value)}
          />
          {newCourses?.map((course, index) => (
            <TextField
              key={index}
              autoFocus={index === newCourses?.length - 1} // autofocus on the last input field
              margin="dense"
              id={`course-${index}`}
              label={`Course ${index + 1}`}
              fullWidth
              value={course.subname}
              onChange={(e) => {
                const updatedCourses = [...newCourses];
                updatedCourses[index] = { ...updatedCourses[index], subname: e.target.value };
                setNewCourses(updatedCourses);
              }}
            />
          ))}
          <Button onClick={() => setNewCourses([...newCourses, { subname: '' }])} color="primary">Add Course</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddProgrammeModal}>Cancel</Button>
          <Button onClick={handleAddProgramme} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addCourseModalOpen} onClose={handleCloseAddCourseModal}>
        <DialogTitle>New Course</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the name of the new course:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Course Name"
            fullWidth
            value={newCourseName}
            onChange={(e) => setNewCourseName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddCourseModal}>Cancel</Button>
          <Button onClick={handleAddCourseToSelectedProgramme} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </Grid>

  );
}
