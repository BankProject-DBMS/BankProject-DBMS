import React from 'react';

import { getWithdrawals } from '../api/withdrawals';
import { Table } from 'antd';
import Logo from '../pages/Images/Logo2.png';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';
import '../pages/PageStyling/Navbar.css'

export default function WithdrawalList() {
  const columns = [
    {
      title: 'Widthdrawal ID',
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
    {
      title: 'Remarks',
      dataIndex: 'Remark',
      key: 'Remark',
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
      .catch((err) => console.log(err));
  }

  const navigate = useNavigate();

  return (
    <div>
      <div className='navbar'>
        <img 
        className='aruci--logo' 
        src={Logo}
        onClick={() => navigate('/employeePortal/')} />
        <h1 className='topic'>Withdrawal List</h1>
      </div >
      <div className='table'>
      {<Table dataSource={Withdrawal} columns={columns} />}
      </div>
    </div>
  );
}
