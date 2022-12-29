import React from 'react';

import { getWithdrawals } from '../api/withdrawals';
import { Table } from 'antd';

export default function WithdrawalList() {
  const columns = [
    {
      title: 'Transaction ID',
      dataIndex: 'TransactionID',
      key: 'TransactionID',
    },
    {
      title: 'Account Number',
      dataIndex: 'AccountID',
      key: 'AccountID',
    },
    {
      title: 'Amount Rs.',
      dataIndex: 'Amount',
      key: 'Amount',
    },
    {
      title: 'Date-Time',
      dataIndex: 'WithdrawalTime',
      key: 'WithdrawalTime',
    },
  ];


  const [Withdrawal, setWithdrawal] = React.useState();
  //const [loading, setLoading] = useState(true);

  React.useEffect(() => loadWithdrawalList(), []);

  function loadWithdrawalList() {
    getWithdrawals()
      .then((data) => {
        setWithdrawal(data);
      })
      .catch((err) => alert(err));
  }

  return (
    <div>
      <h1>Withdrawal List</h1>

      {<Table dataSource={Withdrawal} columns={columns} />}
    </div>
  );
}
