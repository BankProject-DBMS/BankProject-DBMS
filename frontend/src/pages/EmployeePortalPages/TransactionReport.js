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

export default function TransactionReport() {
  const columns = [
    {
      title: 'Transaction ID',
      dataIndex: 'TransactionID',
      key: 'TransactionID',
    },
    {
      title: 'From Account ID',
      dataIndex: 'FromAccount',
      key: 'FromAccount',
    },
    {
      title: 'To Account ID',
      dataIndex: 'ToAccount',
      key: 'ToAccount',
    },
    {
      title: 'Amount Rs.',
      dataIndex: 'Amount',
      key: 'Amount',
    },
    {
      title: 'Date-Time',
      dataIndex: 'TransactionTime',
      key: 'TransactionTime',
    },
    {
      title: 'Remarks',
      dataIndex: 'Remark',
      key: 'Remark',
    },
  ];

  const [inCount, setInCount] = useState();
  const [OutCount, setOutCount] = useState();

  useEffect(() => {
    getBranchInCount().then((data) => setInCount(data));
  }, []);

  useEffect(() => {
    getBranchOutCount().then((data) => setOutCount(data));
  }, []);

  const [inTransaction, setInTransaction] = useState();
  const [outTransaction, setOutTransaction] = useState();

  // loan list is loaded on the first component render
  useEffect(() => loadInTransactionList(), []);
  useEffect(() => loadOutTransactionList(), []);

  function loadInTransactionList() {
    getBranchInReport()
      .then((data) => {
        setInTransaction(data);
      })
      .catch((err) => console.log(err));
  }

  function loadOutTransactionList() {
    getBranchOutReport()
      .then((data) => {
        setOutTransaction(data);
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
        <h1 className='topic'>Transaction Report</h1>
      </div>
      <div className='table'>
        {/* {console.log(inTransaction)} */}

        <h2>Incoming Transaction List</h2>
        <Table dataSource={inTransaction} columns={columns} />
        <p>
          <b>Incoming Transaction Count: </b>
          {inCount?.count}
        </p>
      </div>

      <div className='table'>
        <h2>Outgoing Transaction List</h2>
        {<Table dataSource={outTransaction} columns={columns} />}
        <p>
          <b>Outgoing Transaction Count: </b>
          {OutCount?.count}
        </p>
      </div>
    </div>
  );
}
