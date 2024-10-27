const mongoose = require('mongoose');
const { Schema } = mongoose;

const TeacherProfileSchema = new Schema({
  teacher_id: {
      type: String,
      // required: true
  },
  name: {
      type: String,
      // required: true
  },
  email: String,
  phone: String,
  courses: [String],
  password: {
      type: String,
      // required: true
  },
  credits: {
      type: Number,
      default: 0 // Default value for credits
  }
});

module.exports = mongoose.model('teacher-profile', TeacherProfileSchema);
