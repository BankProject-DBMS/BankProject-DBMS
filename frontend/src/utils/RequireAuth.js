import { Navigate } from 'react-router-dom';
import { customerLoggedIn } from '../api/auth';

export default function RequireAuth({ children, redirectTo }) {
  const role = localStorage.getItem('role');
  let isAuthenticated = false;
  if (role === 'customer') {
    isAuthenticated = customerLoggedIn();
  } else if (role === 'employee') {
    // TODO
  }
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}
