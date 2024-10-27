const express = require('express')
const {Register,Login,AddProgramm,getAllPrograms,UpdateCourse,RemoveCourse,DeleteProgram,AddTimetable,GetAllTimetable,DeleteTimetable} = require('../Controller/Admin_Controller')
const router = express.Router()

router.get("/allprograms",getAllPrograms)
router.post("/register",Register)

router.post("/login",Login)

router.post("/addprogramm",AddProgramm)
router.post("/addcourse/:id",UpdateCourse)
// router.post("/course/add/",AddNewCourse)
router.delete("/removecourse/:programId/:courseId",RemoveCourse)
router.delete("/program/delete/:id",DeleteProgram)

router.get("/timetable",GetAllTimetable)
router.post("/timetable/add",AddTimetable)
router.delete("/timetable/:id",DeleteTimetable)





module.exports=router