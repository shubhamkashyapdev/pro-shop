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

// @desc     Get order by ID
// @req      GET /api/orders/:id
// @access   private
export const getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (order) {
    res.status(200).json({
      success: true,
      status: 200,
      order,
    });
  } else {
    res.status(404);
    throw new Error(`Order Not Found!!`);
  }
});

// @desc     Updte order to paid
// @req      PUT /api/orders/:id/pay
// @access   private
export const updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.status(200).json({
      success: true,
      status: 200,
      order: updatedOrder,
    });
  } else {
    res.status(404);
    throw new Error(`Order Not Found!!`);
  }
});
