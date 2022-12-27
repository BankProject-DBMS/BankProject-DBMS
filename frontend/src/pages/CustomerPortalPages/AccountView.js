import { useState, useEffect } from 'react';
import { getAccount } from '../../api/accounts';

export default function AccountView(props) {
  const [account, setAccount] = useState();

  useEffect(() => {
    getAccount(props.accountID).then((data) => setAccount(data));
    console.log('Use Effect Ran');
  }, [props?.accountID]);

  //   return an react component with account data rendered nicely

  return (
    <div>
      <h2>Account View</h2>
      <p>Account ID: {account?.AccountID}</p>
      <p>Account Number: {account?.CustomerID}</p>
      <p>Date Created: {account?.DateCreated}</p>
      <p>Balance: Rs.{account?.Balance}</p>
    </div>
  );
}
