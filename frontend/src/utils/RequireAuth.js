import { Navigate } from 'react-router-dom';
import { customerLoggedIn, employeeLoggedIn } from '../api/auth';
import { Routes } from 'react-router-dom';

export default function RequireAuth({ children, redirectTo, authRole }) {
  const role = localStorage.getItem('role');
  console.log('In RequireAuth, role is: ' + role);
  let isAuthenticated = false;
  if (role === 'customer' && authRole === 'customer') {
    isAuthenticated = customerLoggedIn();
  } else if (role === 'employee' && authRole === 'employee') {
    isAuthenticated = employeeLoggedIn();
  }
  return isAuthenticated ? (
    <Routes>{children}</Routes>
  ) : (
    <Navigate to={redirectTo} />
  );
}
