import Student from '../models/Student.js';

// @desc    Get all users (except logged in user)
// @route   GET /api/users
// @access  Private
export const getUsers = async (req, res) => {
  try {
    const users = await Student.find({ _id: { $ne: req.user._id } }).select('-password');
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
