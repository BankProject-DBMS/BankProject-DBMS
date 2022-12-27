import React from 'react';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';
import { Breadcrumb, Layout, Menu } from 'antd';
import { getUserAccounts } from '../api/accounts';
const { Header, Content, Footer } = Layout;

export default function CustomerHome() {
  const [cashAccs, setCashAccs] = React.useState();
  const [FdAccs, setFdAccs] = React.useState();
  const [LoanAccs, setLoanAccs] = React.useState();

  React.useEffect(() => loadAccountList(), []);

  function loadAccountList() {
    getUserAccounts()
      .then((data) => {
        const Cash = data.Cash;
        const FD = data.FD;
        const Loan = data.Loan;
        setCashAccs(Cash);
        setFdAccs(FD);
        setLoanAccs(Loan);
      })
      .catch((err) => alert(err));
  }

  console.log(cashAccs);
  console.log(LoanAccs);
  console.log(FdAccs);

  const cas = cashAccs.map((cashAcc)=>{
    
  })
  return(
    <div>
        <div>
            <h2>Cash Accounts</h2>

        </div>
    </div>
  );
}
