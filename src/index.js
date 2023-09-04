import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/Auth/RegistrationForm';
import TodoApp from './components/TodoApp';
import PrivateRoute from './routes/PrivateRouter'; // 导入 PrivateRoute 组件
import { UserProvider, useUser } from './UserContext'; // 导入 UserProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
function Main() {
  const user = useUser();
  return (
    <BrowserRouter >
      <UserProvider> 
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<RegistrationForm />} /> 
          <Route
            path="/todoapp"
            element={
              <PrivateRoute
                element={<TodoApp />} />}
            user={useUser()}
          />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}
root.render(<Main />)


