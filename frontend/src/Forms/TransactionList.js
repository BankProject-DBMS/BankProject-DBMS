import React from 'react';
import { getTransactions } from '../api/transactions';
import { Table } from 'antd';
import Logo from '../pages/Images/Logo2.png';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';
import '../pages/PageStyling/Navbar.css';

export default function TransactionList() {
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

  const [Transaction, setTransaction] = React.useState();
  //const [loading, setLoading] = useState(true);

  React.useEffect(() => loadTransactionList(), []);

  function loadTransactionList() {
    getTransactions()
      .then((data) => {
        console.log(data);
        setTransaction(data);
      })
      .catch((err) => console.log(err));
  }

  const navigate = useNavigate();

  return (
    <div>
      <div className='navbar'>
        <img
          className='aruci--logo'
          src={Logo}
          onClick={() => navigate('/employeePortal/')}
        />
        <h1 className='topic'>Transaction List</h1>
      </div>
      <div className='table'>
        {<Table dataSource={Transaction} columns={columns} />}
      </div>
    </div>
  );
}
