import { Link } from 'react-router-dom';
export default function EmployeeHandling() {
  return (
    <div>
      <div>
        <Link to='employee-register'>Register New Employee</Link>
      </div>
      <div>
        <Link to='employee-list'>Employee List</Link>
      </div>
    </div>
  );
}
