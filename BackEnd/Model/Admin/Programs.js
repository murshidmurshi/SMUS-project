const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProgramSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  courses: [
    {
      subname: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model('Programs', ProgramSchema);
