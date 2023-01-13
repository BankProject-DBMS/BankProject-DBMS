import { useState, useEffect } from 'react';
import { Table } from 'antd';
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../Images/Logo2.png';

import {
  getCustomerOnlineLoans,
  getOnlineLoanInstallment,
} from '../../api/onlineloans';

export default function OnlineLoanView() {
  const [loan, setLoan] = useState();
  const [onlineLoanInstallment, setOnlineLoanInstallment] = useState();

  const { loanID } = useParams();

  useEffect(() => {
    getCustomerOnlineLoans(loanID).then((data) => {
      setLoan(data[0]);
    });
    getOnlineLoanInstallment(loanID).then((data) =>
      setOnlineLoanInstallment(data)
    );
  }, [loanID]);
  //console.log(loan[0]);
  const columns = [
    {
      title: 'Installment ID',
      dataIndex: 'InstallmentID',
      key: 'InstallmentID',
      render: (text, record) => (
        <Link
          to={`/customerPortal/online-loan-installment/${record.InstallmentID}`}
        >
          {text}
        </Link>
      ),
    },
    {
      title: 'Deadline Date and Time',
      dataIndex: 'DeadlineDate',
      key: 'DeadlineDate',
    },
    {
      title: 'Amount',
      dataIndex: 'Amount',
      key: 'Amount',
    },
    {
      title: 'Paid',
      dataIndex: 'Paid',
      key: 'Paid',
    },
  ];
  const navigate = useNavigate();

  return (
    <div>
      <div className='navbar'>
        <img
          className='aruci--logo'
          src={Logo}
          onClick={() => navigate('/customerPortal/')}
        />
        <h1 className='topic'>Online Loan Details</h1>
      </div>
      <div style={{ padding: '1%', margin: '2%', border: 'solid' }}>
        <p>
          <b>Loan ID: </b>
          {loan?.LoanID}
        </p>
        <p>
          <b>Customer ID: </b>
          {loan?.CustomerID}
        </p>
        <p>
          <b>FD Account ID: </b>
          {loan?.FDAccountID}
        </p>
        <p>
          <b>Amount: </b>Rs.{loan?.Amount}
        </p>
        <p>
          <b>Saving Account ID: </b>
          {loan?.SavingsAccountID}
        </p>
        <p>
          <b>Date Created: </b>
          {loan?.DateCreated}
        </p>
        <p>
          <b>Duration: </b>
          {loan?.Duration}
        </p>
        <p>
          <b>Interest Rate: </b>
          {loan?.InterestRate}
        </p>
      </div>

      <div style={{ margin: '2% 2%' }}>
        <h2>Online Loan Installments</h2>
        <Table columns={columns} dataSource={onlineLoanInstallment} />
      </div>
    </div>
  );
}
