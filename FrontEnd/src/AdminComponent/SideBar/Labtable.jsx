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

const daysOfWeek = ['9:00 AM - 11:00 AM', '11:00 AM - 1:00 PM', '1:00 PM - 3:00 PM', '3:00 PM - 5:00 PM', '5:00 PM - 7:00 PM', '7:00 PM - 9:00 PM'];

// Define timetable data
const timetableData = [
  { day: 'Monday', classes: [
    { name: '1st year BCA Bigdata', teacher: 'Mr. Smith', course: 'Java' },
    { name: '2nd year BSC Cybersecurity', teacher: 'Ms. Johnson', course: 'Python' },
    { name: '3rd year BCA IBM', teacher: 'Mr. Lee', course: 'Web Dev' },
    { name: 'MBA Analytics', teacher: 'Ms. Patel', course: 'C++' },
    { name: 'B.Tech AI', teacher: 'Mr. Rodriguez', course: 'DBMS' },
    { name: 'MCA Cloud Computing', teacher: 'Ms. White', course: 'Hadoop' },
  ]},
  { day: 'Tuesday', classes: [
    { name: 'M.Sc Data Science', teacher: 'Mr. Smith', course: 'Java' },
    { name: 'BBA Business Analytics', teacher: 'Ms. Johnson', course: 'Python' },
    { name: 'PGDCA Blockchain', teacher: 'Mr. Lee', course: 'Web Dev' },
    { name: 'M.Tech IoT', teacher: 'Ms. Patel', course: 'C++' },
    { name: 'B.Sc IT Security', teacher: 'Mr. Rodriguez', course: 'DBMS' },
    { name: 'BCA Cloud Security', teacher: 'Ms. White', course: 'Hadoop' },
  ]},
  { day: 'Wednesday', classes: [
    { name: 'MCA Machine Learning', teacher: 'Mr. Smith', course: 'Java' },
    { name: 'B.Tech Blockchain', teacher: 'Ms. Johnson', course: 'Python' },
    { name: 'MBA Fintech', teacher: 'Mr. Lee', course: 'Web Dev' },
    { name: 'B.Sc Data Analytics', teacher: 'Ms. Patel', course: 'C++' },
    { name: 'M.Tech Robotics', teacher: 'Mr. Rodriguez', course: 'DBMS' },
    { name: 'PGDCA Cyber Forensics', teacher: 'Ms. White', course: 'Hadoop' },
  ]},
  { day: 'Thursday', classes: [
    { name: 'M.Sc Artificial Intelligence', teacher: 'Mr. Smith', course: 'Java' },
    { name: 'MBA Machine Learning', teacher: 'Ms. Johnson', course: 'Python' },
    { name: 'MCA Data Mining', teacher: 'Mr. Lee', course: 'Web Dev' },
    { name: 'B.Tech Augmented Reality', teacher: 'Ms. Patel', course: 'C++' },
    { name: 'BBA Cloud Computing', teacher: 'Mr. Rodriguez', course: 'DBMS' },
    { name: 'M.Tech Quantum Computing', teacher: 'Ms. White', course: 'Hadoop' },
  ]},
  { day: 'Friday', classes: [
    { name: 'B.Sc Machine Learning', teacher: 'Mr. Smith', course: 'Java' },
    { name: 'MCA Data Science', teacher: 'Ms. Johnson', course: 'Python' },
    { name: 'M.Tech Data Analytics', teacher: 'Mr. Lee', course: 'Web Dev' },
    { name: 'B.Tech Cloud Security', teacher: 'Ms. Patel', course: 'C++' },
    { name: 'MBA Big Data', teacher: 'Mr. Rodriguez', course: 'DBMS' },
    { name: 'BBA Artificial Intelligence', teacher: 'Ms. White', course: 'Hadoop' },
  ]},
  { day: 'Saturday', classes: [
    { name: 'B.Tech Cybersecurity', teacher: 'Mr. Smith', course: 'Java' },
    { name: 'BCA Data Analytics', teacher: 'Ms. Johnson', course: 'Python' },
    { name: 'BBA Blockchain', teacher: 'Mr. Lee', course: 'Web Dev' },
    { name: 'M.Sc Cloud Computing', teacher: 'Ms. Patel', course: 'C++' },
    { name: 'MBA Information Security', teacher: 'Mr. Rodriguez', course: 'DBMS' },
    { name: 'B.Tech Artificial Intelligence', teacher: 'Ms. White', course: 'Hadoop' },
  ]},
];

export default function Labtable() {
  const saveTimetable = () => {
    // Add logic to save timetable here
  };

  const printTimetable = () => {
    // Add logic to print timetable here
  };

  const shareTimetable = () => {
    // Add logic to share timetable here
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Typography variant="h4">Lab Timetable</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              {daysOfWeek.map((timing) => (
                <StyledTableCell key={timing}>{timing}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {timetableData.map((dayData, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{dayData.day}</StyledTableCell>
                {dayData.classes.map((lab, idx) => (
                  <StyledTableCell key={idx}>
                    {lab.name} <br />
                    <span style={{ fontSize: '10px' }}>Teacher: {lab.teacher}</span> <br />
                    <span style={{ fontSize: '10px' }}>({lab.course})</span>
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
