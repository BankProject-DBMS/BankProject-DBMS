import React from 'react';

import { getEmployees } from '../api/employee';
import { Table } from 'antd';
import { Navigate, useNavigate, Outlet, Link } from 'react-router-dom';
import Logo from '../pages/Images/Logo2.png';
import '../pages/PageStyling/Navbar.css';

export default function EmployeeList() {
  const columns = [
    {
      title: 'Employee ID',
      dataIndex: 'EmployeeID',
      key: 'EmployeeID',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Position',
      dataIndex: 'Position',
      key: 'Position',
    },
    {
      title: 'Branch ID',
      dataIndex: 'BranchID',
      key: 'BranchID',
    },
    
  ];

  const [Employee, setEmployee] = React.useState();
  //const [loading, setLoading] = useState(true);

  React.useEffect(() => loadEmployeeList(), []);

  function loadEmployeeList() {
    getEmployees()
      .then((data) => {
        setEmployee(data);
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
        <h1 className='topic'>Employee List</h1>
      </div>
      <div className='table'>
        {<Table dataSource={Employee} columns={columns} />}
      </div>
    </div>
  );
}
