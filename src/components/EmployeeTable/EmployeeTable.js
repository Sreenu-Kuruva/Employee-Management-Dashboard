import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import employeeService from '../../services/employeeService';
import PrintableForm from '../PrintableForm/PrintableForm';
import './EmployeeTable.css';

const EmployeeTable = ({ employees, setEmployees, filteredEmployees }) => {
  const navigate = useNavigate();

  // Refs REQUIRED by react-to-print (new API)
  const fullListRef = useRef(null);
  const individualPrintRef = useRef(null);

  const [employeeToPrint, setEmployeeToPrint] = useState(null);
  const [shouldPrint, setShouldPrint] = useState(false);

  // Print full table
  const printFullList = useReactToPrint({
    contentRef: fullListRef,
    documentTitle: 'All_Employees_List',
  });

  // Print individual employee
  const printIndividualForm = useReactToPrint({
    contentRef: individualPrintRef,
    documentTitle: 'Employee_Form',
    onAfterPrint: () => {
      setEmployeeToPrint(null);
      setShouldPrint(false);
    },
  });

  // Trigger print ONLY after DOM updates
  useEffect(() => {
    if (shouldPrint && employeeToPrint) {
      printIndividualForm();
    }
  }, [shouldPrint, employeeToPrint, printIndividualForm]);

  const handlePrintForm = (emp) => {
    setEmployeeToPrint(emp);
    setShouldPrint(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      employeeService.delete(id);
      setEmployees(employeeService.getAll());
    }
  };

  const handleToggle = (id) => {
    employeeService.toggleActive(id);
    setEmployees(employeeService.getAll());
  };

  if (filteredEmployees.length === 0) {
    return <div className="empty-state">No employees found.</div>;
  }

  return (
    <>
      {/* ===== Visible Employee Table ===== */}
      <div className="table-wrapper" ref={fullListRef}>
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>State</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>

                <td>
                  {emp.profileImage ? (
                    <img
                      src={emp.profileImage}
                      alt="Profile"
                      className="profile-img"
                    />
                  ) : (
                    <div className="placeholder-img">No Photo</div>
                  )}
                </td>

                <td>{emp.fullName}</td>
                <td>{emp.gender}</td>
                <td>{emp.dob}</td>
                <td>{emp.state}</td>

                <td>
                  <button
                    className={`status-toggle ${emp.active ? 'active' : 'inactive'
                      }`}
                    onClick={() => handleToggle(emp.id)}
                  >
                    {emp.active ? 'Active' : 'Inactive'}
                  </button>
                </td>

                <td className="actions">
                  <button
                    onClick={() => navigate(`/edit/${emp.id}`)}
                    className="edit-btn"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => handlePrintForm(emp)}
                    className="print-btn"
                  >
                    Print Form
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Print Full List Button ===== */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button onClick={printFullList} className="print-list-btn">
          Print Full Employees List
        </button>
      </div>

      {/* ===== Hidden Printable Section (DOM ONLY) ===== */}
      <div style={{ display: 'none' }}>
        <div ref={individualPrintRef}>
          {employeeToPrint && (
            <PrintableForm employee={employeeToPrint} />
          )}
        </div>
      </div>
    </>
  );
};

export default EmployeeTable;
