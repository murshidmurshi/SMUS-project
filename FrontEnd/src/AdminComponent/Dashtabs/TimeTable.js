// import React from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// const CourseSchedule = ({ selectedProgramme, courses, daysOfWeek }) => {
//   // Generate a shuffled schedule for each day of the week
//   const schedules = daysOfWeek.map(() => {
//     // Create an array to hold periods for the current day
//     const schedule = [];

//     // Shuffle the courses array to randomize course order
//     const shuffledCourses = courses.sort(() => Math.random() - 0.5);

//     // Keep track of credits remaining for each course
//     const creditsRemaining = shuffledCourses.reduce((acc, course) => {
//       acc[course.subname] = course.credits;
//       return acc;
//     }, {});

//     // Distribute courses one by one in a round-robin manner for the current day
//     let currentPeriod = 0;
//     let allCreditsUsed = false;
//     while (!allCreditsUsed && currentPeriod < 6) {
//       allCreditsUsed = true;

//       // Distribute courses with available credits
//       shuffledCourses.forEach(course => {
//         if (creditsRemaining[course.subname] > 0 && !schedule[currentPeriod]) {
//           schedule[currentPeriod] = course.subname;
//           creditsRemaining[course.subname]--;
//           allCreditsUsed = false;
//           currentPeriod++; // Move to the next period
//         }
//       });
//     }

//     // Fill remaining periods with "Free" if necessary
//     while (schedule.length < 6) {
//       schedule.push("Free");
//     }

//     // Shuffle the schedule for the current day
//     for (let i = schedule.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [schedule[i], schedule[j]] = [schedule[j], schedule[i]];
//     }

//     return schedule;
//   });

//   // Render the schedule
//   return (
//     <div>
//       <h2>Course Schedule for {selectedProgramme}</h2>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Day</TableCell>
//               {[...Array(6).keys()].map((period) => (
//                 <TableCell key={period}>Period {period + 1}</TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {daysOfWeek.map((day, dayIndex) => (
//               <TableRow key={dayIndex}>
//                 <TableCell>{day}</TableCell>
//                 {schedules[dayIndex].map((subject, periodIndex) => (
//                   <TableCell key={periodIndex}>{subject || "Free"}</TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// // Example usage
// const App = () => {
//   const selectedProgramme = "BCA";
//   const courses = [
//     { subname: 'AI', credits: 1 },
//     { subname: 'C++', credits: 0 },
//     { subname: 'Java', credits: 1 },
//     { subname: 'ML', credits: 1 }
//   ];
//   const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

//   return (
//     <div>
//       <CourseSchedule selectedProgramme={selectedProgramme} courses={courses} daysOfWeek={daysOfWeek} />
//     </div>
//   );
// };

// export default App;