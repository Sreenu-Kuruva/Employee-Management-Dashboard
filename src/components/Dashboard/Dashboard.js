import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import employeeService from '../../services/employeeService';
import SummaryCards from '../SummaryCards/SummaryCards';
import EmployeeTable from '../EmployeeTable/EmployeeTable';
import './Dashboard.css';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setEmployees(employeeService.getAll());
    setLoading(false);
  }, []);

  const filtered = employees.filter(emp => {
    const matchesName = emp.fullName.toLowerCase().includes(search.toLowerCase());
    const matchesGender = !genderFilter || emp.gender === genderFilter;
    const matchesStatus = statusFilter === '' || emp.active === (statusFilter === 'active');
    return matchesName && matchesGender && matchesStatus;
  });

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="container">
        <header className="dashboard-header">
          <h1>Employee Management</h1>
          <button onClick={() => navigate('/add')} className="add-btn">
            + Add Employee
          </button>
        </header>

        <SummaryCards employees={employees} />

        <div className="filters">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
            <option value="">All Genders</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <h3>No employees found</h3>
            <p>Try adjusting filters or add a new employee.</p>
          </div>
        ) : (
          <EmployeeTable
            employees={employees}
            setEmployees={setEmployees}
            filteredEmployees={filtered}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;