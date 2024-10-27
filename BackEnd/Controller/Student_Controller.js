const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const StudentProfileSchema = require('../Model/Student/StudentProfileSchema');
const Programs = require('../Model/Admin/Programs');
let JWT_SECRET = 'hello'

const Register = async (req, res) => {
    try {
        const { student_id, password, } = req.body;
        let register = await StudentProfileSchema.findOne({ student_id: student_id });
        if (register) {
            return res.json({ success: false, message: 'Student_id Already Exists' })
        }
        let salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(password, salt)
        register = new StudentProfileSchema({student_id:student_id, password:secPass})
        let savedRegister = await register.save();

        res.json({ success: true, savedRegister })

    }
    catch (err) {
        console.log('Error is:', err)
    }
}

const Login = async (req, res) => {
    try {
        const { student_id, password, } = req.body;
        console.log(req.body,'req.body');
        let main = await StudentProfileSchema.findOne({ student_id: student_id });
        if (!main) {
            return res.json({ success: false, message: 'Incorrect Student_id' })
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

const getUserIdFromToken = async (req, res) => {
    try {
        const token = req.headers.authorization; // Assuming token is passed in the Authorization header
        console.log(token,"StudentToken");

        // Verify the token and extract user ID
        const decoded = jwt.verify(token, JWT_SECRET);
        // Extract user ID from decoded token
        const userId = decoded?.main?.id; // Assuming user ID is stored in the token's payload as 'id'
        const student = await StudentProfileSchema.findById(userId);
        console.log(student, 'studentstudentstudent');
        if (!student) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        res.json({ studentDetail: student, mongoId: userId });

        console.log(userId);
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: 'Invalid token' });
    }
};

const updateStudentProfile = async (req, res) => {
    try {
        const profileData = req.body; // Assuming you're using body-parser middleware to parse JSON
        // Find the existing teacher profile by ID
        const existingStudent = await StudentProfileSchema.findById(profileData.frommongo);

        if (!existingStudent) {
            return res.status(404).json({ error: 'Teacher profile not found' });
        }

        // Update the existing teacher profile with the new data
        existingStudent.set(profileData); // This will update only the fields present in profileData

        // Save the changes
        await existingStudent.save();
        return res.status(200).json({ success: true, student: existingStudent });
    } catch (error) {
        console.error('Error updating student profile:', error);
        return res.status(500).json({ error: 'Internal server error' });
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


  const AllStudent = async (req, res) => {
    try {
        const student = await StudentProfileSchema.find();
        return res.status(200).json({ success: true, student: student });
    } catch (error) {
        console.error('Error updating teacher profile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const AddStudent = async (req, res) => {
    try {
        const studentData = req.body; // Assuming you're using body-parser middleware to parse JSON

        console.log(studentData,'studentDatastudentDatastudentDatastudentData');
        // Check if the teacher with the same ID already exists
        const existingStudent = await StudentProfileSchema.findOne({ student_id: studentData?.student_id });

        console.log(studentData?.student_id, 'studentData?.student_id');
        if (existingStudent) {
            console.log('Student with the same ID already exists:', existingStudent);

            return res.status(400).json({ success: false, error: 'Student with the same ID already exists' });

        }
        // Salt and hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(studentData?.password, saltRounds);
        // Create a new teacher instance using the studentData
        const newStudent = new StudentProfileSchema({ ...studentData, password: hashedPassword });

        // Save the new teacher to the database
        await newStudent.save();

        console.log('New Student added successfully:', newStudent);
        return res.status(200).json({ success: true, student: newStudent });
    } catch (error) {
        console.error('Error adding new student:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
}
  

const DeleteStudent = async (req, res) => {
    const Student_id = req.params.id;

    console.log(Student_id, 6565656);
    try {
        // Find the teacher by ID and delete it
        const deleteStudent = await StudentProfileSchema.findByIdAndDelete(Student_id);
        console.log(deleteStudent,'deleteStudent');

        if (!deleteStudent) {
            // If the teacher with the given ID doesn't exist, send a 404 Not Found response
            return res.status(404).json({ error: 'Student not found' });
        }

        // If the teacher is successfully deleted, send a success response
        res.json({ message: 'Student deleted successfully', deleteStudent });

    } catch (error) {
        console.error('Error updating teacher profile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports={Register,Login,getUserIdFromToken,updateStudentProfile,getAllPrograms,AllStudent,AddStudent,DeleteStudent}