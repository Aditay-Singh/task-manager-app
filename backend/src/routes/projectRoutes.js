const express = require('express');

const router = express.Router();

const protect = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const {
  createProject,
  getProjects,
} = require('../controllers/projectController');

router.post(
  '/',
  protect,
  roleMiddleware('admin'),
  createProject
);

router.get('/', protect, getProjects);

module.exports = router;