import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useUser } from '../../UserContext';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { user, setUser } = useUser();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (redirect && user) {
      console.log(redirect);
      console.log(user);
    }
  }, [redirect, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      setMessage(response.data.message);

      if (response.data.message === 'Login successful') {
        setUser(response.data.user);
        console.log(response.data.user);
        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 2);
        document.cookie = `session_id=${response.sessionId}; expires=${expirationDate.toUTCString()}; path=/`;
        setRedirect(true);
        console.log(user);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setMessage('Login failed. Please check your credentials.');
    }
  };

  if (redirect) {
    console.log(user);
    console.log(user.username);

    return <Navigate to="/todoapp" />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>


    </div>
  );


}

export default LoginForm;