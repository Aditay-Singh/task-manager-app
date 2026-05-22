import { useContext, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import API from '../../api/axios';

import { AuthContext } from '../../context/AuthContext';

import './login.css';

const Login = () => {
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post('/auth/login', formData);

      localStorage.setItem('user', JSON.stringify(data));

      setUser(data);

      if (data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/member');
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className='login-page'>
      <form className='login-form' onSubmit={handleSubmit}>
        <h2>Team Task Manager</h2>

        <input
          type='email'
          name='email'
          placeholder='Enter email'
          onChange={handleChange}
          required
        />

        <input
          type='password'
          name='password'
          placeholder='Enter password'
          onChange={handleChange}
          required
        />

        <button type='submit'>Login</button>

        <p>
          Don't have an account? <Link to='/signup'>Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;