import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: '1px solid rgba(224, 224, 224, 1)',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const timetableData = [
  { timing: '9:00 AM - 10:00 AM', classes: [{ name: 'LH-01', course: 'Mathematics' }, { name: 'LH-02', course: 'Physics' }, { name: 'LH-03', course: 'Chemistry' }, { name: 'LH-04', course: 'Biology' }, { name: 'LH-05', course: 'English' }, { name: 'LH-06', course: 'History' }] },
  { timing: '10:00 AM - 11:00 AM', classes: [{ name: 'LH-02', course: 'Physics' }, { name: 'LH-03', course: 'Chemistry' }, { name: 'LH-04', course: 'Biology' }, { name: 'LH-05', course: 'English' }, { name: 'LH-06', course: 'History' }, { name: 'LH-07', course: 'Geography' }] },
  { timing: '11:00 AM - 11:15 AM', classes: [{ name: 'Break', course: 'Break' }, { name: 'Break', course: 'Break' }, { name: 'Break', course: 'Break' }, { name: 'Break', course: 'Break' }, { name: 'Break', course: 'Break' }, { name: 'Break', course: 'Break' }] },
  { timing: '11:15 AM - 12:10 PM', classes: [{ name: 'LH-03', course: 'Chemistry' }, { name: 'LH-04', course: 'Biology' }, { name: 'LH-05', course: 'English' }, { name: 'LH-06', course: 'History' }, { name: 'LH-07', course: 'Geography' }, { name: 'LH-08', course: 'Economics' }] },
  { timing: '12:10 PM - 1:00 PM', classes: [{ name: 'Lunch', course: 'Lunch' }, { name: 'Lunch', course: 'Lunch' }, { name: 'Lunch', course: 'Lunch' }, { name: 'Lunch', course: 'Lunch' }, { name: 'Lunch', course: 'Lunch' }, { name: 'Lunch', course: 'Lunch' }] },
  { timing: '1:00 PM - 2:00 PM', classes: [{ name: 'LH-04', course: 'Biology' }, { name: 'LH-05', course: 'English' }, { name: 'LH-06', course: 'History' }, { name: 'LH-07', course: 'Geography' }, { name: 'LH-08', course: 'Economics' }, { name: 'LH-09', course: 'Computer Science' }] },
  { timing: '2:00 PM - 3:00 PM', classes: [{ name: 'LH-05', course: 'English' }, { name: 'LH-06', course: 'History' }, { name: 'LH-07', course: 'Geography' }, { name: 'LH-08', course: 'Economics' }, { name: 'LH-09', course: 'Computer Science' }, { name: 'LH-10', course: 'Psychology' }] },
];


export default function Timetable() {
  const [numTables, setNumTables] = React.useState(1); // Render a single timetable

  const regenerateTimetable = () => {
    // Add logic to regenerate timetable here
  };

  const printTimetable = () => {
    // Add logic to print timetable here
  };

  const saveTimetable = () => {
    // Add logic to save timetable here
  };

  const shareTimetable = () => {
    // Add logic to share timetable here
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Typography variant="h6">Teacher's Timetable</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell></StyledTableCell>
              {timetableData.map((timeData, index) => (
                <StyledTableCell key={index}>{timeData.timing}</StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
              <StyledTableRow key={day}>
                <StyledTableCell>{day}</StyledTableCell>
                {timetableData.map((timeData, idx) => (
                  <StyledTableCell key={`${day}-${idx}`}>
                    {timeData.classes[index].name} <br /> 
                    <span style={{ fontSize: '10px' }}>({timeData.classes[index].course})</span>
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        
        <Button variant="outlined" startIcon={<SaveIcon />} onClick={saveTimetable}>
          Save
        </Button>
        <Button variant="outlined" startIcon={<PrintIcon />} onClick={printTimetable}>
          Print
        </Button>
        <Button variant="outlined" startIcon={<ShareIcon />} onClick={shareTimetable}>
          Share
        </Button>
      </div>
    </div>
  );
}
