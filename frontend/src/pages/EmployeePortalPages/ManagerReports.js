import { Link } from 'react-router-dom';

export default function ManagerReports() {
  return (
    <div>
      <h1>Manager Reports</h1>
      <Link to='/employeePortal/transaction-report'>Transaction Reports</Link>
    </div>
  );
}
