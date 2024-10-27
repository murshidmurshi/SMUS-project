
const express = require('express');
const { Register,Login,getUserIdFromToken, AllStudent, updateStudentProfile, getAllPrograms,AddStudent ,DeleteStudent} = require('../Controller/Student_Controller');
const router = express.Router();

// Route for student registration
router.post("/register",Register)

// Route for student login
router.post("/login",Login)

router.get("/userid",getUserIdFromToken)

router.post("/student-profile",updateStudentProfile) //Update the teacher profile
router.post("/add",AddStudent)    

router.get("/programmes", getAllPrograms);

router.delete("/delete/:id",DeleteStudent);    


router.get("/allstudent",AllStudent);






// // Route for fetching user details by user ID
// router.get("/user/:userId", authorize, getUserDetails);

// // Route for updating student profile by user ID
// router.put("/profile/:userId", authorize, updateStudentProfile);

// // Route for fetching all programmes
// router.get("/programmes", getProgrammes);

// // Route for fetching batches by programme ID
// router.get("/batches/:programmeId", getBatchesByProgrammeId);

module.exports = router;