const jwt = require("jsonwebtoken");
const Request = require("../models/Request");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ======================
// Signup
// ======================

exports.signup = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    // Save user
    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

// ======================
// Login
// ======================

exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
  {
    email: user.email
  },
  "kalasetu_secret_key",
  {
    expiresIn: "7d"
  }
);

res.status(200).json({
  message: "Login successful",
  token,
  user: {
    name: user.name,
    email: user.email
  }
});

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

// ======================
// Update Profile
// ======================

exports.updateProfile = async (req, res) => {
  try {

    const {
      email,
      bio,
      location,
      skillsOffered,
      skillsWanted
    } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Update profile data
    user.bio = bio;

    user.location = location;

    user.skillsOffered = skillsOffered
      .split(",");

    user.skillsWanted = skillsWanted
      .split(",");

    // Save updated user
    await user.save();

    res.status(200).json({
      message: "Profile updated successfully"
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

// ======================
// Get All Users
// ======================

exports.getUsers = async (req, res) => {
  try {

    const users = await User.find();

    res.status(200).json(users);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

// ======================
// Send Request
// ======================

exports.sendRequest = async (req, res) => {
  try {

    const {
      senderEmail,
      receiverEmail
    } = req.body;

    // Prevent self request
    if (senderEmail === receiverEmail) {
      return res.status(400).json({
        message: "You cannot connect with yourself"
      });
    }

    // Create request
    const request = new Request({
      senderEmail,
      receiverEmail
    });

    await request.save();

    res.status(201).json({
      message: "Connection request sent"
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

// ======================
// Get Requests
// ======================

exports.getRequests = async (req, res) => {
  try {

    const { email } = req.params;

    const requests = await Request.find({
      receiverEmail: email
    });

    res.status(200).json(requests);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

// ======================
// Update Request Status
// ======================

exports.updateRequestStatus = async (req, res) => {
  try {

    const {
      requestId,
      status
    } = req.body;

    const request = await Request.findById(
      requestId
    );

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    request.status = status;

    await request.save();

    res.status(200).json({
      message: `Request ${status}`
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};