import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Box, Grid, IconButton, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CloseIcon from '@mui/icons-material/Close';
import AddTeacherDialog from './AddTeacherDialog';
import axios from 'axios';

export default function AddTeacher() {
  const [showTimeTable, setShowTimeTable] = useState(false);
  const [teachers, setTeachers] = useState([]);


  useEffect(() => { 

    // Make request to backend endpoint
    axios.get('http://localhost:3000/api/teacher/allteacher', )
      .then(response => {
        setTeachers(response.data.teacher);
      })
      .catch(error => {
        console.error('Error fetching user ID:', error);
      });
  }, [teachers]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedTeachers = [...teachers].sort((a, b) => {
    if (sortConfig.direction === 'ascending') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });

  const handleShowTimeTable = () => {
    setShowTimeTable(true);
  };

  const handleSaveTeacher = (newTeacher) => {
    setTeachers([...teachers, newTeacher]);
    setShowTimeTable(false);
    setSnackbarMessage('Teacher added successfully');
    setSnackbarOpen(true);
  };

  // const handleDeleteTeacher = (teacherId) => {
  //   if (window.confirm('Are you sure you want to delete this teacher?')) {
  //     setTeachers(teachers.filter(teacher => teacher.id !== teacherId));
  //     setSnackbarMessage('Teacher deleted successfully');
  //     setSnackbarOpen(true);
  //   }
  // };

  const handleDeleteTeacher = (teacherId) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      axios.delete(`http://localhost:3000/api/teacher/delete/${teacherId}`)
        .then(response => {
          // Update state to remove the deleted teacher
          setTeachers(prevTeachers => prevTeachers.filter(teacher => teacher.id !== teacherId));
          setSnackbarMessage('Teacher deleted successfully');
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

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper style={{ padding: '20px', borderRadius: '10px' }}>
          <Typography variant="h5" gutterBottom style={{ marginBottom: '20px' }}>Teacher List</Typography>
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
                  <TableCell>Courses</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              {teachers?.length == 0 &&(
                 <TableBody>
                 No data
              </TableBody>
              )}
             
              <TableBody>
                {sortedTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>{teacher?.teacher_id}</TableCell>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>{teacher.courses.join(', ')}</TableCell>
                    <TableCell>{teacher.phone}</TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => handleDeleteTeacher(teacher._id)}>
                        <CloseIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <Fab size="small" style={{ backgroundColor: '#33bfff', color: 'black' }} aria-label="add" onClick={handleOpenDialog}>
              <AddIcon />
            </Fab>
            <Typography style={{ display: 'inline-block', marginLeft: '10px', cursor: 'pointer' }} onClick={handleOpenDialog}>Add Teacher</Typography>
          </div>
        </Paper>
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Teacher</DialogTitle>
        <DialogContent>
          <AddTeacherDialog onClose={handleCloseDialog} />
        </DialogContent>
      </Dialog>
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
