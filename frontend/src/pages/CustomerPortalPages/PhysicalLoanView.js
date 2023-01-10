import { useState, useEffect } from 'react';
import { Table } from 'antd';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from '../Images/Logo2.png';

import {
  getCustomerPhysicalLoans,
  getPhysicalLoanInstallment,
} from '../../api/physloans';

export default function PhysicalLoanView() {
  const [loan, setLoan] = useState();
  const [physicalLoanInstallment, setPhysicalLaonInstallment] = useState();

  const { physicalLoanID } = useParams();

  useEffect(() => {
    console.log(physicalLoanID);
    getCustomerPhysicalLoans(physicalLoanID).then((data) => setLoan(data));
    getPhysicalLoanInstallment(physicalLoanID).then((data) =>
      setPhysicalLaonInstallment(data)
    );
  }, [physicalLoanID]);

  const columns = [
    {
      title: 'Installment ID',
      dataIndex: 'installmentID',
      key: 'installmentID',
    },
    {
      title: 'Deadline Date and Time',
      dataIndex: 'deadlineDate',
      key: 'deadlineDate',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      key: 'paid',
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
        <h1 className='topic'>Physical Loan Details</h1>
      </div>
      <div style={{ padding: '1%', margin: '2%', border: 'solid' }}>
        <p>
          <b>Loan ID: </b>
          {loan?.LoanID}
        </p>
        <p>
          <b>Coustomer ID: </b>
          {loan?.CustomerID}
        </p>
        <p>
          <b>Savings Account ID: </b>
          {loan?.SavingsAccountID}
        </p>
        <p>
          <b>Branch ID: </b>
          {loan?.BranchID}
        </p>
        <p>
          <b>Employee ID: </b>
          {loan?.EmployeeID}
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
          <b>Approved: </b>
          {loan?.Approved}
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
        <h2>Physical Loan Installments</h2>
        <Table columns={columns} dataSource={physicalLoanInstallment} />
      </div>
    </div>
  );
}
