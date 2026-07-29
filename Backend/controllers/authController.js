const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    } 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });
    if (user) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a random 6-digit OTP

        const message = `
        Welcome to ShopNest, ${name}! Thank you for registering. We are excited to have you on board. Your account has been successfully created, and you can now log in using your email and password.
        Your OTP for ShopNest registration is: ${otp}`;

        await sendEmail(email, 'Welcome to ShopNest - Your OTP for Registration', message); // Send the email with the OTP

        res.status(201).json({ 
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400).json({ message: 'Invalid user data' });
    }
  } 
  catch (error) {
    res.status(500).json({ message: 'Server error' });
  } 
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    }else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
    } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password'); // Exclude the password field from the response
    res.json(users);
  }
    catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser, getUsers };