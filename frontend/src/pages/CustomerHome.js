import React from 'react';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';
import { Button, Layout, Space, Divider, List, Typography } from 'antd';
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
    <li key={account.AccountID}>
      <span>
        <div>Balance :{account.Balance}</div>
      </span>
    </li>
  ));

  const cashAccs = (
    <div>
      <Divider orientation='left'>Cash Accounts</Divider>
      <List
        // header={<div>Header</div>}
        // footer={<div>Footer</div>}
        bordered
        dataSource={accountsList}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark>
              Account Number : {<bold>{item.key}</bold>}
            </Typography.Text>{' '}
            {item}
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <div>
      <ul>{cashAccs}</ul>
    </div>
  );
}
