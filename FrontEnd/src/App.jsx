import React from 'react';
import Register from './Authentication/Register/Register';
import Login from './Authentication/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminHome from './AdminComponent/AdminHome';
import TeacherHome from './TeacherComponent/TeacherHome';
import StudentHome from './StudentComponent/StudentHome';
import { AuthProvider } from '../AuthContext';
import TimetablePage from './ViewTimeTable';
import CreateTeacherProfile from './TeacherComponent/CreateTeacherProfile';
import TeacherProfile from './TeacherComponent/TeacherProfile';
import CreateStudentProfile from './StudentComponent/CreateStudentsProfile'; // Updated import
import StudentProfile from './StudentComponent/StudentProfile'; // Updated import
import TimetableList from './TeacherComponent/Timetable'; // Updated import
import SingleBatchTimeTable from './AdminComponent/Dashtabs/SingleBatchTimeTable';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />

          {/* Admin */}
          <Route path='/adminhome' element={<AdminHome />} />

          {/* Teacher */}
          <Route path='/teacherhome' element={<TeacherHome />} />
          <Route path='/teacherhome/createProfile' element={<CreateTeacherProfile />} />
          <Route path='/teacherhome/profile' element={<TeacherProfile />} />
          <Route path='/teacherhome/timetablelist' element={<TimetableList />} />

          {/* Student */}
          <Route path='/studenthome' element={<StudentHome />} />
          <Route path='/studenthome/createProfile' element={<CreateStudentProfile />} /> {/* Updated route */}
          <Route path='/studenthome/profile' element={<StudentProfile />} /> {/* Updated route */}
          <Route path='/timetable' element={<TimetablePage />} />
          <Route path='/batch' element={<SingleBatchTimeTable />} />

          {/* Default Route - Add this if needed */}
          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;