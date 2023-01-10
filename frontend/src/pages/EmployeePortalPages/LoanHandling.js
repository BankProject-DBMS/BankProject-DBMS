import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

export default function LoanHandling(props) {
  return (
    <div>
      <Card title='Loan Handling'>
        <div>
          <Link to='loan-register'>Register New Loan</Link>
        </div>

        <div>
          <Link to='loan-list'>Loan List</Link>
        </div>

        {props.role === 'manager' && (
          <div>
            <Link to='loan-approval'>Loan Approval</Link>
          </div>
        )}
      </Card>
    </div>
  );
}
