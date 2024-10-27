import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Step 1: Create a context
export const AuthContext = createContext();

// Step 2: Create a Provider component to provide the context value
export const AuthProvider = ({ children }) => {
  const [programmes, setProgrammes] = useState([]);
  const [selectedProgramme, setSelectedProgramme] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseCredits, setCourseCredits] = useState({});
  const [batchDetail, setBatchDetail] = useState({});
  const [academicYear, setAcademicYear] = useState('');



  
  useEffect(() => {
    // Fetch programs from the API
    axios.get('http://localhost:3000/api/admin/allprograms')
      .then(response => {
        // Log response data
        console.log('Response Data:', response.data);
        // Set programmes state with fetched data
        setProgrammes(response.data.programs);

        // Set selected programme to the first one by default
        setSelectedProgramme(response.data.programs[0]);

        // Set loading state to false to indicate data fetching is complete
        setLoading(false);
      })
      .catch(error => {
        // Log error
        console.error('Error fetching programs:', error);

        // Set error state with error message
        setError(error.message);

        // Set loading state to false even if there's an error
        setLoading(false);
      });
  }, []); // Empty dependency array ensures that this effect runs only once after the component mounts



  

  return (
    <AuthContext.Provider value={{ 
      programmes, setProgrammes,
      selectedProgramme, setSelectedProgramme,
      courseCredits, setCourseCredits,
      batchDetail, setBatchDetail,
      academicYear, setAcademicYear
    }}>
      {children}
    </AuthContext.Provider>
  );
};
