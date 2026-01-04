import React from 'react';
import './SummaryCards.css';

const SummaryCards = ({ employees }) => {
  const total = employees.length;
  const active = employees.filter(e => e.active).length;
  const inactive = total - active;

  return (
    <div className="summary-grid">
      <div className="summary-card total">
        <h3>{total}</h3>
        <p>Total Employees</p>
      </div>
      <div className="summary-card active">
        <h3>{active}</h3>
        <p>Active</p>
      </div>
      <div className="summary-card inactive">
        <h3>{inactive}</h3>
        <p>Inactive</p>
      </div>
    </div>
  );
};

export default SummaryCards;