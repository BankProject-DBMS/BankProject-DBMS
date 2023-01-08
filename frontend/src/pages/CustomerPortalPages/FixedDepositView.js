import { useState, useEffect } from 'react';
import { getFD } from '../../api/fd';
import { useParams } from 'react-router-dom';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';
import Logo from '../Images/Logo2.png';

export default function FixedDepositView() {
  const [account, setAccount] = useState();

  const { fixedDepositID } = useParams();
  useEffect(() => {
    console.log(fixedDepositID);
    getFD(fixedDepositID).then((data) => setAccount(data));
  }, [fixedDepositID]);

  const navigate = useNavigate();

  return (
    <div>
      <div className='navbar'>
        <img 
        className='aruci--logo' 
        src={Logo}
        onClick={() => navigate('/customerPortal/')} />
        <h1 className='topic'>Fixed Deposit Details</h1>
      </div>
      <div style={{padding: '1%', margin: "2%", border: 'solid'}}>
      <p><b>Fixed Deposite Account ID: </b>{account?.AccountID}</p>
      <p><b>Fixed Deposit Type ID: </b>{account?.TypeID}</p>
      <p><b>Saving Account ID: </b>{account?.SavingsAccountID}</p>
      <p><b>Amount: </b>Rs.{account?.Amount}</p>
      <p><b>Date Created: </b>{account?.DateCreated}</p>
      </div>
    </div>
  );
}
