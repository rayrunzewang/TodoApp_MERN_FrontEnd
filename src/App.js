import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import { useUser } from './UserContext'; 
import axios from 'axios'; 

function App() {
  const { user, setUser } = useUser(); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/check-session')
      .then((response) => {
        if (response.data.user) {
          setUser(response.data.user);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Session validation failed:', error);
        setLoading(false);
      });
  }, [setUser]);
  
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    console.log(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='login'>
        <>
          <h1>WELCOME TO TO-DO LIST</h1>
          <LoginForm onLogin={handleLogin} />
          <p>
            Do not have an account？<Link to="/register">Register</Link>
          </p>
        </>
    </div>
  );
}

export default App;


