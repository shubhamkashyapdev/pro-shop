import express from 'express';
import { protect } from '../middleware/auth.js';

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderControllers.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
