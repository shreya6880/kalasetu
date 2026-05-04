const express = require("express");

const router = express.Router();

const authController = require(
  "../controllers/authController"
);

// ======================
// Signup
// ======================

router.post(
  "/signup",
  authController.signup
);

// ======================
// Login
// ======================

router.post(
  "/login",
  authController.login
);

// ======================
// Update Profile
// ======================

router.post(
  "/profile",
  authController.updateProfile
);

// ======================
// Get All Users
// ======================

router.get(
  "/users",
  authController.getUsers
);

// ======================
// Send Connection Request
// ======================

router.post(
  "/request",
  authController.sendRequest
);

// ======================
// Get Incoming Requests
// ======================

router.get(
  "/requests/:email",
  authController.getRequests
);
router.put(
  "/request/status",
  authController.updateRequestStatus
);

module.exports = router;