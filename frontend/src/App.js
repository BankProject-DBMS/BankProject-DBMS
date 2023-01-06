// import logo from './logo.svg';
import './App.css';
// import AuthenticationForm from './Forms/AuthenticationForm';

// import for employee portal
import EmployeeHome from './pages/EmployeeHome';
import CustomerReg from './Forms/CustomerReg';
import CustomerList from './Forms/CustomerList';
import CustomerEditor from './pages/EmployeePortalPages/CustomerEditor';
import AccountReg from './Forms/AccountReg';
import AccountList from './Forms/AccountsList';
import AccountView from './pages/CustomerPortalPages/AccountView';
import FixedDepositReg from './Forms/FixedDepositReg';
import LoanReg from './Forms/LoanReg';
import LoanList from './Forms/LoanList';
import CustomerLogin from './pages/LoginPages/CustomerLogin';
import EmployeeLogin from './pages/LoginPages/EmployeeLogin';
import RequireAuth from './utils/RequireAuth';

// import for customer portal
import CustomerHome from './pages/CustomerHome';

// import for home page
import HomePage from './pages/HomePage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <nav></nav>
      {/* <CustomerReg className="centered" /> */}
      {/* <CustomerList className="customer" /> */}
      <BrowserRouter>
        <Routes>
          {/* // employee portal */}
          <Route path='/employeePortal'>
            <Route
              exact
              path='/employeePortal'
              element={
                <RequireAuth role={role} redirectTo='/employeeLogin'>
                  <EmployeeHome />
                </RequireAuth>
              }
            />
            <Route path='customer-register' element={<CustomerReg />} />
            <Route path='customer-list' element={<CustomerList />} />
            <Route path='customer/:customerId' element={<CustomerEditor />} />
            <Route path='account-register' element={<AccountReg />} />
            <Route path='account-list' element={<AccountList />} />
            <Route
              path='fixed-deposit-register'
              element={<FixedDepositReg />}
            />
            <Route path='loan-register' element={<LoanReg />} />
            <Route path='loan-list' element={<LoanList />} />
          </Route>
          <Route path='/employeeLogin'>
            <Route
              exact
              path='/employeeLogin'
              element={<EmployeeLogin className='customer-login' />}
            />
          </Route>

          {/* // customer portal */}
          <Route path='/customerPortal'>
            <Route
              exact
              path='/customerPortal'
              element={
                <RequireAuth redirectTo='/customerLogin'>
                  <CustomerHome />
                </RequireAuth>
              }
            />
            <Route
              path='/customerPortal/account/:accountID'
              element={<AccountView />}
            />
          </Route>
          <Route path='/customerLogin'>
            <Route
              exact
              path='/customerLogin'
              element={<CustomerLogin className='customer-login' />}
            />
          </Route>
          {/* Home page */}
          <Route path='/' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
