import React from 'react';
import { Link } from 'react-router-dom';

export default function CustomerHandling() {
  return (
    <div>
      <div>
        <Link to='customer-register'>Register New Customer</Link>
      </div>

      <div>
        <Link to='customer-list'>Customer List</Link>
      </div>

      <div>
        <Link to='online-customer-register'>Register New Online Customer</Link>
      </div>
    </div>
  );
}
