const STORAGE_KEY = 'employees';

const initialData = [
  {
    id: '1',
    fullName: 'John Doe',
    gender: 'Male',
    dob: '1990-05-15',
    state: 'California',
    profileImage: '',
    active: true
  }
];

const getEmployees = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(data);
};

export default {
  getAll: () => getEmployees(),
  getById: (id) => getEmployees().find(e => e.id === id),
  add: (emp) => {
    const employees = getEmployees();
    employees.push(emp);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  },
  update: (updated) => {
    const employees = getEmployees().map(e => e.id === updated.id ? updated : e);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  },
  delete: (id) => {
    const employees = getEmployees().filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  },
  toggleActive: (id) => {
    const employees = getEmployees().map(e =>
      e.id === id ? { ...e, active: !e.active } : e
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  }
};