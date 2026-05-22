const express = require('express');

const router = express.Router();

const protect = require('../middlewares/authMiddleware');

const roleMiddleware = require('../middlewares/roleMiddleware');

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require('../controllers/taskController');

router.post(
  '/',
  protect,
  roleMiddleware('admin'),
  createTask
);

router.get('/', protect, getTasks);

router.put(
  '/:id',
  protect,
  roleMiddleware('admin'),
  updateTask
);

router.delete(
  '/:id',
  protect,
  roleMiddleware('admin'),
  deleteTask
);

router.put(
  '/status/:id',
  protect,
  updateTaskStatus
);

module.exports = router;