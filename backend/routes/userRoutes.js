import express from 'express';
import {
  authUser,
  getProfile,
  addUser,
  updateProfile,
} from '../controllers/userController.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(addUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getProfile).put(protect, updateProfile);
export default router;
