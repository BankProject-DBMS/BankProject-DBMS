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
      <div>
        <Link to='withdrawal-findbyid'>Account Withdrawal</Link>
      </div>
    </div>
  );
}
