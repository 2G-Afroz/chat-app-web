import express from 'express';
import {
	registerUser,
	loginUser,
	getUserProfile,
	getAllUserProfile,
} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/find/:userId', getUserProfile);
router.get('/find', getAllUserProfile);

export default router;