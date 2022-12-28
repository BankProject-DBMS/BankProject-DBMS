import React from 'react';

import { getAccounts } from '../api/accounts';
import { Table } from 'antd';

export default function AccountList() {
  const columns = [
    {
      title: 'Account Number',
      dataIndex: 'AccountID',
      key: 'AccountID',
    },
    {
      title: 'Customer Number',
      dataIndex: 'CustomerID',
      key: 'CustomerID',
    },
    {
      title: 'Date Created',
      dataIndex: 'DateCreated',
      key: 'DateCreated',
    },
    {
      title: 'Type ID',
      dataIndex: 'TypeID',
      key: 'TypeID',
    },
    {
      title: 'Balance',
      dataIndex: 'Balance',
      key: 'Balance',
    },
    {
      title: 'Withdrawal Count',
      dataIndex: 'WCount',
      key: 'WCount',
    },
  ];

  const [accounts, setAccounts] = React.useState();

  // account list is loaded on the first component render
  React.useEffect(() => loadAccountList(), []);

  function loadAccountList() {
    getAccounts()
      .then((data) => {
        setAccounts(data);
      })
      .catch((err) => alert(err));
  }

  //loadAccountList();
  //console.log(Account);
  return (
    <div>
      <h1>Account List</h1>

      {<Table dataSource={accounts} columns={columns} />}
    </div>
  );
}
