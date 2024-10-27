import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TableSortLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function ClassLists() {
  const [programs, setPrograms] = useState([
    { id: 1, year: '1st', degree: 'BCA', name: 'Bigdata' },
    { id: 2, year: '2nd', degree: 'BCA', name: 'Robotics' },
    { id: 3, year: '2nd', degree: 'BSC', name: 'Forensic' },
    { id: 4, year: '3rd', degree: 'BCA', name: 'Cyber Security' },
    { id: 5, year: '1st', degree: 'BCA', name: 'Cloud Computing' }
  ]);

  const [sortBy, setSortBy] = useState('year');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (column) => {
    const isAsc = sortBy === column && sortDirection === 'asc';
    setSortBy(column);
    setSortDirection(isAsc ? 'desc' : 'asc');
  };

  const sortedPrograms = [...programs].sort((a, b) => {
    if (sortBy === 'year') {
      const yearA = parseInt(a.year, 10);
      const yearB = parseInt(b.year, 10);
      return sortDirection === 'asc' ? yearA - yearB : yearB - yearA;
    }
    return sortDirection === 'asc' ? a[sortBy].localeCompare(b[sortBy]) : b[sortBy].localeCompare(a[sortBy]);
  });

  const handleDelete = (id) => {
    setPrograms(programs.filter(program => program.id !== id));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === 'year'}
                direction={sortBy === 'year' ? sortDirection : 'asc'}
                onClick={() => handleSort('year')}
              >
                Year
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === 'degree'}
                direction={sortBy === 'degree' ? sortDirection : 'asc'}
                onClick={() => handleSort('degree')}
              >
                Degree
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === 'name'}
                direction={sortBy === 'name' ? sortDirection : 'asc'}
                onClick={() => handleSort('name')}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedPrograms.map((program, index) => (
            <TableRow key={program.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{program.year}</TableCell>
              <TableCell>{program.degree}</TableCell>
              <TableCell>{program.name}</TableCell>
              <TableCell>
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleDelete(program.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
