import { useState, useEffect } from 'react';
import { getFD } from '../../api/fd';
import { useParams } from 'react-router-dom';

export default function FixedDepositView() {
  const [account, setAccount] = useState();

  const { fixedDepositID } = useParams();
  useEffect(() => {
    console.log(fixedDepositID);
    getFD(fixedDepositID).then((data) => setAccount(data));
  }, [fixedDepositID]);

  return (
    <div>
      <h2>Fixed Deposit View</h2>
      <p>Fixed Deposite Account ID: {account?.AccountID}</p>
      <p>Fixed Deposit Type ID: {account?.TypeID}</p>
      <p>Saving Account ID: {account?.SavingsAccountID}</p>
      <p>Amount: Rs.{account?.Amount}</p>
      <p>Date Created: {account?.DateCreated}</p>
    </div>
  );
}
