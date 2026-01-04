import React from 'react';
import './PrintableForm.css';

const PrintableForm = ({ employee }) => {
  if (!employee) return null;

  return (
    <div className="print-form">
      <h1 className="print-title">Employee Information Form</h1>

      <div className="print-header">
        <h2>{employee.fullName}</h2>
        <p>Employee ID: {employee.id}</p>
      </div>

      <div className="print-grid">
        <div className="print-item">
          <strong>Gender:</strong> {employee.gender}
        </div>

        <div className="print-item">
          <strong>Date of Birth:</strong> {employee.dob}
        </div>

        <div className="print-item">
          <strong>State:</strong> {employee.state}
        </div>

        <div className="print-item">
          <strong>Status:</strong>{' '}
          <span className={employee.active ? 'status-active' : 'status-inactive'}>
            {employee.active ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      {employee.profileImage && (
        <div className="print-photo-section">
          <strong>Profile Photo:</strong>
          <img
            src={employee.profileImage}
            alt="Profile"
            className="print-photo"
          />
        </div>
      )}

      <div className="print-footer">
        <p>Printed on: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default PrintableForm;
