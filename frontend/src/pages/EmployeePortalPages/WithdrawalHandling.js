import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

export default function WithdrawalHandling() {
  return (
    <div>
      <Card
        title='Withdrawal Handling'
        style={{
          borderRadius: 10,
          margin: '3% 1%',
          height: '180px',
          borderBlockColor: 'black',
        }}
      >
        <div>
          <Link to='withdrawal-newWithdrawal'>New Withdrawal</Link>
        </div>
        <div>
          <Link to='withdrawal-list'>Withdrawal List</Link>
        </div>
      </Card>
    </div>
  );
}
