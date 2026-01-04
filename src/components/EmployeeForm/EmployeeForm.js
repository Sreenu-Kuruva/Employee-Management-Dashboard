import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import employeeService from '../../services/employeeService';
import './EmployeeForm.css';

const states = ["California", "Texas", "Florida", "New York", "Illinois", "Georgia", "Arizona"];

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    fullName: '', gender: '', dob: '', state: '', profileImage: '', active: true
  });
  const [preview, setPreview] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      const emp = employeeService.getById(id);
      if (emp) {
        setForm(emp);
        setPreview(emp.profileImage);
      }
    }
  }, [id, isEdit]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, profileImage: reader.result });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const err = {};
    if (!form.fullName) err.fullName = true;
    if (!form.gender) err.gender = true;
    if (!form.dob) err.dob = true;
    if (!form.state) err.state = true;
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const employee = isEdit
      ? { ...form }
      : { ...form, id: uuidv4().slice(0, 8) };

    if (isEdit) {
      employeeService.update(employee);
    } else {
      employeeService.add(employee);
    }
    navigate('/');
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>{isEdit ? 'Edit' : 'Add'} Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className={errors.fullName ? 'error' : ''}
              />
            </div>

            <div className="form-group">
              <label>Gender *</label>
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className={errors.gender ? 'error' : ''}
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date of Birth *</label>
              <input
                type="date"
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                className={errors.dob ? 'error' : ''}
              />
            </div>

            <div className="form-group">
              <label>State *</label>
              <select
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className={errors.state ? 'error' : ''}
              >
                <option value="">Select State</option>
                {states.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Profile Image</label>
            <input type="file" accept="image/*" onChange={handleImage} />
            {preview && <img src={preview} alt="Preview" className="image-preview" />}
          </div>

          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
              />
              Active Employee
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">Save Employee</button>
            <button type="button" onClick={() => navigate('/')} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;