import React from 'react';

import { getDeposites } from '../api/deposits';
import { Table } from 'antd';
import { Navigate, useNavigate, Outlet, Link } from 'react-router-dom';
import Logo from '../pages/Images/Logo2.png';
import '../pages/PageStyling/Navbar.css';

export default function DepositList() {
  const columns = [
    {
      title: 'Deposit ID',
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
    {
      title: 'Remarks',
      dataIndex: 'Remark',
      key: 'Remark',
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
  const navigate = useNavigate();

  return (
    <div>
      <div className='navbar'>
        <img
          className='aruci--logo'
          src={Logo}
          onClick={() => navigate('/employeePortal/')}
        />
        <h1 className='topic'>Deposit List</h1>
      </div>
      <div className='table'>
        {<Table dataSource={Deposit} columns={columns} />}
      </div>
    </div>
  );
}
