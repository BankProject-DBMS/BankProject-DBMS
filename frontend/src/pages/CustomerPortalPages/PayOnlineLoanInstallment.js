import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getOnlineLoanInstallmentByID,
  payOnlineLoanInstallmentByID,
} from '../../api/onlineloans';
import Logo from '../Images/Logo2.png';
import { Button } from 'antd';

export default function OnlineLoanInstallmentPay() {
  const { InstallmentID } = useParams();
  const [Instalment, setInstallment] = useState();

  useEffect(() => {
    getOnlineLoanInstallmentByID(InstallmentID).then((data) => {
      console.log(data);
      setInstallment(data);
    });
  }, [InstallmentID]);

  const navigate = useNavigate();

  const handlePay = () => {
    payOnlineLoanInstallmentByID(InstallmentID)
      .then(() => {
        navigate(-1);
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
        <h1 className='topic'>Pay Loan Installment</h1>
      </div>
      <div style={{ padding: '1%', margin: '2%', border: 'solid' }}>
        <p>
          <b>Installment ID: </b>
          {Instalment?.InstallmentID}
        </p>
        <p>
          <b>Loan ID: </b>
          {Instalment?.LoanID}
        </p>
        <p>
          <b>Deadline Date: </b>
          {Instalment?.DeadlineDate}
        </p>
        <p>
          <b>Amount: </b>
          {Instalment?.Amount}
        </p>
        <p>
          <b>Paid: </b>
          {Instalment?.Paid}
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          type='primary'
          style={{ marginRight: '50px' }}
          onClick={handlePay}
        >
          Pay
        </Button>
      </div>
    </div>
  );
}
