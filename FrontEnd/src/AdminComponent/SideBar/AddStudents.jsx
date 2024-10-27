import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Box, Grid, IconButton, FormControl, Select, MenuItem, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CloseIcon from '@mui/icons-material/Close';
import Addinstudents from './Addinstudents';
import axios from 'axios';

export default function AddStudents() {
  const [showTimeTable, setShowTimeTable] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(undefined);
  const [selectedBatch, setSelectedBatch] = useState(undefined);
  const [students, setStudents] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedStudents = [...students].filter(student => {
    if (!selectedProgram || !selectedBatch) return false; // Do not show students if program or batch is not selected
    return student.programme === selectedProgram && student.batch === selectedBatch;
  }).sort((a, b) => {
    if (sortConfig.direction === 'ascending') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });

  const handleShowTimeTable = () => {
    setShowTimeTable(true);
  };

  const handleSaveStudent = (newStudent) => {
    const { id, name, phone } = newStudent;
    setStudents([...students, { id, name, phone, program: selectedProgram, batch: selectedBatch }]);
    setShowTimeTable(false);
    setSnackbarMessage('Student added successfully');
    setSnackbarOpen(true);
  };


  const handleDeleteStudent = (studentId) => {
    console.log(studentId,'studentId');
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      axios.delete(`http://localhost:3000/api/student/delete/${studentId}`)
        .then(response => {
          // Update state to remove the deleted teacher
          setStudents(students.filter(student => student.id !== studentId));
          setSnackbarMessage('Student deleted successfully');
          setSnackbarOpen(true);
        })
        .catch(error => {
          console.error('Error deleting teacher:', error);
        });
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const [openDialog, setOpenDialog] = useState(false);

  const onClose=()=>(
    setOpenDialog(false)
  )


  const [programmes, setProgrammes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/student/programmes')
      .then(response => {
        setProgrammes(response.data.programs);
      })
      .catch(error => {
        console.error('Error fetching programmes:', error);
      });
  }, [])



  console.log(students, 'student');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/student/allstudent'); // Adjust the API endpoint as per your backend route
        setStudents(response.data.student); // Set the fetched teachers in state

      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };
    fetchTeachers(); // Call the fetchTeachers function
  }, [students]); // Empty dependency array ensures that this effect runs only once after the component mounts



  const [batchnumber, setBatchNumber] = useState(['Batch 1', 'Batch 2', 'Batch 3']);


  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper style={{ padding: '20px', borderRadius: '10px' }}>
          <Typography variant="h5" gutterBottom style={{ marginBottom: '20px' }}>Student List</Typography>
          <div style={{ marginBottom: '20px' }}>
            <FormControl style={{ marginRight: '10px', minWidth: '120px' }}>
              <Select value={selectedProgram || ''} onChange={(e) => setSelectedProgram(e.target.value === '' ? undefined : e.target.value)} displayEmpty>
                <MenuItem value="" disabled>Select Program</MenuItem>
                {programmes.map((programme, index) => (
                  <MenuItem key={index} value={programme?.name}>
                    {programme?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl style={{ minWidth: '120px' }}>
              <Select value={selectedBatch || ''} onChange={(e) => setSelectedBatch(e.target.value === '' ? undefined : e.target.value)} displayEmpty disabled={!selectedProgram}>
                <MenuItem value="" disabled>Select Batch</MenuItem>
                {batchnumber.map((batchNumber) => (
                  <MenuItem key={batchNumber} value={batchNumber}>{batchNumber}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>


          {selectedProgram && selectedBatch && (
            <>

{sortedStudents?.length == 0 ? (
            <Typography>No Student Found</Typography>
          ) : (
          
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          ID
                          <IconButton size="small" onClick={() => handleSort('id')}>
                            {sortConfig.key === 'id' && sortConfig.direction === 'ascending' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          Name
                          <IconButton size="small" onClick={() => handleSort('name')}>
                            {sortConfig.key === 'name' && sortConfig.direction === 'ascending' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell>Phone Number</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedStudents.map((student) => (
                      <TableRow key={student.student_id}>
                        <TableCell>{student?.student_id}</TableCell>
                        <TableCell>{student?.name}</TableCell>
                        <TableCell>{student?.phone}</TableCell>
                        <TableCell>
                          <IconButton size="small" onClick={() => handleDeleteStudent(student?._id)}>
                            <CloseIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

)}
            </>
          )}

       
          {selectedProgram != undefined && selectedBatch != undefined && (
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <Fab size="small" style={{ backgroundColor: '#33bfff', color: 'black' }} aria-label="add" onClick={() => setOpenDialog(true)}>
                <AddIcon />
              </Fab>
              <Typography style={{ display: 'inline-block', marginLeft: '10px', cursor: 'pointer' }} onClick={() => setOpenDialog(true)}>Add Student</Typography>
            </div>
          )}

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Add Student</DialogTitle>  
            <DialogContent>
              <Addinstudents onSave={handleSaveStudent} selectedProgram={selectedProgram} selectedBatch={selectedBatch} onClose={onClose} />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
            </DialogActions>
          </Dialog>

        </Paper>
      </Grid>


      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Grid>
  );
}
