import express from 'express';
import { getUsers, searchUsers, getConnections, connectUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getUsers);
router.get('/search', protect, searchUsers);
router.get('/connections', protect, getConnections);
router.post('/connect/:id', protect, connectUser);
router.get('/profile/:id', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

export default router;
