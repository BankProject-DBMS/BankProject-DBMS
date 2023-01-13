import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

export default function CustomerHandling() {
  return (
    <div>
      <Card
        title='Customer Handling'
        style={{
          borderRadius: 10,
          margin: '3% 1%',
          height: '180px',
          borderBlockColor: 'black',
        }}
      >
        <div>
          <Link to='customer-register'>Register New Customer</Link>
        </div>

        <div>
          <Link to='customer-list'>Customer List</Link>
        </div>

        <div>
          <Link to='online-customer-register'>
            Register New Online Customer
          </Link>
        </div>
      </Card>
    </div>
  );
}
