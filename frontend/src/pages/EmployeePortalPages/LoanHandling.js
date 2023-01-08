import React from 'react';
import { Link } from 'react-router-dom';

export default function LoanHandling() {
  return (
    <div>
      <div>
        <Link to='loan-register'>Register New Loan</Link>
      </div>

      <div>
        <Link to='loan-list'>Loan List</Link>
      </div>
    </div>
  );
}
