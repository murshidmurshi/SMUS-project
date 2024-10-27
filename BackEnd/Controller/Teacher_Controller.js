
const Teacher = require('../Model/Teacher/TeacherSchema');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Timetable = require('../Model/Admin/Timetable');
let JWT_SECRET = 'hello'



const Register = async (req, res) => {
    try {
        const { teacher_id, password, } = req.body;
        console.log(teacher_id, password);
        let register = await Teacher.findOne({ teacher_id: teacher_id });
        if (register) {
            return res.json({ success: false, message: 'Teacher_id Already Exists' })
        }

        let salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(password, salt)
        register = new Teacher({ teacher_id: teacher_id, password: secPass })
        let savedRegister = await register.save();

        res.json({ success: true, savedRegister })

    }
    catch (err) {
        console.log('Error is:', err)
    }
}

const Login = async (req, res) => {
    try {
        const { teacher_id, password, } = req.body;
        let main = await Teacher.findOne({ teacher_id: teacher_id });
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
        console.log(data, 5555555);
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
        console.log(token);
        // Verify the token and extract user ID
        const decoded = jwt.verify(token, JWT_SECRET);
        // Extract user ID from decoded token
        const userId = decoded?.main?.id; // Assuming user ID is stored in the token's payload as 'id'
        const teacher = await Teacher.findById(userId);
        // console.log(teacher, 'teacher');
        let TeacherId = teacher?._id
        const timetableDocuments = await Timetable.find();


        // Function to find and return the timetable document for the providedTeacherId
        function findTimetableForTeacher(timetableDocuments, TeacherId) {
            for (const doc of timetableDocuments) {
                if (doc.teachers.includes(TeacherId)) {
                    return doc; // Return the timetable document if the teacherId is found
                }
            }
            return null; // Return null if the teacherId is not found in any timetable document
        }

        // Find and return the timetable document for the provided Teacher ID
        const timetableForTeacher = findTimetableForTeacher(timetableDocuments, TeacherId);

        console.log(timetableForTeacher,'timetableForTeacher');

        // // Check if the timetable for the provided Teacher ID is found
        // if (timetableForTeacher) {
        //     console.log("Timetable found for the provided Teacher ID:");
        //     // console.log(timetableForTeacher);
        // } else {
        //     console.log("No timetable found for the provided Teacher ID.");
        // }
        
        // console.log(TeacherId, "TeacherId");

        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        res.json({ teacherDetail: teacher, mongoId: userId,timeTable:timetableForTeacher });

        console.log(userId);
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: 'Invalid token' });
    }
};

const TeacherProfileSchema = async (req, res) => {
    try {
        const profileData = req.body; // Assuming you're using body-parser middleware to parse JSON

        // Find the existing teacher profile by ID
        const existingTeacher = await Teacher.findById(profileData.frommongo);

        if (!existingTeacher) {
            return res.status(404).json({ error: 'Teacher profile not found' });
        }

        // Update the existing teacher profile with the new data
        existingTeacher.set(profileData); // This will update only the fields present in profileData

        // Save the changes
        await existingTeacher.save();

        console.log('Teacher profile updated successfully:', existingTeacher);
        return res.status(200).json({ success: true, teacher: existingTeacher });
    } catch (error) {
        console.error('Error updating teacher profile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
const AddTeacher = async (req, res) => {
    try {
        const teacherData = req.body; // Assuming you're using body-parser middleware to parse JSON
        // Check if the teacher with the same ID already exists
        const existingTeacher = await Teacher.findOne({ teacher_id: teacherData?.teacher_id });


        // console.log(teacherData?.teacher_id, 'teacherData?.teacher_id ');
        if (existingTeacher) {
            console.log('Teacher with the same ID already exists:', existingTeacher);
            return res.status(400).json({ success: false, error: 'Teacher with the same ID already exists' });
        }


        // Salt and hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(teacherData?.password, saltRounds);
        // Create a new teacher instance using the teacherData
        const newTeacher = new Teacher({ ...teacherData, password: hashedPassword });

        // Save the new teacher to the database
        await newTeacher.save();

        console.log('New teacher added successfully:', newTeacher);
        return res.status(200).json({ success: true, teacher: newTeacher });
    } catch (error) {
        console.error('Error adding new teacher:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
}


const AllTeacher = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        return res.status(200).json({ success: true, teacher: teachers });
    } catch (error) {
        console.error('Error updating teacher profile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const DeleteTeacher = async (req, res) => {
    const teacherId = req.params.id;

    console.log(teacherId, 6565656);
    try {
        // Find the teacher by ID and delete it
        const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);

        if (!deletedTeacher) {
            // If the teacher with the given ID doesn't exist, send a 404 Not Found response
            return res.status(404).json({ error: 'Teacher not found' });
        }

        // If the teacher is successfully deleted, send a success response
        res.json({ message: 'Teacher deleted successfully', deletedTeacher });

    } catch (error) {
        console.error('Error updating teacher profile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const SingleTeacher = async (req, res) => {
    const teacherId = req.params.id;
    const updatedCredits = req.body.credits;

    console.log(teacherId, updatedCredits);

    try {
        // Find the teacher by ID
        let updatedTeacher = await Teacher.findById(teacherId);

        if (!updatedTeacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        // If the teacher document does not have a "credits" field, create it
        if (!updatedTeacher.credits) {
            updatedTeacher.credits = updatedCredits;
        } else {
            // If "credits" field exists, update it
            updatedTeacher.credits += updatedCredits;
        }

        // Save the updated teacher object
        updatedTeacher = await updatedTeacher.save();

        // Respond with the updated teacher object
        return res.status(200).json(updatedTeacher);
    } catch (error) {
        console.error('Error updating teacher:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}





module.exports = { Register, Login, TeacherProfileSchema, getUserIdFromToken, AllTeacher, DeleteTeacher, AddTeacher, SingleTeacher }