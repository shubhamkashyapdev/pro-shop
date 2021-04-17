import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

// data //
import users from './data/users.js';
import products from './data/products.js';

// models //
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

import connectDB from './config/db.js';
dotenv.config();
connectDB();

const importData = async () => {
  try {
    // clear database //
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    // import users //
    const createdUsers = await User.insertMany(users);
    // in our data file first user is an admin
    const adminUser = createdUsers[0]._id;
    // push adminUser in user field for products
    const sampleProducts = products.map((prod) => {
      return { ...prod, user: adminUser };
    });
    await Product.insertMany(sampleProducts);

    console.log(`Data Imported!!`.green.inverse);
    process.exit(1);
  } catch (err) {
    console.error(`${err.message}`.red.inverse);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    // clear database //
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();
    console.log(`Data Destroyed!!`.red.inverse);
    process.exit(1);
  } catch (err) {
    console.error(`${err.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  destroyData();
}
