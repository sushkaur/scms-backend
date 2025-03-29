const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

// ✅ Protected route for Admins only
router.get('/admin-data', verifyToken, checkRole(['admin']), (req, res) => {
  res.json({ message: `Hello ${req.user.role}, this is admin-only data.` });
});

// ✅ Protected route for any authenticated user
router.get('/private', verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.role}, you're logged in!` });
});

module.exports = router;