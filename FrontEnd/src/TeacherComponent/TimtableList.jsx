import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Fab, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Paper, MenuItem, Grid } from '@mui/material';

export default function DashBoad() {
  const [showtimetable, setShowTimeTable] = useState(false);
  const [timetables, setTimetables] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTimetableName, setNewTimetableName] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [selectedTimetable, setSelectedTimetable] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name');

  const handleShowTimeTable = () => {
    setShowTimeTable(true);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreateTimetable = () => {
    const newTimetable = {
      id: Date.now(),
      name: newTimetableName,
      academicYear: academicYear
    };
    setTimetables([...timetables, newTimetable]);
    setSelectedTimetable(newTimetable); // Set the selected timetable after creation
    handleCloseDialog();
  };

  const handleDeleteTimetable = (id) => {
    const updatedTimetables = timetables.filter(timetable => timetable.id !== id);
    setTimetables(updatedTimetables);
  };

  const handleEditTimetable = (timetable) => {
    if (timetable) {
      setSelectedTimetable(timetable); // Set the selected timetable for editing
      setShowTimeTable(true);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Filter timetables based on search query
  const filteredTimetables = timetables.filter(timetable => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return timetable.name.toLowerCase().includes(lowerCaseQuery);
  });

  // Sort timetables based on selected option
  const sortedTimetables = filteredTimetables.sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'academicYear') {
      return a.academicYear.localeCompare(b.academicYear);
    }
  });

  return (
    <div>
     <>
{!timetables==[]?(
     <Grid>
        No Time table 
     </Grid>

):(

         
          <div style={{ marginTop: '20px', padding: '20px' }}>
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
              <Typography variant="h5" style={{ marginBottom: '10px' }}>Your Timetables:</Typography>
              <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <TextField
                  label="Search Timetables"
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  style={{ marginRight: '10px' }}
                />
                <TextField
                  select
                  label="Sort By"
                  variant="outlined"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="academicYear">Academic Year</MenuItem>
                </TextField>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>#</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Academic Year</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTimetables.map((timetable, index) => (
                      <tr key={timetable.id}>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{timetable.name}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{timetable.academicYear}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                          <IconButton aria-label="edit" onClick={() => handleEditTimetable(timetable)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton aria-label="delete" onClick={() => handleDeleteTimetable(timetable.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Paper>
          </div>

)}

        </>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create New Timetable</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Timetable Name"
            fullWidth
            value={newTimetableName}
            onChange={(e) => setNewTimetableName(e.target.value)}
          />
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
          <Button onClick={handleCreateTimetable}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
