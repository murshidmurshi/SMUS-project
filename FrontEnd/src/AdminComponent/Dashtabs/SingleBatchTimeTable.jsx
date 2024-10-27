import React from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Divider } from '@mui/material';


export default function SingleBatchTimeTable() {
    // Use useLocation hook to access the location object
    const location = useLocation();

    // Access the state passed from the previous route
    const { state } = location;

    // Assuming timetable is the key in the state object
    const timetables = [state?.timetable];

    // Now you can use the timetable data in your component
    console.log(timetables); // Access timetable data

    const getGradient = (subname) => {
        // Your logic to get gradient based on subject name
        return '';
    };
    return (
        <div>
        <h1>Timetables</h1>
        <div>
            <Grid sx={{ paddingTop: 2, paddingBottom: 2 }}>
                <h2>{timetables[0]?.programName} {timetables[0]?.batchName} Weekly Schedule</h2>
            </Grid>
            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ border: '1px solid black', backgroundColor: 'black', color: 'white', textAlign: 'center' }}>Days</TableCell>
                            {/* Assuming all timetables have the same structure, getting time slots from the first timetable */}
                            {timetables.length > 0 && Object.keys(timetables[0]?.timetable?.Monday).map(slot => (
                                <TableCell key={slot} style={{ border: '1px solid black', backgroundColor: 'black', color: 'white', textAlign: 'center' }}>{slot}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {timetables?.map(({ timetable }, index) => (
<React.Fragment key={index}>
    {Object.entries(timetable).map(([day, slots]) => (
        <TableRow key={day}>
            <TableCell style={{ border: '1px solid black', backgroundColor: 'black', color: 'white', textAlign: 'center' }}>{day}</TableCell>
            {Object.entries(slots).map(([timeSlot, courses]) => (
                <TableCell key={`${day}-${timeSlot}`} style={{ border: '1px solid black', background: getGradient(courses[0]?.subname) }}>
                    {courses
                        .filter(course => course.teacher === teacherDetail?._id)
                        .map((course, courseIndex) => (
                            <div key={courseIndex}>
                                <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 19 }}>{course.subname}</Typography>
                                <Typography sx={{ textAlign: 'center' }}>{course?.teacher}</Typography>
                            </div>
                        ))
                    }
                </TableCell>
            ))}
        </TableRow>
    ))}
</React.Fragment>
))} */}

                        {timetables?.map(({ timetable }, index) => {
                            console.log(timetable, 'timetable'); // Logging timetable here
                            return (
                                <React.Fragment key={index}>
                                    {Object.entries(timetable).map(([day, slots]) => (
                                        <TableRow key={day}>
                                            <TableCell style={{ border: '1px solid black', backgroundColor: 'black', color: 'white', textAlign: 'center' }}>{day}</TableCell>
                                            {Object.entries(slots).map(([timeSlot, courses]) => (
                                                <TableCell key={`${day}-${timeSlot}`} style={{ border: '1px solid black', background: getGradient(courses[0]?.subname) }}>
                                                    {courses.map((course, courseIndex) => (
                                                        <div key={courseIndex}>
                                                            <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 19 }}>{course.subname}</Typography>
                                                            <Typography sx={{ textAlign: 'center' }}>{course?.teacher}</Typography>
                                                        </div>
                                                    ))}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </React.Fragment>
                            );
                        })}


                        {/* <Divider />
                                <Divider />
                                <Divider />
                                <Divider />
                                <Divider />
                            </React.Fragment>
                        ))} */}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </div>
    );
}
