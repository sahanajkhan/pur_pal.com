import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  branch: {
    type: String,
    trim: true,
    default: ''
  },
  goal: {
    type: String,
    trim: true,
    default: ''
  },
  futurePlan: {
    type: String,
    trim: true,
    default: ''
  },
  academicResults: {
    type: String,
    trim: true,
    default: ''
  },
  interests: {
    type: String,
    trim: true,
    default: ''
  },
  linkedinProfile: {
    type: String,
    trim: true,
    default: ''
  },
  connections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
export default Student;
