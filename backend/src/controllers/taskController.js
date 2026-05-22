const Task = require('../models/Task');

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      dueDate,
      assignedTo,
      project,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        message: 'Task title is required',
      });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      assignedTo,
      project,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === 'admin') {
      tasks = await Task.find()
        .populate('assignedTo', 'name email')
        .populate('project', 'title');
    } else {
      tasks = await Task.find({
        assignedTo: req.user._id,
      }).populate('project', 'title');
    }

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    task.title =
      req.body.title || task.title;

    task.description =
      req.body.description ||
      task.description;

    task.status =
      req.body.status || task.status;

    task.dueDate =
      req.body.dueDate || task.dueDate;

    task.assignedTo =
      req.body.assignedTo ||
      task.assignedTo;

    task.project =
      req.body.project || task.project;

    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: 'Task deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateTaskStatus = async (
  req,
  res
) => {
  try {
    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    task.status =
      req.body.status || task.status;

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
};