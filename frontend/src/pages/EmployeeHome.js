import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, Button } from 'antd';
import CustomerHandling from './EmployeePortalPages/CustomerHandling';
import AccountHandling from './EmployeePortalPages/AccountHandling';
import LoanHandling from './EmployeePortalPages/LoanHandling';
import WithdrawalHandling from './EmployeePortalPages/WithdrawalHandling';
import { customerLogout } from '../api/auth';
import Logo from './Images/Logo2.png';
import './PageStyling/EmployeeHome.css';
import ManagerReports from './EmployeePortalPages/ManagerReports';
import EmployeeHandling from './EmployeePortalPages/EmployeeHandling';

const { Header, Content, Footer } = Layout;

function getItem(label, key, component, disabled, icon, children) {
  return {
    key,
    icon,
    children,
    label,
    component,
    disabled,
  };
}

export default function EmployeeHome() {
  const [Links, setLinks] = useState(<h1>ARUCI</h1>);
  const [items, setItems] = useState([
    getItem('Customer', '0', <CustomerHandling />),
    getItem('Account', '1', <AccountHandling />),
    getItem('Loan', '2', <LoanHandling />),
    getItem('Withdrawal', '3', <WithdrawalHandling />),
    getItem('Employee', '4', <EmployeeHandling />, true),
    getItem('Reports', '5', <ManagerReports />, true),
  ]);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'manager') {
      setItems((oldItems) => {
        let newItems = [...oldItems];
        newItems[4].disabled = false;
        newItems[5].disabled = false;
        return newItems;
      });
    }
  }, []);

  function handleClick(event) {
    console.log(items[event.key].label);
    setLinks(items[event.key].component);
  }

  const navigate = useNavigate();

  return (
    <div>
      <div className='navbar'>
        <div>
          <img
            className='aruci--logo'
            src={Logo}
            alt={'logo'}
            onClick={() => navigate('/')}
          />
        </div>
        <div className='employeePortal--menu'>
          <Menu
            theme='light'
            mode='horizontal'
            items={items}
            onClick={handleClick}
          />
        </div>
        <div className='employeePortal--buttons'>
          <Button
            danger
            className='employeePortal--button'
            color='red'
            onClick={() => {
              customerLogout().then(() => navigate(`/employeeLogin`));
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      <Content style={{ padding: '0 50px' }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <div className='site-layout-content'>{Links}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        ARUCI ©2022 Created by ARUCI UI
      </Footer>
    </div>
  );
}
