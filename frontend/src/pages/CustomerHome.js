import React from 'react';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';
import { Button, Layout, Space, Divider, List, Typography } from 'antd';
import { getCustomerAccounts } from '../api/accounts';
import { getCustomerFDs } from '../api/fd';
import { getCustomerPhysicalLoans } from '../api/physloans';
import { getCustomerOnlineLoans } from '../api/onlineloans';
const { Header, Content, Footer } = Layout;

export default function CustomerHome(props) {
  const [accounts, setAccounts] = React.useState([]);
  const [fds, setFDs] = React.useState([]);
  const [oloans, setOLoans] = React.useState([]);
  const [ploans, setPloans] = React.useState([]);

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

  React.useEffect(() => {
    getCustomerPhysicalLoans(props.customerID)
      .then((data) => setPloans(data))
      .catch((err) => alert(err));
  }, [props?.customerID]);

  React.useEffect(() => {
    getCustomerOnlineLoans(props.customerID)
      .then((data) => setOLoans(data))
      .catch((err) => alert(err));
  }, [props?.customerID]);

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

  const pLoanList = ploans.map((account) => (
    <li key={account.LoanID}>
      <span>
        <div>Amount :{account.Amount}</div>
      </span>
    </li>
  ));

  const oLoanList = oloans.map((account) => (
    <li key={account.LoanID}>
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

  const pLoanAccs = (
    <div>
      <Divider orientation='left'>Loan Details</Divider>
      <List
        header={
          <div>
            <b>Physically Created</b>
          </div>
        }
        // footer={<div>Footer</div>}
        bordered
        dataSource={fdList}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark>
              Loan ID Number : {<bold>{item.key}</bold>}
            </Typography.Text>{' '}
            {item}
          </List.Item>
        )}
      />
    </div>
  );
  const oLoanAccs = (
    <div>
      <List
        header={
          <div>
            <b>Online Created</b>
          </div>
        }
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
      <ul>{pLoanAccs}</ul>
      <ul>{oLoanAccs}</ul>
    </div>
  );
}
