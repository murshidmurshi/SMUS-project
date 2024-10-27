const express = require('express')
const {Register,Login,TeacherProfileSchema,getUserIdFromToken,AllTeacher,DeleteTeacher,AddTeacher,SingleTeacher} = require('../Controller/Teacher_Controller')
const router = express.Router()

router.get("/userid",getUserIdFromToken)
router.get("/allteacher",AllTeacher)

router.post("/register",Register)
router.post("/login",Login)

router.post("/teacher-profile",TeacherProfileSchema) //Update the teacher profile

router.delete("/delete/:id",DeleteTeacher)    
router.post("/add",AddTeacher)    
router.put("/singleTeacher/:id",SingleTeacher)    




module.exports=router