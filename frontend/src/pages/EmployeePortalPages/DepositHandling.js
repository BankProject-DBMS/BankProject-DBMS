import React from 'react';
import { Link } from 'react-router-dom';

export default function DepositHandling() {
  return (
    <div>
      <div>
        <Link to='deposit-newDeposit'>Register New Deposit</Link>
      </div>
      <div>
        <Link to='deposit-list'>Deposit List</Link>
      </div>
      
    </div>
  );
}
