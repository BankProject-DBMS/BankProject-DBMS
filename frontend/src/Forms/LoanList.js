import React from 'react';

import { getCustomerOnlineLoans } from '../api/onlineloans';
import { getCustomerPhysicalLoans } from '../api/physloans';
import { Table } from 'antd';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';
import Logo from '../pages/Images/Logo2.png';
import '../pages/PageStyling/Navbar.css';

export default function LoanList() {
  const phyColumns = [
    {
      title: 'Loan ID',
      dataIndex: 'LoanID',
      key: 'LoanID',
    },
    {
      title: 'Customer ID',
      dataIndex: 'CustomerID',
      key: 'CustomerID',
    },
    {
      title: 'Branch ID',
      dataIndex: 'BranchID',
      key: 'BranchID',
    },
    {
      title: 'Employee ID',
      dataIndex: 'EmployeeID',
      key: 'EmployeeID',
    },
    {
      title: 'Amount',
      dataIndex: 'Amount',
      key: 'Amount',
    },
    {
      title: 'Loan Get Date',
      dataIndex: 'DateCreated',
      key: 'DateCreated',
    },
    {
      title: 'Approved',
      dataIndex: 'Approved',
      key: 'Approved',
    },
    {
      title: 'Duration',
      dataIndex: 'Duration',
      key: 'Duration',
    },
    {
      title: 'Interest Rate',
      dataIndex: 'InterestRate',
      key: 'InterestRate',
    },
    {
      title: 'Savings Account ID',
      dataIndex: 'SavingsAccountID',
      key: 'SavingsAccountID',
    },
  ];

  const onlineColumns = [
    {
      title: 'Loan ID',
      dataIndex: 'LoanID',
      key: 'LoanID',
    },
    {
      title: 'Customer ID',
      dataIndex: 'CustomerID',
      key: 'CustomerID',
    },
    {
      title: 'FD Account ID',
      dataIndex: 'FDAccountID',
      key: 'FDAccountID',
    },
    {
      title: 'Amount',
      dataIndex: 'Amount',
      key: 'Amount',
    },
    {
      title: 'Savings Account ID',
      dataIndex: 'SavingsAccountID',
      key: 'SavingsAccountID',
    },
    {
      title: 'Branch ID',
      dataIndex: 'BranchID',
      key: 'BranchID',
    },
    {
      title: 'Loan Get Date',
      dataIndex: 'DateCreated',
      key: 'DateCreated',
    },
    {
      title: 'Duration',
      dataIndex: 'Duration',
      key: 'Duration',
    },
    {
      title: 'Interest Rate',
      dataIndex: 'InterestRate',
      key: 'InterestRate',
    },
  ];
  const [physicalLoans, setPhysicalLoans] = React.useState();
  const [onlineLoans, setOnlineLoans] = React.useState();

  // loan list is loaded on the first component render
  React.useEffect(() => loadPhysicalLoanList(), []);
  React.useEffect(() => loadOnlineLoanList(), []);

  function loadPhysicalLoanList() {
    getCustomerPhysicalLoans()
      .then((data) => {
        setPhysicalLoans(data);
      })
      .catch((err) => console.log(err));
  }

  function loadOnlineLoanList() {
    getCustomerOnlineLoans()
      .then((data) => {
        setOnlineLoans(data);
      })
      .catch((err) => console.log(err));
  }
  const navigate = useNavigate();

  //loadLoanList();
  //console.log(loans);
  return (
    <div>
      <div className='navbar'>
        <img
          className='aruci--logo'
          src={Logo}
          onClick={() => navigate('/employeePortal/')}
        />
        <h1 className='topic'>Loan List</h1>
      </div>
      <div className='table'>
        <h2>Physical Loan</h2>
        {<Table dataSource={physicalLoans} columns={phyColumns} />}
      </div>

      <div className='table'>
        <h2>Online Loan</h2>
        {<Table dataSource={onlineLoans} columns={onlineColumns} />}
      </div>
    </div>
  );
}
