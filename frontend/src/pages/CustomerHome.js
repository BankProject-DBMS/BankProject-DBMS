import React from 'react';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';
import { Breadcrumb, Layout, Menu } from 'antd';
import { getCustomerAccounts } from '../api/accounts';
const { Header, Content, Footer } = Layout;

export default function CustomerHome(props) {
  const [accounts, setAccounts] = React.useState([]);

  React.useEffect(() => {
    getCustomerAccounts(props.customerID)
      .then((data) => setAccounts(data))
      .catch((err) => alert(err));
  }, [props?.customerID]);

  console.log(accounts);

  const accountsList = accounts.map((account) => (
    <li key={account.AccountID}>{account.AccountID}</li>
  ));

  return (
    <div>
      <div>
        <h2>Cash Accounts</h2>
        <ul>{accountsList}</ul>
      </div>
    </div>
  );
}
