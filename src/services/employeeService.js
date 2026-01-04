const STORAGE_KEY = 'employees';

const getEmployees = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }
  try {
    return JSON.parse(data);
  } catch (error) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }
};

const employeeService = {
  getAll: () => getEmployees(),
  getById: (id) => getEmployees().find((emp) => emp.id === id),
  add: (employee) => {
    const employees = getEmployees();
    employees.push(employee);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  },
  update: (updatedEmployee) => {
    const employees = getEmployees().map((emp) =>
      emp.id === updatedEmployee.id ? { ...updatedEmployee } : emp
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  },
  delete: (id) => {
    const employees = getEmployees().filter((emp) => emp.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  },
  toggleActive: (id) => {
    const employees = getEmployees().map((emp) =>
      emp.id === id ? { ...emp, active: !emp.active } : emp
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  },
  reset: () => {
    localStorage.removeItem(STORAGE_KEY);
  },
};

export default employeeService;