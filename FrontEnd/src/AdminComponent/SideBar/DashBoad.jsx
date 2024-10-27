import React, { useContext, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Fab, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Paper, MenuItem } from '@mui/material';
import AddTimeTable from './AddTimeTable';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AuthContext } from '../../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Route, Navigate } from 'react-router-dom';


export default function DashBoad() {
  // const {setBatchDetail}=useContext(AuthContext)
let navigate=useNavigate()
  const [showtimetable, setShowTimeTable] = useState(false);
  const [timetables, setTimetables] = useState([{
    id: 20,
     name: "BCA",
    academicYear: 20
  }]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTimetableName, setNewTimetableName] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [selectedTimetable, setSelectedTimetable] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [timetable, setTimetable] = useState([]);
  console.log(timetable,'timetable');
  
  const [count, setCount] = useState(0);


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
      programName: newTimetableName,
      academicYear: academicYear
    };
    setTimetable([...timetable, newTimetable]);

    setSelectedTimetable(newTimetable); // Set the selected timetable after creation
    handleCloseDialog();
  };

  const handleDeleteTimetable = async(id) => {
    console.log(id,'id');
    const response = await axios.delete(`http://localhost:3000/api/admin/timetable/${id}`);


    // console.log(response.data.message,"123456789");
    if(response.data.success){
      setCount(count+1)
    }

    const updatedTimetables = timetable?.filter(timetable => timetable.id !== id);
    setTimetable(updatedTimetables);
  };

  const handleShowTimetable = (timetable) => {
    if (timetable) {
      
      console.log(timetable,'timetable');
      setSelectedTimetable(timetable); // Set the selected timetable for editing
      setShowTimeTable(true);
      navigate('/batch', { state: { timetable } });

    }
  };
  const handleEditTimetable = (timetable) => {
    console.log(timetable,'timetable');
    if (timetable) {
      setSelectedTimetable(timetable); // Set the selected timetable for editing
      setShowTimeTable(true);
      // setBatchDetail(timetable)
    


    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Filter timetables based on search query
  const filteredTimetables = timetable?.filter(timetable => {
    const lowerCaseQuery = searchQuery?.toLowerCase();
    return timetable?.name?.toLowerCase()?.includes(lowerCaseQuery);
  });

  // Sort timetables based on selected option
  const sortedTimetables = filteredTimetables.sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'aacdemicYear') {
      return a.academicYear.localeCompare(b.academicYear);
    }
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API call
        const response = await axios.get('http://localhost:3000/api/admin/timetable');
        
        // Set the timetable state with the response data
        setTimetable(response.data?.timetables);
      } catch (error) {
        console.error('Error fetching timetable data:', error);
      }
    };

      fetchData();
  }, [count]); // Adding timetable as a dependency will ensure useEffect runs when timetable changes


  return (
    <div>
      {showtimetable ? (
        <AddTimeTable />
      ) : (
        <>
          <div style={{ position: 'fixed', top: 'calc(1cm + 60px)', right: '100px', zIndex: '999' }}>
            <Fab style={{ backgroundColor: '#33bfff', color: 'Black', display: 'inline-block' }} aria-label="add" onClick={  ()=>    setShowTimeTable(true)
}>
              <AddIcon />
            </Fab>
            <Typography style={{ display: 'inline-block', marginLeft: '12px', cursor: 'pointer' }}>New TimeTable</Typography>
          </div>

          <div style={{ marginTop: '20px', padding: '20px' }}>
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
              <Typography variant="h5" style={{ marginBottom: '10px' }}>Your Timetables:</Typography>
              {/* <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
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
              </div> */}
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
                    {timetable?.length==0 &&(
                      <Typography>No data</Typography>
                    )}
                    {timetable.map((timetable, index) => (
                      <tr key={timetable.id}>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{timetable?.programName}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{timetable?.academicYear}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                          <IconButton aria-label="edit" onClick={() => handleShowTimetable(timetable)}>
                            <VisibilityIcon />
                          </IconButton>
                          {/* <IconButton aria-label="edit" onClick={() => handleEditTimetable(timetable)}>
                            <EditIcon />
                          </IconButton> */}
                          <IconButton aria-label="delete" onClick={() => handleDeleteTimetable(timetable?._id)}>
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
        </>
      )}

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
