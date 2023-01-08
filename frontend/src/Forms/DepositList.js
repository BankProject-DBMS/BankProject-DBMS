import React from 'react';

import { getDeposites } from '../api/deposites';
import { Table } from 'antd';

export default function DepositList() {
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
      dataIndex: 'DepositTime',
      key: 'DepositTime',
    },
  ];

  const [Deposit, setDeposit] = React.useState();
  //const [loading, setLoading] = useState(true);

  React.useEffect(() => loadDepositList(), []);

  function loadDepositList() {
    getDeposites()
      .then((data) => {
        setDeposit(data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h1>Deposit List</h1>

      {<Table dataSource={Deposit} columns={columns} />}
    </div>
  );
}
