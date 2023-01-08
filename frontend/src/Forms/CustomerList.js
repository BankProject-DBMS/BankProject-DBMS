import React from 'react';

import { getCustomers } from '../api/customers';
import { Table } from 'antd';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';
import Logo from '../pages/Images/Logo2.png';
import '../pages/PageStyling/Navbar.css'

export default function CustomerList() {
  const columns = [
    {
      title: 'Customer ID',
      dataIndex: 'CustomerID',
      key: 'CustomerID',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'DoB',
      dataIndex: 'dateofbirth',
      key: 'dateofbirth',
      defaultSortOrder: 'descend',
      sorter: (a, b) => {
        return Date.parse(a.dateofbirth) - Date.parse(b.dateofbirth);
      },
    },
    {
      title: 'Address',
      dataIndex: 'Address',
      key: 'Address',
    },
  ];

  const [customers, setCustomers] = React.useState();

  // customer list is loaded on the first component render
  React.useEffect(() => loadCustomerList(), []);

  function loadCustomerList() {
    getCustomers()
      .then((data) => {
        setCustomers(data);
      })
      .catch((err) => console.log(err));
  }

  const navigate = useNavigate();

  //loadCustomerList();
  //console.log(Customer);
  return (
    <div>
      <div className='navbar'>
        <img 
        className='aruci--logo' 
        src={Logo}
        onClick={() => navigate('/employeePortal/')} />
        <h1 className='topic'>Customer List</h1>
      </div>

      <div className='table'>{<Table dataSource={customers} columns={columns} />}</div>
    </div>
  );
}
