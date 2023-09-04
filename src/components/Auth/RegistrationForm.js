import React, { useState } from 'react';
import axios from 'axios';
import { Link, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/register', { username, password });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Registration failed:', error);
      setMessage('Registration failed');
    }
  };

  return (
    <div>
      <h2>Registration</h2>


      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
      {message && <p>{message}</p>}


    </div>
  );
}

export default RegistrationForm;