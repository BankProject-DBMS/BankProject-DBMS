import { Link } from 'react-router-dom';

export default function TransactionHandling() {
  return (
    <div>
      <div>
        <Link to='transaction-newTransaction'>New Transaction</Link>
      </div>
      <div>
        <Link to='transaction-list'>Transaction List</Link>
      </div>
    </div>
  );
}
