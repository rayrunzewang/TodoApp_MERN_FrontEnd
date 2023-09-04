import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useUser } from '../UserContext';

function PrivateRoute({ element }) {
  const { user } = useUser();
  console.log(user);

  if (user) {
    if (user.username) {
      return element;
    } else {
      return <Navigate to="/" />;
    }

  } else {
    return <Navigate to="/" />;
  }
  
}

export default PrivateRoute;