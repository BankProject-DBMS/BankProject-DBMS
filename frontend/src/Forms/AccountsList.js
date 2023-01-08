import React from 'react';

import { getAccounts } from '../api/accounts';
import { Table } from 'antd';
import { Navigate, useNavigate, Outlet, Link } from 'react-router-dom';
import Logo from '../pages/Images/Logo2.png';
import '../pages/PageStyling/Navbar.css'

export default function AccountList() {
  const columns = [
    {
      title: 'Account Number',
      dataIndex: 'AccountID',
      key: 'AccountID',
      // type the code for redirect to anther page when the account number is clicked
      render : (text, record) => <Link to={`/employeePortal/account-list/${record.AccountID}`}>{text}</Link> 
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
      .catch((err) => console.log(err));
  }
  const navigate = useNavigate();

  //loadAccountList();
  //console.log(Account);
  return (
    <div>
      <div className='navbar'>
        <img 
        className='aruci--logo' 
        src={Logo}
        onClick={() => navigate('/employeePortal/')} />
        <h1 className='topic'>Account List</h1>
      </div>

      <div className='table'>
        {<Table 
            dataSource={accounts} 
            columns={columns}
             />}
      </div>
    </div>
  );
}
