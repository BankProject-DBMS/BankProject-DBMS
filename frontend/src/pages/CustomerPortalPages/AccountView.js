import { useState, useEffect } from 'react';
import { getAccount } from '../../api/accounts';
import { Table } from 'antd';
import { useParams } from 'react-router-dom';

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

  return (
    <div>
      <h2>Account View</h2>
      <p>Account ID: {account?.AccountID}</p>
      <p>Customer ID: {account?.CustomerID}</p>
      <p>Date Created: {account?.DateCreated}</p>
      <p>Balance: Rs.{account?.Balance}</p>

      <h3>Credit Transactions</h3>
      <Table columns={columns} dataSource={creditTransactions} />

      <h3>Debit Transactions</h3>
      <Table columns={columns} dataSource={debitTransactions} />
    </div>
  );
}
