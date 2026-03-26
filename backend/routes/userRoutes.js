import express from 'express';
import { getUsers, searchUsers, getConnections, connectUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getUsers);
router.get('/search', protect, searchUsers);
router.get('/connections', protect, getConnections);
router.post('/connect/:id', protect, connectUser);

export default router;
