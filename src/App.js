import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/Login";
import TodoApp from "./components/TodoApp";
import { useUser } from "./UserContext"; // Import UserProvider from your context
import { useNavigate } from "react-router-dom"; // 导入 useNavigate


function App() {
  const { user } = useUser();
  const navigate = useNavigate(); // 使用 useNavigate 钩子

  useEffect(() => {
    const loginStatus = localStorage.getItem("loginStatus");
    if (loginStatus === "loggedIn") {
        navigate("/todoapp");
    } else {
        navigate("/login");
    }
}, [navigate]);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/todoapp" element={<TodoApp /> } />          
        <Route path="/" element={user ? <Navigate to="/todoapp" /> : <Navigate to="/login" />} />
      </Routes>

    </>
  );
}

export default App;