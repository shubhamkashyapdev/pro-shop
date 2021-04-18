import express from 'express';
import { protect } from '../middleware/auth.js';

import { addOrderItems } from '../controllers/orderControllers.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);

export default router;
