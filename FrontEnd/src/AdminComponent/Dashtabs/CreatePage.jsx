import React, { useState, useRef, useContext, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Modal, TextField, Grid, Container } from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import { AuthContext } from '../../../AuthContext';
import axios from 'axios';



const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timeSlots = [
    '9 AM - 10 AM', '10 AM - 11 AM', '11 AM - 12 PM',
    '12 PM - 1 PM', '1 PM - 2 PM', '2 PM - 3 PM',
    '3 PM - 4 PM'
];

function generateTimetable(courses, daysOfWeek, timeSlots) {
    const timetable = {};
    console.log(timetable, 'courses12132121');

    // Initialize timetable with empty slots
    daysOfWeek.forEach(day => {

        timetable[day] = {};
        timeSlots.forEach(slot => {
            timetable[day][slot] = [];
        });
    });

    // Insert lunch period randomly for each day
    daysOfWeek.forEach(day => {
        const lunchSlot = Math.random() > 0.5 ? '12 PM - 1 PM' : '1 PM - 2 PM';
        timetable[day][lunchSlot] = [{ subname: 'Lunch', teacher: '' }];
    });
    

    courses.forEach(course => {
        const { subname, credits, teacher } = course;

        console.log(teacher, 123);

        // Find an empty slot for the course
        for (let i = 0; i < credits; i++) {
            let dayIndex, slotIndex;
            let assigned = false;

            // Try to assign the course until success or all slots are filled
            while (!assigned) {
                dayIndex = Math.floor(Math.random() * daysOfWeek.length);
                const day = daysOfWeek[dayIndex];

                // Select slot randomly only if it's not the lunch period
                const availableSlots = timeSlots.filter(slot => !['12 PM - 1 PM', '1 PM - 2 PM'].includes(slot));
                slotIndex = Math.floor(Math.random() * availableSlots.length);
                const slot = availableSlots[slotIndex];

                // Check if the slot is empty and the subject is not already assigned in any batch
                const isSubjectAssigned = Object.values(timetable).some(dayTimetable =>
                    dayTimetable[slot].some(course => course.subname === subname)
                );

                if (timetable[day][slot].length === 0 && !isSubjectAssigned) {
                    timetable[day][slot] = [{ subname, teacher }];
                    assigned = true;
                }
            }
        }
    });

    // Fill empty slots with 'Free'
    daysOfWeek.forEach(day => {
        timeSlots.forEach(slot => {
            if (timetable[day][slot].length === 0) {
                timetable[day][slot] = [{ subname: '--', teacher: '' }];
            }
        });
    });
    return timetable;
}


