import React from 'react';

export default function EmployeeHome() {
  return (
    <div
      style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}
    >
      <h2>
        <a href='employeePortal'>Employee Portal</a>
      </h2>
      <h2>
        <a href='customerPortal'>Customer Portal</a>
      </h2>
    </div>
  );
}
