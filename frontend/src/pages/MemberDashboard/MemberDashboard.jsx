import { useContext, useEffect, useState } from 'react';

import API from '../../api/axios';

import { AuthContext } from '../../context/AuthContext';

import './memberdashboard.css';

const MemberDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get('/tasks');

      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, {
        status,
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='member-dashboard'>
      <div className='top-bar'>
        <div>
          <h2>Member Dashboard</h2>
          <p>Welcome, {user?.name}</p>
        </div>

        <button onClick={logout}>Logout</button>
      </div>

      <div className='task-section'>
        <h3>My Tasks</h3>

        {tasks.length === 0 ? (
          <p>No tasks assigned</p>
        ) : (
          <div className='task-grid'>
            {tasks.map((task) => (
              <div className='task-card' key={task._id}>
                <h4>{task.title}</h4>

                <p>{task.description}</p>

                <span className={`status ${task.status}`}>
                  {task.status}
                </span>

                <p>
                  Project:
                  {' '}
                  {task.project?.title}
                </p>

                <select
                  value={task.status}
                  onChange={(e) =>
                    updateStatus(task._id, e.target.value)
                  }
                >
                  <option value='pending'>Pending</option>

                  <option value='in-progress'>
                    In Progress
                  </option>

                  <option value='completed'>
                    Completed
                  </option>
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberDashboard;

