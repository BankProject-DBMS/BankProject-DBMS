import React from 'react';
import FixedDepositReg from '../../Forms/FixedDepositReg';
import AccountReg from '../../Forms/AccountReg';
import AccountList from '../../Forms/AccountsList';

export default function AccountHandling() {
  return (
    <div>
      
      <div>
        <a href='employeePortal/account-register'>Register New Account</a>
      </div>

      
      <div>
        <a href='employeePortal/account-list'>Account List</a>
      </div>


      <div>
        <a href='employeePortal/fixed-deposit-register'>Register New Fixed Deposit</a>
      </div>
      
    </div>
  );
}
