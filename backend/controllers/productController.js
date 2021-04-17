import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

// @desc     fetch all products
// @req      GET /api/products
// @access   public
export const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  res.json({
    successs: true,
    count: products.length,
    data: products,
  });
});

// @desc     fetch single product
// @req      GET /api/products/:id
// @access   public

export const getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json({
      success: true,
      data: product,
    });
  } else {
    res.status(404);
    throw new Error('Product Not Found');
  }
});
