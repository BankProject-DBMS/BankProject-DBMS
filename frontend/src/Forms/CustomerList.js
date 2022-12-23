import React from 'react';

import { getCustomers } from '../api/customers';
import { Table } from 'antd';

export default function CustomerList() {
  const columns = [
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
      .catch((err) => alert(err));
  }

  //loadCustomerList();
  //console.log(Customer);
  return (
    <div>
      <h1>Customer List</h1>

      {<Table dataSource={customers} columns={columns} />}
    </div>
  );
}
