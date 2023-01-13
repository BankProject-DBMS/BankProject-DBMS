import { Link } from 'react-router-dom';
import { Card } from 'antd';


export default function EmployeeHandling() {
  return (
    <div>
      <Card
        title='Employee Handling'
        style={{
          borderRadius: 10,
          margin: '3% 1%',
          height: '180px',
          borderBlockColor: 'black',
        }}
      >
        <div>
          <Link to='employee-register'>Register New Employee</Link>
        </div>
        <div>
          <Link to='employee-list'>Employee List</Link>
        </div>
      </Card>
    </div>
  );
}
