import { useContext, useEffect, useState } from 'react';

import API from '../../api/axios';

import { AuthContext } from '../../context/AuthContext';

import './admindashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  
  const [stats, setStats] = useState({
  totalTasks: 0,
  completedTasks: 0,
  pendingTasks: 0,
  overdueTasks: 0,
  totalProjects: 0,
  totalMembers: 0,
  completionRate: 0,
});

  const [projects, setProjects] = useState([]);

  const [tasks, setTasks] = useState([]);

  const [members, setMembers] = useState([]);
  
  const [filteredMembers, setFilteredMembers] =
  useState([]);

  const [editingTaskId, setEditingTaskId] =
    useState(null);

  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
  });

  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignedTo: '',
    project: '',
    status: 'pending',
  });

  const fetchDashboardData = async () => {
  try {
    const dashboardRes = await API.get(
      '/dashboard'
    );

    const projectRes = await API.get(
      '/projects'
    );

    const taskRes = await API.get('/tasks');

    const memberRes = await API.get(
      '/users/members'
    );

    setStats(dashboardRes.data);

    setProjects(projectRes.data);

    setTasks(taskRes.data);

    setMembers(memberRes.data);
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleProjectChange = (e) => {
    setProjectForm({
      ...projectForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleTaskChange = (e) => {
  const { name, value } = e.target;

  setTaskForm({
    ...taskForm,
    [name]: value,
  });

  if (name === 'project') {
    const selectedProject = projects.find(
      (project) => project._id === value
    );

    if (selectedProject) {
      setFilteredMembers(
        selectedProject.members || []
      );

      setTaskForm((prev) => ({
        ...prev,
        project: value,
        assignedTo: '',
      }));
    }
  }
};

  const handleProjectSubmit = async (e) => {
    e.preventDefault();

    try {
      const memberSelect =
        document.querySelector('.member-select');

      const selectedMembers = Array.from(
        memberSelect.selectedOptions
      ).map((option) => option.value);

      const payload = {
        ...projectForm,
        members: selectedMembers,
      };

      await API.post('/projects', payload);

      alert('Project created successfully');

      setProjectForm({
        title: '',
        description: '',
      });

      memberSelect.selectedIndex = -1;

      fetchDashboardData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTaskId) {
        await API.put(
          `/tasks/${editingTaskId}`,
          taskForm
        );

        alert('Task updated successfully');
      } else {
        await API.post('/tasks', taskForm);

        alert('Task created successfully');
      }

      setTaskForm({
        title: '',
        description: '',
        dueDate: '',
        assignedTo: '',
        project: '',
        status: 'pending',
      });

      setEditingTaskId(null);

      fetchDashboardData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (id) => {
    const confirmDelete = window.confirm(
      'Delete this task?'
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/tasks/${id}`);

      alert('Task deleted successfully');

      fetchDashboardData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTask = (task) => {
    setTaskForm({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate
        ? task.dueDate.split('T')[0]
        : '',
      assignedTo: task.assignedTo?._id || '',
      project: task.project?._id || '',
      status: task.status || 'pending',
    });
    const selectedProject = projects.find(
  (project) => project._id === task.project?._id
);

if (selectedProject) {
  setFilteredMembers(
    selectedProject.members || []
  );
}
    setEditingTaskId(task._id);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='admin-dashboard'>
      <div className='dashboard-header'>
        <div>
          <h1>Admin Dashboard</h1>

          <p>
            Welcome back,
            {' '}
            {user?.name}
          </p>
        </div>

        <button onClick={logout}>
          Logout
        </button>
      </div>

      <div className='stats-grid'>
  <div className='stat-card'>
    <h3>Total Tasks</h3>

    <p>{stats.totalTasks}</p>
  </div>

  <div className='stat-card'>
    <h3>Completed Tasks</h3>

    <p>{stats.completedTasks}</p>
  </div>

  <div className='stat-card'>
    <h3>Pending Tasks</h3>

    <p>{stats.pendingTasks}</p>
  </div>

  <div className='stat-card'>
    <h3>Overdue Tasks</h3>

    <p>{stats.overdueTasks}</p>
  </div>

  <div className='stat-card'>
    <h3>Total Projects</h3>

    <p>{stats.totalProjects}</p>
  </div>

  <div className='stat-card'>
    <h3>Total Members</h3>

    <p>{stats.totalMembers}</p>
  </div>

  <div className='stat-card'>
    <h3>Completion Rate</h3>

    <p>
      {stats.completionRate}
      %
    </p>
  </div>
</div>

      <div className='dashboard-main'>
        <div className='form-section'>
          <form
            className='dashboard-form'
            onSubmit={handleProjectSubmit}
          >
            <div className='form-header'>
              <h2>Create Project</h2>

              <p>
                Create and manage team
                projects
              </p>
            </div>

            <div className='form-group'>
              <label>Project Title</label>

              <input
                type='text'
                name='title'
                placeholder='Enter project title'
                value={projectForm.title}
                onChange={handleProjectChange}
                required
              />
            </div>

            <div className='form-group'>
              <label>Description</label>

              <textarea
                name='description'
                placeholder='Enter project description'
                value={projectForm.description}
                onChange={handleProjectChange}
              />
            </div>

            <div className='form-group'>
              <label>
                Select Team Members
              </label>
    <select
  multiple
  className='member-select'
  size={5}
>
  {members.map((member) => (
    <option
      key={member._id}
      value={member._id}
    >
      {member.name} - {member.email}
    </option>
  ))}
</select>
                </div>

            <button
              type='submit'
              className='primary-btn'
            >
              Create Project
            </button>
          </form>

          <form
            className='dashboard-form'
            onSubmit={handleTaskSubmit}
          >
            <div className='form-header'>
              <h2>
                {editingTaskId
                  ? 'Edit Task'
                  : 'Create Task'}
              </h2>

              <p>
                Assign and manage project
                tasks
              </p>
            </div>

            <div className='form-group'>
              <label>Task Title</label>

              <input
                type='text'
                name='title'
                placeholder='Enter task title'
                value={taskForm.title}
                onChange={handleTaskChange}
                required
              />
            </div>

            <div className='form-group'>
              <label>Description</label>

              <textarea
                name='description'
                placeholder='Enter task description'
                value={taskForm.description}
                onChange={handleTaskChange}
              />
            </div>

            <div className='form-group'>
              <label>Due Date</label>

              <input
                type='date'
                name='dueDate'
                value={taskForm.dueDate}
                onChange={handleTaskChange}
              />
            </div>

           <div className='form-group'>
  <label>Assign Member</label>

  
</div>
            <div className='form-group'>
              <label>Select Project</label>
<select
  name='assignedTo'
  value={taskForm.assignedTo}
  onChange={handleTaskChange}
  required
>
  <option value=''>
    Select Team Member
  </option>

  {taskForm.project === '' && (
    <option value=''>
      Select project first
    </option>
  )}

  {filteredMembers.map((member) => (
    <option
      key={member._id}
      value={member._id}
    >
      {member.name}
      {' - '}
      {member.email}
    </option>
  ))}
</select>
              <select
                name='project'
                value={taskForm.project}
                onChange={handleTaskChange}
                required
              >
                <option value=''>
                  Select Project
                </option>

                {projects.map((project) => (
                  <option
                    key={project._id}
                    value={project._id}
                  >
                    {project.title}
                  </option>
                ))}
              </select>
            </div>

            <div className='form-group'>
              <label>Status</label>

              <select
                name='status'
                value={taskForm.status}
                onChange={handleTaskChange}
              >
                <option value='pending'>
                  Pending
                </option>

                <option value='in-progress'>
                  In Progress
                </option>

                <option value='completed'>
                  Completed
                </option>
              </select>
            </div>

            <button
              type='submit'
              className='primary-btn'
            >
              {editingTaskId
                ? 'Update Task'
                : 'Create Task'}
            </button>
          </form>
        </div>

        <div className='task-section'>
          <h2>All Tasks</h2>

          <div className='task-grid'>
            {tasks.length === 0 ? (
              <p>No tasks available</p>
            ) : (
              tasks.map((task) => (
                <div
                  className='task-card'
                  key={task._id}
                >
                  <div className='task-top'>
                    <h3>{task.title}</h3>

                    <span
                      className={`status ${task.status}`}
                    >
                      {task.status}
                    </span>
                  </div>

                  <p>{task.description}</p>

                  <div className='task-info'>
                    <p>
                      <strong>
                        Assigned To:
                      </strong>
                      {' '}
                      {task.assignedTo?.name ||
                        'N/A'}
                    </p>

                    <p>
                      <strong>
                        Project:
                      </strong>
                      {' '}
                      {task.project?.title ||
                        'N/A'}
                    </p>

                    <p>
                      <strong>
                        Due Date:
                      </strong>
                      {' '}
                      {task.dueDate
                        ? new Date(
                            task.dueDate
                          ).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>

                  <div className='task-actions'>
                    <button
                      className='edit-btn'
                      onClick={() =>
                        handleEditTask(task)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className='delete-btn'
                      onClick={() =>
                        handleDeleteTask(
                          task._id
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;