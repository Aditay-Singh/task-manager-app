import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import API from '../../api/axios';

import './signup.css';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'member',
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
      await API.post('/auth/signup', formData);

      alert('Signup successful');

      navigate('/');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className='signup-page'>
      <form className='signup-form' onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input
          type='text'
          name='name'
          placeholder='Enter name'
          onChange={handleChange}
          required
        />

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

        <select name='role' onChange={handleChange}>
          <option value='member'>Member</option>
          <option value='admin'>Admin</option>
        </select>

        <button type='submit'>Signup</button>

        <p>
          Already have an account? <Link to='/'>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;