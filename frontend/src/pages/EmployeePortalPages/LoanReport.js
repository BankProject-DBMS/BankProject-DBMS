import { useState, useEffect } from 'react';

import {
  getBranchInReport,
  getBranchInCount,
  getBranchOutReport,
  getBranchOutCount,
} from '../../api/transactions';
import { Table } from 'antd';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';
import Logo from '../Images/Logo2.png';
import '../PageStyling/Navbar.css';

export default function UnpaidLoanReport() {
  const columns = [
    {
      title: 'Installment ID',
      dataIndex: 'InstallmentID',
      key: 'InstallmentID',
    },
    {
      title: 'Loan ID',
      dataIndex: 'LoanID',
      key: 'LoanID',
    },
    {
      title: 'Deadline Date',
      dataIndex: 'DeadlineDate',
      key: 'DeadlineDate',
    },
    {
      title: 'Amount Rs.',
      dataIndex: 'Amount',
      key: 'Amount',
    },
    {
      title: 'Paid',
      dataIndex: 'Paid',
      key: 'Paid',
    }
  ];

  const [unpaidOnlineLoanCount, setUnpaidOnlineLoanCount] = useState();
  const [unpaidPhysicalLoanCount, setUnpaidPhysicalLoanCount] = useState();

  useEffect(() => {
    getBranchInCount().then((data) => setUnpaidOnlineLoanCount(data));
  }, []);

  useEffect(() => {
    getBranchOutCount().then((data) => setUnpaidPhysicalLoanCount(data));
  }, []);

  const [unpaidOnlineLoan, setUnpaidOnlineLoan] = useState();
  const [unpaidPhysicalLoan, setUnpaidPhysicalLoan] = useState();

  // loan list is loaded on the first component render
  useEffect(() => loadUnpaidOnlineLoan(), []);
  useEffect(() => loadUnpaidPhysicalLoan(), []);

  function loadUnpaidOnlineLoan() {
    getBranchInReport()
      .then((data) => {
        setUnpaidOnlineLoan(data);
      })
      .catch((err) => console.log(err));
  }

  function loadUnpaidPhysicalLoan() {
    getBranchOutReport()
      .then((data) => {
        setUnpaidPhysicalLoan(data);
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
        <h1 className='topic'>Unpaid Loan Report</h1>
      </div>
      <div className='table'>

        <h2>Unpaid Physical Loan Report</h2>
        <Table dataSource={unpaidPhysicalLoan} columns={columns} />
        <p>
          <b>Unpaid Physical Loan Count: </b>
          {unpaidPhysicalLoanCount?.count}
        </p>
      </div>

      <div className='table'>
        <h2>Unpaid Online Loan Report</h2>
        {<Table dataSource={unpaidOnlineLoan} columns={columns} />}
        <p>
          <b>Unpaid Online Loan Count: </b>
          {unpaidOnlineLoanCount?.count}
        </p>
      </div>
    </div>
  );
}
