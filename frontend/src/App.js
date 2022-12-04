// import logo from './logo.svg';
import './App.css';
// import AuthenticationForm from './Forms/AuthenticationForm';
import CustomerReg from './Forms/CustomerReg';
import CustomerList from './Forms/CustomerList';

function App() {
  return (
    <div className="App">
      <CustomerReg className="centered" />
      <CustomerList className="customer" />
    </div >
  );
}

export default App;
