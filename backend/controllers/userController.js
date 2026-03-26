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

// @desc    Search users by email or phone number
// @route   GET /api/users/search
// @access  Private
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ success: false, message: 'Please provide a search query' });
    }

    const searchQuery = {
      _id: { $ne: req.user._id },
      $or: [
        { email: { $regex: query, $options: 'i' } },
        { phoneNumber: { $regex: query, $options: 'i' } }
      ]
    };

    const users = await Student.find(searchQuery).select('-password');
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user connections
// @route   GET /api/users/connections
// @access  Private
export const getConnections = async (req, res) => {
  try {
    const user = await Student.findById(req.user._id).populate('connections', 'name email phoneNumber profilePic');
    res.status(200).json({ success: true, data: user.connections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Connect with a user
// @route   POST /api/users/connect/:id
// @access  Private
export const connectUser = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.user._id;

    if (targetUserId === currentUserId.toString()) {
      return res.status(400).json({ success: false, message: "You cannot connect with yourself" });
    }

    // Find the target user
    const targetUser = await Student.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Find current user
    const currentUser = await Student.findById(currentUserId);

    // Check if already connected
    if (currentUser.connections.includes(targetUserId)) {
      return res.status(400).json({ success: false, message: "Already connected with this user" });
    }

    // Add connection bidirectionally
    currentUser.connections.push(targetUserId);
    targetUser.connections.push(currentUserId);

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({ success: true, message: "Connected successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile/:id
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    let userId = req.params.id;
    if (userId === 'me') {
      userId = req.user._id;
    }
    
    const user = await Student.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await Student.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
      user.branch = req.body.branch || user.branch;
      user.goal = req.body.goal || user.goal;
      user.futurePlan = req.body.futurePlan || user.futurePlan;
      user.academicResults = req.body.academicResults || user.academicResults;
      user.interests = req.body.interests || user.interests;
      user.linkedinProfile = req.body.linkedinProfile || user.linkedinProfile;

      const updatedUser = await user.save();

      res.status(200).json({
        success: true,
        data: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          phoneNumber: updatedUser.phoneNumber,
          branch: updatedUser.branch,
          goal: updatedUser.goal,
          futurePlan: updatedUser.futurePlan,
          academicResults: updatedUser.academicResults,
          interests: updatedUser.interests,
          linkedinProfile: updatedUser.linkedinProfile
        }
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
