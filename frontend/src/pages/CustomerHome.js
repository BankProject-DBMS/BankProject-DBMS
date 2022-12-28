import React from 'react';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';
import { Button, Layout, Space, Divider, List, Typography } from 'antd';
import { getCustomerAccounts } from '../api/accounts';
import { getCustomerFDs } from '../api/fd';
const { Header, Content, Footer } = Layout;

export default function CustomerHome(props) {
  const [accounts, setAccounts] = React.useState([]);
  const [fds, setFDs] = React.useState([]);

  React.useEffect(() => {
    getCustomerAccounts(props.customerID)
      .then((data) => setAccounts(data))
      .catch((err) => alert(err));
  }, [props?.customerID]);

  React.useEffect(() => {
    getCustomerFDs(props.customerID)
      .then((data) => setFDs(data))
      .catch((err) => alert(err));
  }, [props?.customerID]);

  console.log(fds);

  const accountsList = accounts.map((account) => (
    <li key={account.AccountID}>
      <span>
        <div>Balance :{account.Balance}</div>
      </span>
    </li>
  ));

  const fdList = fds.map((account) => (
    <li key={account.AccountID}>
      <span>
        <div>Amount :{account.Amount}</div>
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

  const fdAccs = (
    <div>
      <Divider orientation='left'>Fixed Deposits</Divider>
      <List
        // header={<div>Header</div>}
        // footer={<div>Footer</div>}
        bordered
        dataSource={fdList}
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
      <ul>{fdAccs}</ul>
    </div>
  );
}
