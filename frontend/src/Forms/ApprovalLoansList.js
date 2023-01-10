import { useState, useEffect } from 'react';
import { getLoansNeedingApproval } from '../api/physloans';
import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import Logo from '../pages/Images/Logo2.png';

export default function ApprovalLoansList() {
  const columns = [
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
      title: 'Date Created',
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

  const [loans, setLoans] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getLoansNeedingApproval()
      .then((data) => {
        console.log(data);
        setLoans(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className='navbar'>
        <img
          className='aruci--logo'
          src={Logo}
          alt='logo'
          onClick={() => navigate('/employeePortal/')}
        />
        <h1 className='topic'>Loans Approval</h1>
      </div>
      <Table columns={columns} dataSource={loans} />
    </div>
  );
}
