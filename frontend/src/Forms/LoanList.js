import React from 'react';

import { getLoans } from '../api/loans';
import { Table } from 'antd';

export default function LoanList() {
  const columns = [
    {
      title: 'Loan ID',
      dataIndex: 'LoanID',
      key: 'LoanID',
    },
    {
      title: 'Customer Number',
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
      title: 'Loan Type ID',
      dataIndex: 'TypeID',
      key: 'TypeID',
    },
    {
      title: 'Loan Get Date',
      dataIndex: 'DateCreated',
      key: 'DateCreated',
    },
    {
      title: 'Saving Account ID',
      dataIndex: 'SavingAccountID',
      key: 'SavingAccountID',
    },
  ];

  const [loans, setLoans] = React.useState();

  // loan list is loaded on the first component render
  React.useEffect(() => loadLoanList(), []);

  function loadLoanList() {
    getLoans()
      .then((data) => {
        setLoans(data);
      })
      .catch((err) => alert(err));
  }

  //loadLoanList();
  //console.log(loans);
  return (
    <div>
      <h1>Loan List</h1>

      {<Table dataSource={loans} columns={columns} />}
    </div>
  );
}
