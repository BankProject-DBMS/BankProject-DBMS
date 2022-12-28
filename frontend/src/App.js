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
import FixedDepositReg from './Forms/FixedDepositReg';
import LoanReg from './Forms/LoanReg';
import LoanList from './Forms/LoanList';

// import for customer portal
import CustomerHome from './pages/CustomerHome';

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

            <Route exact path='/employeePortal' element={<EmployeeHome />} />
            <Route path='customer-register' element={<CustomerReg />} />
            <Route path='customer-list' element={<CustomerList />} />
            <Route path='customer/:customerId' element={<CustomerEditor />} />
            <Route path='account-register' element={<AccountReg/>}/>
            <Route path='account-list' element={<AccountList/>}/>
            <Route path='fixed-deposit-register' element={<FixedDepositReg/>}/>
            <Route path='loan-register' element={<LoanReg/>}/>
            <Route path='loan-list' element={<LoanList/>}/>

          </Route>

          {/* // customer portal */}
          <Route path='/customerPortal'>

            <Route
              exact
              path='/customerPortal'
              element={<CustomerHome customerID={4} />}
            />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
