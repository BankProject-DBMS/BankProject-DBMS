import { useState, useEffect } from 'react';
import { getFD } from '../../api/fd';
import { useParams } from 'react-router-dom';

export default function FixedDepositView() {
  const [account, setAccount] = useState();

  const { accountID } = useParams();
  useEffect(() => {
    console.log(accountID);
    getFD(accountID).then((data) => setAccount(data));
  }, [accountID]);


  return (
    <div>
      <h2>Fixed Deposit View</h2>
      <p>Fixed Deposite Account ID: {account?.AccountID}</p>
      <p>Fixed Deposit Type ID: {account?.TypeID}</p>
      <p>Saving Account ID: {account?.SavingAccountID}</p>
      <p>Amount: Rs.{account?.Amount}</p>
      <p>Date Created: {account?.DateCreated}</p>

    </div>
  );
}