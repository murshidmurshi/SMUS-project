import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function TimetablePage() {

    const timetable = {
        Monday: {
            '9 AM - 10 AM': [{ subname: 'Math', teacher: 'Mr. Smith' }],
            '10 AM - 11 AM': [{ subname: 'English', teacher: 'Ms. Johnson' }],
            '11 AM - 12 PM': [{ subname: 'Science', teacher: 'Mrs. Brown' }],
            '12 PM - 1 PM': [{ subname: 'Lunch', teacher: '' }],
            '1 PM - 2 PM': [{ subname: 'History', teacher: 'Mr. White' }],
            '2 PM - 3 PM': [{ subname: 'Geography', teacher: 'Ms. Davis' }],
            '3 PM - 4 PM': [{ subname: 'Art', teacher: 'Mrs. Lee' }],
        },
        Tuesday: {
            '9 AM - 10 AM': [{ subname: 'Physics', teacher: 'Mr. Green' }],
            '10 AM - 11 AM': [{ subname: 'Chemistry', teacher: 'Ms. Black' }],
            '11 AM - 12 PM': [{ subname: 'Biology', teacher: 'Dr. Gray' }],
            '12 PM - 1 PM': [{ subname: 'Lunch', teacher: '' }],
            '1 PM - 2 PM': [{ subname: 'Music', teacher: 'Mr. Davis' }],
            '2 PM - 3 PM': [{ subname: 'Physical Education', teacher: 'Coach Johnson' }],
            '3 PM - 4 PM': [{ subname: 'Computer Science', teacher: 'Mr. Brown' }],
        },
        Wednesday: {
            '9 AM - 10 AM': [{ subname: 'Math', teacher: 'Mr. Smith' }],
            '10 AM - 11 AM': [{ subname: 'English', teacher: 'Ms. Johnson' }],
            '11 AM - 12 PM': [{ subname: 'Science', teacher: 'Mrs. Brown' }],
            '12 PM - 1 PM': [{ subname: 'Lunch', teacher: '' }],
            '1 PM - 2 PM': [{ subname: 'History', teacher: 'Mr. White' }],
            '2 PM - 3 PM': [{ subname: 'Geography', teacher: 'Ms. Davis' }],
            '3 PM - 4 PM': [{ subname: 'Art', teacher: 'Mrs. Lee' }],
        },
        Thursday: {
            '9 AM - 10 AM': [{ subname: 'Physics', teacher: 'Mr. Green' }],
            '10 AM - 11 AM': [{ subname: 'Chemistry', teacher: 'Ms. Black' }],
            '11 AM - 12 PM': [{ subname: 'Biology', teacher: 'Dr. Gray' }],
            '12 PM - 1 PM': [{ subname: 'Lunch', teacher: '' }],
            '1 PM - 2 PM': [{ subname: 'Music', teacher: 'Mr. Davis' }],
            '2 PM - 3 PM': [{ subname: 'Physical Education', teacher: 'Coach Johnson' }],
            '3 PM - 4 PM': [{ subname: 'Computer Science', teacher: 'Mr. Brown' }],
        },
        Friday: {
            '9 AM - 10 AM': [{ subname: 'Math', teacher: 'Mr. Smith' }],
            '10 AM - 11 AM': [{ subname: 'English', teacher: 'Ms. Johnson' }],
            '11 AM - 12 PM': [{ subname: 'Science', teacher: 'Mrs. Brown' }],
            '12 PM - 1 PM': [{ subname: 'Lunch', teacher: '' }],
            '1 PM - 2 PM': [{ subname: 'History', teacher: 'Mr. White' }],
            '2 PM - 3 PM': [{ subname: 'Geography', teacher: 'Ms. Davis' }],
            '3 PM - 4 PM': [{ subname: 'Art', teacher: 'Mrs. Lee' }],
        },
        Saturday: {
            '9 AM - 10 AM': [{ subname: 'Physics', teacher: 'Mr. Green' }],
            '10 AM - 11 AM': [{ subname: 'Chemistry', teacher: 'Ms. Black' }],
            '11 AM - 12 PM': [{ subname: 'Biology', teacher: 'Dr. Gray' }],
            '12 PM - 1 PM': [{ subname: 'Lunch', teacher: '' }],
            '1 PM - 2 PM': [{ subname: 'Music', teacher: 'Mr. Davis' }],
            '2 PM - 3 PM': [{ subname: 'Physical Education', teacher: 'Coach Johnson' }],
            '3 PM - 4 PM': [{ subname: 'Computer Science', teacher: 'Mr. Brown' }],
        },
        Sunday: {
            '9 AM - 10 AM': [{ subname: 'Math', teacher: 'Mr. Smith' }],
            '10 AM - 11 AM': [{ subname: 'English', teacher: 'Ms. Johnson' }],
            '11 AM - 12 PM': [{ subname: 'Science', teacher: 'Mrs. Brown' }],
            '12 PM - 1 PM': [{ subname: 'Lunch', teacher: '' }],
            '1 PM - 2 PM': [{ subname: 'History', teacher: 'Mr. White' }],
            '2 PM - 3 PM': [{ subname: 'Geography', teacher: 'Ms. Davis' }],
            '3 PM - 4 PM': [{ subname: 'Art', teacher: 'Mrs. Lee' }],
        },
    };
    return (
        <div>
            <h2>Timetable</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Days</TableCell>
                            {/* Render table headers for each time slot */}
                            {Object.keys(timetable['Monday']).map(slot => (
                                <TableCell key={slot}>{slot}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Render table rows for each day */}
                        {Object.keys(timetable).map(day => (
                            <TableRow key={day}>
                                <TableCell>{day}</TableCell>
                                {/* Render table cells for each time slot in the day */}
                                {Object.keys(timetable[day]).map(slot => (
                                    <TableCell key={`${day}-${slot}`}>
                                        {timetable[day][slot].map(course => (
                                            <div key={course.subname}>
                                                <strong>{course.subname}</strong>
                                                <div>{course.teacher}</div>
                                            </div>
                                        ))}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default TimetablePage;
