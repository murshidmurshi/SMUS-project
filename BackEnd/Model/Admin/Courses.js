const mongoose = require('mongoose');
const { Schema } = mongoose;

const CoursesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true // Ensures uniqueness of course names
  }
});

module.exports = mongoose.model('course', CoursesSchema);
