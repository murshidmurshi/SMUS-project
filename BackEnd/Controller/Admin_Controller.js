const AdminRegisterSchema = require("../Model/Admin/AdminRegisterSchema");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Programs = require("../Model/Admin/Programs");
const Courses = require("../Model/Admin/Courses");
const Timetable = require("../Model/Admin/Timetable");
let JWT_SECRET = 'hello'


const Register = async (req, res) => {
  try {
    const { admin_id, password, } = req.body;
    let register = await AdminRegisterSchema.findOne({ admin_id: admin_id });
    if (register) {
      return res.json({ success: false, message: 'Admin_id Already Exists' })
    }

    let salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(password, salt)
    register = new AdminRegisterSchema({ admin_id: admin_id, password: secPass })
    let savedRegister = await register.save();

    res.json({ success: true, savedRegister })

  }
  catch (err) {
    console.log('Error is:', err)
  }
}

const Login = async (req, res) => {
  try {
    const { admin_id, password, } = req.body;
    let main = await AdminRegisterSchema.findOne({ admin_id: admin_id });
    if (!main) {
      return res.json({ success: false, message: 'Incorrect Admin_id' })
    }

    const ComparePassword = await bcrypt.compare(password, main.password)
    if (!ComparePassword) {
      return res.json({ success: false, message: 'Incorrect Password' })
    }

    let data = {
      main: {
        id: main.id
      }
    }
    const authToken = await jwt.sign(data, JWT_SECRET)
    res.json({ success: true, authToken })
  }
  catch (err) {
    console.log(err)
    res.json({ success: false, message: 'Internal Server Error' })
  }

}


const AddProgramm = async (req, res) => {
  try {
    const programData = req.body; // Assuming you're using body-parser middleware to parse JSON
    console.log(programData, "background");

    // Check if a program with the same name already exists
    const existingProgram = await Programs.findOne({ name: programData.name });

    if (existingProgram) {
      console.log('Program with the same name already exists:', existingProgram);
      return res.status(400).json({ success: false, error: 'Program with the same name already exists' });
    }

    // Create a new program instance using the programData
    const newProgram = new Programs(programData);

    // Save the new program to the database
    await newProgram.save();

    console.log('New program added successfully:', newProgram);
    return res.status(200).json({ success: true, program: newProgram });
  } catch (error) {
    console.error('Error adding new program:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}


const getAllPrograms = async (req, res) => {
  try {
    // Retrieve all programs from the database
    const programs = await Programs.find();
    return res.status(200).json({ success: true, programs });
  } catch (error) {
    console.error('Error retrieving programs:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

const UpdateCourse = async (req, res) => {
  try {
    const programId = req.params.id;
    const { subname } = req.body;

    console.log(programId, 'subname', subname);

    // Find the program by ID
    const program = await Programs.findById(programId);

    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }

    // Add the new course to the program
    program.courses.push({ subname });

    // Save the updated program
    const updatedProgram = await program.save();

    // Return the newly added course
    res.status(201).json({ course: updatedProgram.courses[updatedProgram.courses.length - 1] });
  } catch (error) {
    console.error('Error adding new course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const RemoveCourse = async (req, res) => {
  try {
    const { programId, courseId } = req.params;
    console.log(programId, courseId, 'programId, courseId ');

    // Find the program by ID
    const program = await Programs.findById(programId);

    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }

    // Remove the course from the program's courses array
    const updatedCourses = program.courses.filter(course => course._id.toString() !== courseId);

    // Update the program's courses array with the filtered courses
    program.courses = updatedCourses;

    // Save the updated program
    const updatedProgram = await program.save();

    // Return the updated program with the course removed
    res.status(200).json({ program: updatedProgram });
  } catch (error) {
    console.error('Error removing course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const DeleteProgram = async (req, res) => {
  const programId = req.params.id;

  console.log(programId, 'programId');

  try {
    // Logic to remove the program from the database
    const deletedProgram = await Programs.findByIdAndDelete(programId);

    if (!deletedProgram) {
      return res.status(404).json({ error: 'Program not found' });
    }

    return res.status(200).json({ message: 'Program deleted successfully', deletedProgram });
  } catch (error) {
    console.error('Error deleting program:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


const AddTimetable = async (req, res) => {
  try {
    const { programName, batchName, timetable,teachers,academicYear } = req.body;
    // console.log(teachers,'teachers');
    const newTimetable = new Timetable({ programName, batchName, timetable ,teachers,academicYear});
    await newTimetable.save();
    res.status(200).json({success: true, message: 'Timetable saved successfully' });

  } catch (error) {
    console.error('Error saving timetable:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

}
const GetAllTimetable = async (req, res) => {
  try {
    const timetables = await Timetable.find(); // Fetch all timetables and sort them by savedAt date in descending order
  // console.log(timetables,'timetables');
  
    res.status(200).json({success: true,timetables:timetables });

  } catch (error) {
    console.error('Error retrieving timetables:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

}

const DeleteTimetable = async (req, res) => {
  const  id  = req.params.id; // Extract the timetable ID from the request parameters
  console.log(id,'id');
  try {
    // Find the timetable by ID and delete it
    const deletedTimetable = await Timetable.findByIdAndDelete(id);
    
    if (!deletedTimetable) {
      // If the timetable with the provided ID is not found, return a 404 response
      return res.status(404).json({ error: 'Timetable not found' });
    }

    res.status(200).json({ success: true, message: 'Timetable deleted successfully' });
  } catch (error) {
    console.error('Error deleting timetable:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { Register, Login, AddProgramm, getAllPrograms, UpdateCourse, RemoveCourse, DeleteProgram, AddTimetable, GetAllTimetable ,DeleteTimetable}
