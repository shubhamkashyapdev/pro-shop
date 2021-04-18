import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';

// @desc     Create new order
// @req      POST /api/orders
// @access   private
export const addOrderItems = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No Order Items');
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user.id,
    });

    const createdOrder = await order.save();
    res.status(201).json({
      success: true,
      createdOrder,
    });
  }
});
