const Task = require('../models/Task');

const Project = require('../models/Project');

const User = require('../models/User');

const getDashboardStats = async (
  req,
  res
) => {
  try {
    const totalTasks =
      await Task.countDocuments();

    const completedTasks =
      await Task.countDocuments({
        status: 'completed',
      });

    const pendingTasks =
      await Task.countDocuments({
        status: 'pending',
      });

    const totalProjects =
      await Project.countDocuments();

    const totalMembers =
      await User.countDocuments({
        role: 'member',
      });

    const overdueTasks =
      await Task.countDocuments({
        dueDate: {
          $lt: new Date(),
        },
        status: {
          $ne: 'completed',
        },
      });

    const completionRate =
      totalTasks > 0
        ? Math.round(
            (completedTasks / totalTasks) *
              100
          )
        : 0;

    res.status(200).json({
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      totalProjects,
      totalMembers,
      completionRate,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};