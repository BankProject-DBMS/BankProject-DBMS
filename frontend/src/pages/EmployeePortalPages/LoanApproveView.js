import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getPhysicalLoanByID,
  approveLoan,
  rejectLoan,
} from '../../api/physloans';
import Logo from '../Images/Logo2.png';
import { Button } from 'antd';

export default function LoanApproveView() {
  const { loanID } = useParams();
  const [loan, setLoan] = useState();

  useEffect(() => {
    getPhysicalLoanByID(loanID).then((data) => {
      console.log(data);
      setLoan(data);
    });
  }, [loanID]);

  const navigate = useNavigate();

  const handleApprove = () => {
    approveLoan(loanID)
      .then(() => {
        navigate('/employeePortal/loan-approval');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReject = () => {
    rejectLoan(loanID)
      .then(() => {
        navigate('/employeePortal/loan-approval');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className='navbar'>
        <img
          className='aruci--logo'
          src={Logo}
          alt='logo'
          onClick={() => navigate('/employeePortal/')}
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          type='primary'
          style={{ marginRight: '50px' }}
          onClick={handleApprove}
        >
          Approve
        </Button>
        <Button
          danger
          type='primary'
          style={{ marginLeft: '50px' }}
          onClick={handleReject}
        >
          Reject
        </Button>
      </div>
    </div>
  );
}
