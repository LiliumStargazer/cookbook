const User = require('../models/User');
const Recipe = require('../models/Recipe');
const Review = require('../models/Review');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateUserData = require('../utils/validateUser');
const validateUserUpdate = require('../utils/validateUserUpdate');

exports.register = async (req, res) => {
  const error = validateUserData(req.body);
  if (error) {
    console.error(error);
    return res.status(400).json({ error: 'BadRequest', message: 'Missing or invalid field' });
  }
  try {
    const { username, password, email, favoriteDishes } = req.body;

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: 'BadRequest', message: 'Username already in use' });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'BadRequest', message: 'Email already in use' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed, email, favoriteDishes });
    await user.save();
    res.status(201).send('User registered and cookbook created');
  } catch (err) {
    console.error('Error in register:', err);
    res
      .status(500)
      .json({ error: 'InternalServerError', message: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: 'BadRequest', message: 'Email and password are required' });
    }
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Unauthorized', message: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    const userWithoutPassword = {
      // Return user without password
      _id: user._id,
      username: user.username,
      email: user.email,
      favoriteDishes: user.favoriteDishes,
    };

    res.json({
      token,
      userData: userWithoutPassword,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'InternalServerError', message: 'Server error during login' });
  }
};

exports.updateUser = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: 'Unauthorized', message: 'User not authorized' });
  }
  const error = validateUserUpdate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ error: 'BadRequest', message: 'Email and password are required' });
  }
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.userId, updates, { new: true });
    if (!user) return res.status(400).json({ error: 'BadRequest', message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error in update', err);
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Server error during user update',
    });
  }
};

// memo: the auth.js middleware extracts the token before calling this function and recognizes the user.
exports.deleteUser = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: 'Unauthorized', message: 'User not authorized' });
  }

  try {
    // Check that the user exists before deleting
    const user = await User.findById(req.userId);
    if (!user) {
      console.error('User not found:', req.userId);
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    // Delete the user and all related data
    await Promise.all([
      User.findByIdAndDelete(req.userId),
      Recipe.deleteMany({ userId: req.userId }),
      Review.updateMany({ userId: req.userId }, { $set: { username: 'Deleted user' } }), // do not delete user reviews but set on reviews that the user has been deleted
    ]);

    res.json({
      success: true,
      message: 'Account successfully deleted',
    });
  } catch (error) {
    console.error('Error during account deletion:', error.message);
    res.status(500).json({
      success: false,
      error: 'InternalServerError',
      message: 'Server error during deletion',
    });
  }
};

exports.countUsers = async (req, res) => {
  if (!req.userId)
    return res.status(401).json({ error: 'Unauthorized', message: 'User not authorized' });
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: 'InternalServerError', message: 'Server error during user count:' });
  }
};
