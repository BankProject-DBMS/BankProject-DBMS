import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

export default function DepositHandling() {
  return (
    <div>
      <Card
        title='Deposit Handling'
        style={{
          borderRadius: 10,
          margin: '3% 1%',
          height: '180px',
          borderBlockColor: 'black',
        }}
      >
        <div>
          <Link to='deposit-newDeposit'>Register New Deposit</Link>
        </div>
        <div>
          <Link to='deposit-list'>Deposit List</Link>
        </div>
      </Card>
    </div>
  );
}
