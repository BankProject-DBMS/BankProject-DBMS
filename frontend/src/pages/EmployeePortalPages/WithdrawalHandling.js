import React from 'react';
import { Link } from 'react-router-dom';

export default function WithdrawalHandling() {
  return (
    <div>
      <div>
        <Link to='withdrawal-newWithdrawal'>New Withdrawal</Link>
      </div>
      <div>
        <Link to='withdrawal-list'>Withdrawal List</Link>
      </div>
    </div>
  );
}
