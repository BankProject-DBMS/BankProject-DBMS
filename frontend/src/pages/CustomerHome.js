import React from 'react';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';
import { Button, Layout, Space, Divider, List, Typography } from 'antd';
import { getCustomerAccounts } from '../api/accounts';
import { getCustomerFDs } from '../api/fd';
import { getCustomerPhysicalLoans } from '../api/physloans';
import { getCustomerOnlineLoans } from '../api/onlineloans';
import { customerLogout } from '../api/auth';
import { getCustomer } from '../api/customers';

// for navbar data
import Logo from './Images/Logo2.png';
import './PageStyling/CustomerHome.css';

const { Header, Content, Footer } = Layout;

export default function CustomerHome(props) {
  const [accounts, setAccounts] = React.useState([]);
  const [fds, setFDs] = React.useState([]);
  const [oloans, setOLoans] = React.useState([]);
  const [ploans, setPloans] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    getCustomerAccounts()
      .then((data) => setAccounts(data))
      .catch((err) => console.log(err));
    getCustomerFDs()
      .then((data) => setFDs(data))
      .catch((err) => console.log(err));
    getCustomerPhysicalLoans()
      .then((data) => setPloans(data))
      .catch((err) => console.log(err));
    getCustomerOnlineLoans()
      .then((data) => setOLoans(data))
      .catch((err) => console.log(err));
  }, []);

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
            <Typography.Text
              style={{ cursor: 'pointer' }}
              mark
              onClick={(e) => navigate(`account/${item.key}`)}
            >
              Account Number : {<b>{item.key}</b>}
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
            <Typography.Text
              style={{ cursor: 'pointer' }}
              mark
              onClick={(e) => navigate(`fixedDeposits/${item.key}`)}
            >
              Account Number : {<b>{item.key}</b>}
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
        dataSource={pLoanList}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text
              style={{ cursor: 'pointer' }}
              mark
              onClick={(e) => navigate(`physicalLoans/${item.key}`)}
            >
              Physical Loan ID : {<b>{item.key}</b>}
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
        dataSource={oLoanList}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text
              style={{ cursor: 'pointer' }}
              mark
              onClick={(e) => navigate(`onlineLoans/${item.key}`)}
            >
              Online Loan ID : {<b>{item.key}</b>}
            </Typography.Text>{' '}
            {item}
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <div>
      <div className='navbar'>
        <img
          className='aruci--logo'
          src={Logo}
          alt={'logo'}
          onClick={() => navigate('/')}
        />
        <div className='customerPortal--buttons'>
          <Button
            className='customerPortal--button'
            onClick={() => navigate('onlineLoan')}
          >
            Online Loan
          </Button>
          <Button
            className='customerPortal--button'
            onClick={() => navigate('onlineBanking')}
          >
            Online Banking
          </Button>
          <Button
            danger
            className='customerPortal--button'
            color='red'
            onClick={() => {
              customerLogout().then(() => navigate(`/customerLogin`));
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div>
        <ul>{cashAccs}</ul>
        <ul>{fdAccs}</ul>
        <ul>{pLoanAccs}</ul>
        <ul>{oLoanAccs}</ul>
      </div>
    </div>
  );
}
