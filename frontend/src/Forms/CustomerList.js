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


  const [Customer, setCustomer] = React.useState();
  //const [loading, setLoading] = useState(true);

  React.useEffect(() => loadCustomerList(), []);

  /*const onDelete = (id) => {
React.useEffect(() => loadCustomerList(), []);

/*const onDelete = (id) => {
    deleteEmployee(id);
    loadEmployeeList();
  };*/

  function loadCustomerList() {
    getCustomers()
      .then((data) => {
        setCustomer(data);
      })
      .catch((err) => alert(err));
  }

  //loadCustomerList();
  //console.log(Customer);
  return (
    <div>
      <h1>Customer List</h1>

      {<Table dataSource={Customer} columns={columns} />}
    </div>
  );
}
