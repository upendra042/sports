const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Admin Dashboard
router.get('/admin/dashboard', authMiddleware, (req, res) => {
  res.render('adminDashboard'); // Render admin main page
});

// Player Dashboard
router.get('/player/dashboard', authMiddleware, (req, res) => {
  res.render('playerDashboard'); // Render player main page
});

module.exports = router;
