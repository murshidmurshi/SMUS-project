import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Grid, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Divider, Button, Container } from '@mui/material';
import { useReactToPrint } from 'react-to-print';

function TeacherTimetable({ teacherDetail }) {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    // console.log(teacherDetail, 'teacherDetail');
    const [timetables, setTimetables] = useState([]);

    useEffect(() => {
        // Fetch timetable data from the backend API
        async function fetchTimetables() {
            try {
                const response = await axios.get('http://localhost:3000/api/admin/timetable'); // Replace with your API endpoint
                const allTimetables = response.data.timetables;
                const filteredTimetables = allTimetables.filter(timetable => {
                    return timetable.teachers?.some(teacherId => teacherId === teacherDetail?._id);
                });
                setTimetables(filteredTimetables);
                console.log(filteredTimetables, 'Filtered Timetables');
            } catch (error) {
                console.error('Error fetching timetables:', error);
            }
        }
        
        fetchTimetables();
    }, [teacherDetail._id]);


    const getGradient = (subname) => {
        // Your logic to get gradient based on subject name
        return '';
    };

    return (
        <div>
            <h1>Teacher Timetables</h1>

            <div>


                {timetables?.length == 0 && (
                    <>
                        <Grid>
                            <Typography>
                                No timetable to display
                            </Typography>
                        </Grid>
                    </>
                )}


                <TableContainer component={Paper} style={{ width: "99%", marginBottom: 20, padding: 5 }} >
                    <Table style={{}} ref={componentRef} >
                        {timetables?.map(({ timetable }, index) => {
                            console.log(timetables[index], 'timetable'); // Logging timetable here
                            return (
                                <React.Fragment key={index}>
                                    <Table >

                                        <Typography style={{ fontSize: 22, fontWeight: 'bold', width: 200 }}> {timetables[index]?.programName} {timetables[index]?.batchName} Weekly Schedule</Typography>
                                        <TableBody   >
                                            <TableCell style={{ border: '1px solid black', backgroundColor: 'black', color: 'white', textAlign: 'center' }}></TableCell>

                                            {timetables.length > 0 && Object.keys(timetables[0]?.timetable?.Monday).map(slot => (
                                                <TableCell key={slot} style={{ border: '1px solid black', backgroundColor: 'black', color: 'white', textAlign: 'center' }}>{slot}</TableCell>
                                            ))}
                                            {Object.entries(timetable).map(([day, slots]) => (
                                                <TableRow key={day}>
                                                    <TableCell style={{ border: '1px solid black', backgroundColor: 'black', color: 'white', textAlign: 'center' }}>{day}</TableCell>
                                                    {Object.entries(slots).map(([timeSlot, courses]) => (
                                                        <TableCell key={`${day}-${timeSlot}`} style={{ border: '1px solid black', background: getGradient(courses[0]?.subname) }}>
                                                            {courses.map((course, courseIndex) => (
                                                                <div key={courseIndex}>
                                                                    <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 19 }}>
                                                                        {/* {course.subname} */}
                                                                        {course?.teacher == teacherDetail?.name ? course?.subname : '---'}

                                                                    </Typography>
                                                                    <Typography sx={{ textAlign: 'center' }}>
                                                                        {course?.teacher == teacherDetail?.name ? course?.teacher : '----'}
                                                                    </Typography>
                                                                </div>
                                                            ))}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}

                                        </TableBody>
                                    </Table>


                                    {index < timetables.length - 1 && <div style={{ pageBreakAfter: 'always' }}></div>}

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
                    </Table>
<Button variant="outlined" onClick={handlePrint} style={{ marginTop: '10px' }}>Print Timetable</Button>

                </TableContainer>

            </div>
        </div>
    );
}

export default TeacherTimetable;
