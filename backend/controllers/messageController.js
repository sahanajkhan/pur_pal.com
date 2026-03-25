import Message from '../models/Message.js';

// @desc    Send a message
// @route   POST /api/messages/:id
// @access  Private
export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!text) {
      return res.status(400).json({ success: false, message: 'Message text is required' });
    }

    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      text
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      data: newMessage
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get messages between two users
// @route   GET /api/messages/:id
// @access  Private
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: userToChatId },
        { sender: userToChatId, receiver: senderId }
      ]
    }).sort({ createdAt: 1 }); // Sort by creation time (ascending)

    res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
