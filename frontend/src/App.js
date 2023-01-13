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
import EmployeeReg from './Forms/EmployeeReg';
import EmployeeList from './Forms/EmpoyeeList';

import FixedDepositReg from './Forms/FixedDepositReg';
import LoanReg from './Forms/LoanReg';
import LoanList from './Forms/LoanList';
import CustomerLogin from './pages/LoginPages/CustomerLogin';
import EmployeeLogin from './pages/LoginPages/EmployeeLogin';
import RequireAuth from './utils/RequireAuth';
import WithdrawalList from './Forms/WithdrawalList';
import WithdrawalCreate from './Forms/WithdrawalCreate';
import DepositList from './Forms/DepositList';
import DepositCreate from './Forms/DepositCreate';
import OnlineBankingReg from './Forms/OnlineCustomerReg';
import TransactionCreate from './Forms/TransactionCreate';
import TransactionList from './Forms/TransactionList';

// import for customer portal
import CustomerHome from './pages/CustomerHome';
import AccountView from './pages/CustomerPortalPages/AccountView';
import FixedDepositView from './pages/CustomerPortalPages/FixedDepositView';
import OnlineLoanView from './pages/CustomerPortalPages/OnlineLoanView';
import PhysicalLoanView from './pages/CustomerPortalPages/PhysicalLoanView';
import OnlineBanking from './pages/CustomerPortalPages/OnlineBanking';
import OnlineLoanReg from './pages/CustomerPortalPages/OnlineLoanReg';
import ApprovalLoansList from './Forms/ApprovalLoansList';
import PayOnlineLoanInstallment from './pages/CustomerPortalPages/PayOnlineLoanInstallment';
import PayPhysicalLoanInstallment from './pages/CustomerPortalPages/PayPhysicalLoanInstallment';
// import for home page
import HomePage from './pages/HomePage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoanApproveView from './pages/EmployeePortalPages/LoanApproveView';
import TransactionReport from './pages/EmployeePortalPages/TransactionReport';
import LoanReport from './pages/EmployeePortalPages/LoanReport';

function App() {
  return (
    <div className='App'>
      <nav></nav>
      {/* <CustomerReg className="centered" /> */}
      {/* <CustomerList className="customer" /> */}
      <BrowserRouter>
        <Routes>
          {/* // employee portal */}
          <Route
            path='/employeePortal/*'
            element={
              <RequireAuth redirectTo='/employeeLogin' authRole={'employee'}>
                <Route exact path='' element={<EmployeeHome />} />
                <Route path='customer-register' element={<CustomerReg />} />
                <Route path='customer-list' element={<CustomerList />} />
                <Route
                  path='customer/:customerId'
                  element={<CustomerEditor />}
                />
                <Route
                  path='online-customer-register'
                  element={<OnlineBankingReg />}
                />

                <Route path='employee-register' element={<EmployeeReg />} />
                <Route path='employee-list' element={<EmployeeList />} />

                <Route path='account-register' element={<AccountReg />} />
                <Route path='account-list' element={<AccountList />} />
                <Route
                  path='account-list/:accountID'
                  element={<AccountView />}
                />
                <Route
                  path='fixed-deposit-register'
                  element={<FixedDepositReg />}
                />

                <Route path='loan-register' element={<LoanReg />} />
                <Route path='loan-list' element={<LoanList />} />
                <Route
                  path='loan-approval/*'
                  element={
                    <RequireAuth
                      redirectTo='/employeePortal'
                      authRole={'manager'}
                    >
                      <Route exact path='/' element={<ApprovalLoansList />} />
                      <Route path=':loanID' element={<LoanApproveView />} />
                    </RequireAuth>
                  }
                />
                <Route path='withdrawal-list' element={<WithdrawalList />} />
                <Route
                  path='withdrawal-newWithdrawal'
                  element={<WithdrawalCreate />}
                />
                <Route path='deposit-list' element={<DepositList />} />
                <Route path='deposit-newDeposit' element={<DepositCreate />} />

                <Route
                  path='transaction-newTransaction'
                  element={<TransactionCreate />}
                />
                <Route path='transaction-list' element={<TransactionList />} />

                <Route
                  path='transaction-report/*'
                  element={
                    <RequireAuth
                      redirectTo='/employeePortal'
                      authRole={'manager'}
                    >
                      <Route exact path='/' element={<TransactionReport />} />
                    </RequireAuth>
                  }
                />
                <Route
                  path='loan-report/*'
                  element={
                    <RequireAuth
                      redirectTo='/employeePortal'
                      authRole={'manager'}
                    >
                      <Route exact path='/' element={<LoanReport />} />
                    </RequireAuth>
                  }
                />
              </RequireAuth>
            }
          ></Route>
          <Route path='/employeeLogin'>
            <Route
              exact
              path='/employeeLogin'
              element={<EmployeeLogin className='customer-login' />}
            />
          </Route>

          {/* // customer portal */}
          <Route
            path='/customerPortal/*'
            element={
              <RequireAuth redirectTo='/customerLogin' authRole={'customer'}>
                <Route exact path='' element={<CustomerHome />} />
                <Route path='account/:accountID' element={<AccountView />} />
                <Route path='onlineBanking' element={<OnlineBanking />} />
                <Route path='onlineLoan' element={<OnlineLoanReg />} />
                <Route
                  path='fixedDeposits/:fixedDepositID'
                  element={<FixedDepositView />}
                />
                <Route
                  path='onlineLoans/:loanID'
                  element={<OnlineLoanView />}
                />
                <Route
                  path='physicalLoans/:physicalLoanID'
                  element={<PhysicalLoanView />}
                />
                <Route
                  path='online-loan-installment/:InstallmentID'
                  element={<PayOnlineLoanInstallment />}
                />
                <Route
                  path='physical-loan-installment/:InstallmentID'
                  element={<PayPhysicalLoanInstallment />}
                />
              </RequireAuth>
            }
          ></Route>
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