function Timetable({ timetable, componentRef, courses, batchNumber }) {

    console.log(timetable,'timetable');


    const getGradient = (subname) => {
        // console.log(subname, 'subname');
        switch (subname) {
            case courses[0]?.subname:
                return 'linear-gradient(to right, #2196F3, #00BCD4)';
            case courses[1]?.subname:
                return 'linear-gradient(to right, #FF9800, #FFC107)';
            case courses[2]?.subname:
                return 'linear-gradient(to right, #E91E63, #9C27B0)';
            case courses[3]?.subname:
                return 'linear-gradient(to right, #4CAF50, #8BC34A)';
            case courses[4]?.subname:
                return 'linear-gradient(to right, #673AB7, #3F51B5)';
            case 'Lunch':
                return 'grey'; // Lunch slot color
            case 'Free':
                return 'linear-gradient(to right, white, white)'; // Lunch slot color
            default:
                return 'none';
        }
    };

    return (
        <div ref={componentRef}>
            <Grid sx={{ paddingTop: 2, paddingBottom: 2 }}>
                <h2>Batch {batchNumber} Weekly Schedule</h2>
            </Grid>
            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ border: '1px solid black', backgroundColor: 'black', color: 'white', textAlign: 'center' }}>Days</TableCell>
                            {timeSlots.map(slot => (
                                <TableCell key={slot} style={{ border: '1px solid black', backgroundColor: 'black', color: 'white', textAlign: 'center' }}>{slot}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {daysOfWeek.map(day => (
                            <TableRow key={day}>
                                <TableCell style={{ border: '1px solid black', backgroundColor: 'black', color: 'white', textAlign: 'center' }}>{day}</TableCell>
                                {timeSlots.map(slot => (
                                    <TableCell key={`${day}-${slot}`} style={{ border: '1px solid black', background: getGradient(timetable[day][slot][0].subname) }}>
                                        {timetable[day][slot].map((course, index) => {
                                            // console.log("Course:", course); // Logging the course object
                                            return (
                                                <div key={index}>
                                                    <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 19 }}>{course.subname}</Typography>
                                                    <Typography sx={{ textAlign: 'center' }}>{course?.teacher}</Typography>
                                                </div>
                                            );
                                        })}

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

function App() {
    const [batchNumber, setBatchNumber] = useState(1);
    const [timetables, setTimetables] = useState([]);
    const componentRef = useRef();
    const { selectedProgramme, programmes,batchDetail ,academicYear} = useContext(AuthContext)
    const courses = selectedProgramme?.courses;
    console.log(academicYear, 'academicYear');

    const [teachers, setTeachers] = useState([]); // Define the teachers state variable

    // Fetch the list of teachers from the backend when the component mounts
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/teacher/allteacher'); // Adjust the API endpoint as per your backend route
                setTeachers(response.data.teacher); // Set the fetched teachers in state
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };
        fetchTeachers(); // Call the fetchTeachers function
    }, []);



    const calculateTeacherCredits = (timetable) => {
        const teacherCredits = {};
        daysOfWeek.forEach(day => {
            timeSlots.forEach(slot => {
                const course = timetable[day][slot][0];
                console.log("Course:", course); // Check course data
                if (course?.subname !== '--') {
                    const { teacher, credits } = course;
                    console.log("Teacher:", teacher, "Credits:", credits); // Check teacher and credits
                    teacherCredits[teacher] = (teacherCredits[teacher] || 0) + credits;
                }
            });
        });
        console.log("Teacher Credits:", teacherCredits); // Check the final teacherCredits object
        return teacherCredits;
    };


    const handleGenerate = () => {
        const generatedTimetables = [];
        for (let i = 0; i < batchNumber; i++) {
            generatedTimetables.push(generateTimetable(courses, daysOfWeek, timeSlots));
        }
        setTimetables(generatedTimetables);
        console.log(generatedTimetables,'generatedTimetables');
    };

    const handleSave = async (batchIndex, timetable) => {
        const batchName = `Batch ${batchIndex + 1}`;
        if (window.confirm(`Do you want to save the timetable for ${batchName}?`)) {
            console.log(`Timetable details for ${batchName}:`, timetable);

            // Assuming selectedProgramme contains the program details including courses
            const teacherIds = [...new Set(selectedProgramme.courses.map(course => course.teacherId))];
            console.log('Teacher IDs associated with the selected program:', teacherIds);

            // Save the timetable
            const saveResponse = await axios.post('http://localhost:3000/api/admin/timetable/add', {
                programName: selectedProgramme?.name,
                batchName: batchName,
                batchName: batchName,
                academicYear: academicYear,
                timetable: timetable,
                teachers: teacherIds // Assuming teacherIds is an array of teacher IDs you want to pass

            });
            console.log('Timetable saved successfully:', saveResponse.data?.message);
            alert('Timetable saved successfully ')

            // Calculate teacher credits based on the timetable
            const teacherCredits = calculateTeacherCredits(timetable);
            console.log(teacherCredits, 'teacherCredits');

            // Extract teacher credits from the programmes state
            const teacherCreditsFromProgrammes = {};
            programmes.forEach(programme => {
                programme.courses.forEach(course => {
                    const { teacher, credits } = course;
                    if (!teacherCreditsFromProgrammes[teacher]) {
                        teacherCreditsFromProgrammes[teacher] = 0;
                    }
                    teacherCreditsFromProgrammes[teacher] += credits;
                });
            });

            // Update each teacher's credit in the teachers state based on the retrieved credits
            const updatedTeachers = teachers.map(teacher => {
                const credits = teacherCreditsFromProgrammes[teacher.name] || 0;
                return { ...teacher, credits };
            });

            console.log(updatedTeachers, 'updatedTeachers');


            const updateRequests = await updatedTeachers?.map(teacher => (
                axios.put(`http://localhost:3000/api/teacher/singleTeacher/${teacher._id}`, { credits: teacher.credits })
                    .then(response => response.data)
            ));

            // Log the updated teachers from the backend
            const updatedTeachersBackend = await Promise.all(updateRequests);
            console.log("Updated Teachers from Backend:", updatedTeachersBackend);
            // Optionally, make an API call to update the credits on the backend
            // updateTeacherCredits(updatedTeachers);

        }
    };




    const handleShuffle = () => {
        // const shuffledTimetables = [...timetables].sort(() => Math.random() - 0.5);
        // setTimetables(shuffledTimetables);
        handleGenerate()
    };


    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });


    return (
        <div >
            <Grid style={{ alignContent: 'center', display: 'flex', gap: "12px" }}>

                <TextField
                    label="Number of Batches"
                    type="number"
                    value={batchNumber}
                    onChange={(e) => setBatchNumber(e.target.value)}
                // style={{ marginBottom: '10px' }}
                />
                <Button variant="outlined" onClick={handleGenerate}>Generate Timetables</Button>
                <Button variant="outlined" onClick={handleShuffle} style={{ marginLeft: '10px' }}>Shuffle Timetables</Button>
            </Grid>

            {timetables.map((timetable, index) => (
                <div key={index} style={{ marginTop: '20px', gap: "30px" }}>
                    <Timetable timetable={timetable} componentRef={componentRef} courses={courses} batchNumber={index + 1} />
                    <Grid style={{ alignContent: 'center', justifyContent: 'right', display: 'flex', gap: "12px", marginTop: "30px" }}>

                        <Button variant="outlined" onClick={() => handleSave(index, timetable)} style={{ marginTop: '10px' }}>Save Timetable</Button>
                        <Button variant="outlined" onClick={handlePrint} style={{ marginTop: '10px' }}>Print Timetable</Button>
                    </Grid>

                </div>
            ))}
        </div>
    );
}

export default App;
