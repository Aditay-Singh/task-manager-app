const express = require('express');

const router = express.Router();

const User = require('../models/User');

const protect = require('../middlewares/authMiddleware');

const roleMiddleware = require('../middlewares/roleMiddleware');

router.get(
  '/members',
  protect,
  roleMiddleware('admin'),
  async (req, res) => {
    try {
      const members = await User.find({
        role: 'member',
      }).select('-password');

      res.status(200).json(members);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;