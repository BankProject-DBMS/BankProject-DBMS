import { useState, useEffect } from 'react';
import { getAccount } from '../../api/accounts';
import { Table } from 'antd';
import { useParams } from 'react-router-dom';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';
import Logo from '../Images/Logo2.png';

import {
  getCreditTransactions,
  getDebitTransactions,
} from '../../api/transactions';

export default function AccountView() {
  const [account, setAccount] = useState();
  const [creditTransactions, setCreditTransactions] = useState();
  const [debitTransactions, setDebitTransactions] = useState();

  const { accountID } = useParams();
  useEffect(() => {
    console.log(accountID);
    getAccount(accountID).then((data) => setAccount(data));
    getCreditTransactions(accountID).then((data) =>
      setCreditTransactions(data)
    );
    getDebitTransactions(accountID).then((data) => setDebitTransactions(data));
  }, [accountID]);
  console.log(debitTransactions);
  const columns = [
    {
      title: 'Transaction ID',
      dataIndex: 'transactionID',
      key: 'transactionID',
    },
    {
      title: 'Transaction Time',
      dataIndex: 'transactionTime',
      key: 'transactionTime',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
    },
  ];
  const navigate = useNavigate();

  return (
    <div>
      <div className='navbar'>
        <img className='aruci--logo' src={Logo} onClick={() => navigate('/')} />
        <h1 className='topic'>Account Details</h1>
      </div>
      <div style={{ padding: '1%', margin: '2%', border: 'solid' }}>
        <p>
          <b>Account ID: </b>
          {account?.AccountID}
        </p>
        <p>
          <b>Branch ID: </b>
          {account?.BranchID}
        </p>
        <p>
          <b>Customer ID: </b>
          {account?.CustomerID}
        </p>
        <p>
          <b>Date Created: </b>
          {account?.DateCreated}
        </p>
        <p>
          <b>Balance: </b>Rs.{account?.Balance}
        </p>
      </div>

      <div style={{ margin: '2% 2%' }}>
        <h2>Credit Transactions</h2>
        <Table columns={columns} dataSource={creditTransactions} />

        <h2>Debit Transactions</h2>
        <Table columns={columns} dataSource={debitTransactions} />
      </div>
    </div>
  );
}
