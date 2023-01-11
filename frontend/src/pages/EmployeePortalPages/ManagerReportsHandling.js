import { Link } from 'react-router-dom';
import { Card } from 'antd';

export default function ManagerReports() {
  return (
    <div>
      <Card
        title='Manager Reports'
        style={{
          borderRadius: 10,
          margin: '3% 1%',
          height: '180px',
          borderBlockColor: 'black',
        }}
      >
        <div>
          <Link to='/employeePortal/transaction-report'>
            Transaction Reports
          </Link>
        </div>

        <div>
          <Link to='/employeePortal/loan-report'>Loan Reports</Link>
        </div>
      </Card>
    </div>
  );
}
