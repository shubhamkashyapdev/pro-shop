import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';

// @desc     Auth user & get token
// @req      POST /api/users/login
// @access   public
export const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Credentails');
  }
});

// @desc     Get active user's profile
// @req      GET /api/users/profile
// @access   private
export const getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User Not Found');
  }
  res.status(200).json({
    success: true,
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// @desc     Add new user
// @req      POST /api/users/login
// @access   public
export const addUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error('User Already Exists');
  }

  user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
});

// @desc     Update active user's profile
// @req      PUT /api/users/profile
// @access   private
export const updateProfile = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findById(req.user.id);
  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser.id),
    });
  } else {
    res.status(401);
    throw new Error('User Not Found');
  }
});
