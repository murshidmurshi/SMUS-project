const mongoose = require('mongoose');
const { Schema } = mongoose;
// Define Timetable schema
const TimetableSchema = new Schema({
    programName: String,
    batchName: String,
    academicYear: String,
    timetable: Object,
    savedAt: {
        type: Date,
        default: Date.now
    },
    // Add a field to store all teacher IDs associated with this timetable
    teachers: [String] // Array of teacher IDs directly stored as strings

});
module.exports = mongoose.model('timetable', TimetableSchema);
