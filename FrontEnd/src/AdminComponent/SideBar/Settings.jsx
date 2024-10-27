import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

export default function Settings() {
  const [open, setOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [periods, setPeriods] = useState([
    { period: 'Period 1', type: '', startTime: '', endTime: '' },
    { period: 'Period 2', type: '', startTime: '', endTime: '' },
    { period: 'Period 3', type: '', startTime: '', endTime: '' },
    { period: 'Period 4', type: '', startTime: '', endTime: '' },
    { period: 'Period 5', type: '', startTime: '', endTime: '' },
    { period: 'Period 6', type: '', startTime: '', endTime: '' },
    { period: 'Period 7', type: '', startTime: '', endTime: '' },
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMessage('');
  };

  const handleSave = () => {
    console.log('Time settings:', periods);
    handleClose();
  };

  const handlePeriodChange = (index, event) => {
    const { value } = event.target;
    const updatedPeriods = [...periods];
    updatedPeriods[index].type = value;
    setPeriods(updatedPeriods);
  };

  const handleStartTimeChange = (index, event) => {
    const { value } = event.target;
    const updatedPeriods = [...periods];
    updatedPeriods[index].startTime = value;
    setPeriods(updatedPeriods);
  };

  const handleEndTimeChange = (index, event) => {
    const { value } = event.target;
    const updatedPeriods = [...periods];
    updatedPeriods[index].endTime = value;
    setPeriods(updatedPeriods);
  };

  const handleAddPeriod = () => {
    const newPeriod = {
      period: `Period ${periods.length + 1}`,
      type: '',
      startTime: '',
      endTime: '',
    };
    setPeriods([...periods, newPeriod]);
  };

  const handleRemovePeriod = (index) => {
    const updatedPeriods = periods.filter((_, i) => i !== index);
    setPeriods(updatedPeriods);
  };

  const handlePasswordClickOpen = () => {
    setPasswordOpen(true);
  };

  const handlePasswordClose = () => {
    setPasswordOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrorMessage('');
  };

  const handleChangePassword = () => {
    if (currentPassword === '') {
      setErrorMessage('Please enter your current password.');
      return;
    }

    if (newPassword === '') {
      setErrorMessage('Please enter a new password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password do not match.');
      return;
    }

    // Add logic to change password using currentPassword and newPassword
    console.log('Changing password:', { currentPassword, newPassword });
    
    // Reset fields and error message after successful password change
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrorMessage('');
    setPasswordOpen(false);
  };

  const calculateTotalTime = (type) => {
    return periods.reduce((total, period) => {
      if (period.type === type && period.startTime && period.endTime) {
        const start = new Date(`2000-01-01T${period.startTime}`);
        const end = new Date(`2000-01-01T${period.endTime}`);
        return total + (end - start) / (1000 * 60 * 60); // Convert milliseconds to hours
      }
      return total;
    }, 0);
  };

  const totalClassTime = calculateTotalTime('Class Time');
  const totalBreakTime = calculateTotalTime('Break');
  const totalLunchBreakTime = calculateTotalTime('Lunch Break');

  return (
    <div>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={handleClickOpen}>
          TIME TABLE
        </Button>
        <Button variant="outlined" onClick={handlePasswordClickOpen}>
          CHANGE PASSWORD
        </Button>
      </Stack>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <DialogTitle>Period Timings</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                {periods.map((period, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ border: '2px solid black' }}>{period.period}</TableCell>
                    <TableCell style={{ border: '2px solid black' }}>
                      <Select
                        value={period.type}
                        onChange={(event) => handlePeriodChange(index, event)}
                        style={{ minWidth: '120px', marginRight: '10px' }}
                      >
                        <MenuItem value={'Break'}>Break Time</MenuItem>
                        <MenuItem value={'Class Time'}>Class Time</MenuItem>
                        <MenuItem value={'Lunch Break'}>Lunch Time</MenuItem>
                      </Select>
                      <TextField
                        margin="dense"
                        label="Start Time"
                        type="time"
                        fullWidth
                        value={period.startTime}
                        onChange={(event) => handleStartTimeChange(index, event)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        margin="dense"
                        label="End Time"
                        type="time"
                        fullWidth
                        value={period.endTime}
                        onChange={(event) => handleEndTimeChange(index, event)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </TableCell>
                    <TableCell align="right" style={{ border: '2px solid black' }}>
                      <IconButton onClick={() => handleRemovePeriod(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body1" style={{ marginTop: '10px' }}>
            Total Class Time: {totalClassTime.toFixed(2)} hours
          </Typography>
          <Typography variant="body1">
            Total Break Time: {totalBreakTime.toFixed(2)} hours
          </Typography>
          <Typography variant="body1">
            Total Lunch Break Time: {totalLunchBreakTime.toFixed(2)} hours
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddPeriod}>Add Period</Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={passwordOpen} onClose={handlePasswordClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Current Password"
            type="password"
            fullWidth
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Confirm Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errorMessage && <Typography style={{ color: 'red' }}>{errorMessage}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePasswordClose}>Cancel</Button>
          <Button onClick={handleChangePassword} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
