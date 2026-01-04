import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import EmployeeForm from './components/EmployeeForm/EmployeeForm';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><EmployeeForm /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EmployeeForm /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;