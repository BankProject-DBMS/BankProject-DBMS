import React from 'react';
import FixedDepositReg from '../../Forms/FixedDepositReg';
import AccountReg from '../../Forms/AccountReg';
import AccountList from '../../Forms/AccountsList';
import { Link } from 'react-router-dom';

export default function AccountHandling() {
  return (
    <div>
      <div>
        <Link to='account-register'>Register New Account</Link>
      </div>

      <div>
        <Link to='account-list'>Account List</Link>
      </div>

      <div>
        <Link to='fixed-deposit-register'>Register New FD</Link>
      </div>
    </div>
  );
}
