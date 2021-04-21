import express from 'express';
import { protect } from '../middleware/auth.js';

import {
  addOrderItems,
  getOrderById,
} from '../controllers/orderControllers.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);

export default router;
