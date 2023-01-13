import { Link } from 'react-router-dom';
import { Card } from 'antd';

export default function TransactionHandling() {
  return (
    <div>
      <Card
        title='Transaction Handling'
        style={{
          borderRadius: 10,
          margin: '3% 1%',
          height: '180px',
          borderBlockColor: 'black',
        }}
      >
        <div>
          <Link to='transaction-newTransaction'>New Transaction</Link>
        </div>
        <div>
          <Link to='transaction-list'>Transaction List</Link>
        </div>
      </Card>
    </div>
  );
}
