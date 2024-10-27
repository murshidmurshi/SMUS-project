const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentProfileSchema = new Schema({
    student_id: {
        type: Number,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    phone: {
        type: String,
        // required: true
    },
    programme: {
        type: String,
        // required: true
    },
    batch: {
        type: String,
        // required: true
    }
    
});

module.exports = mongoose.model('student-profile', StudentProfileSchema);