import { useState, useEffect } from 'react';
import { getAccounts } from '../../api/accounts';
import { getCustomerFDs } from '../../api/fd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createOnlineLoan } from '../../api/onlineloans';
import Logo from '../Images/Logo2.png';
import * as Yup from 'yup';
export default function OnlineLoanReg() {
  const [accounts, setAccounts] = useState([]);
  const [fds, setFds] = useState([]);
  const [selectedFD, setSelectedFD] = useState();

  const navigate = useNavigate();

  const maxAmount = selectedFD
    ? selectedFD.Amount * 0.6 > 500000
      ? 500000
      : selectedFD.Amount * 0.6
    : 500000;

  const validateAmount = (value) => {
    let error;
    // console.log(value);
    if (!value) {
      error = 'Amount is required';
    } else if (value > maxAmount) {
      error = `Cannot be greater than ${maxAmount}`;
    }
    return error;
  };

  const customerRegSchema = Yup.object().shape({
    myAccountID: Yup.number().required(),
    fdAccountID: Yup.number().required(),
    duration: Yup.number().required(),
  });

  useEffect(() => {
    getAccounts().then((accounts) => {
      setAccounts(accounts);
    });
    getCustomerFDs().then((fd) => {
      setFds(fd);
    });
  }, []);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('in handle submit', values);
    setSubmitting(true);
    const loan = {
      fdAccountID: parseInt(values.fdAccountID, 10),
      amount: values.amount,
      duration: values.duration,
      savingsAccountID: parseInt(values.myAccountID, 10),
    };
    createOnlineLoan({ loan }).then(() => {
      setSubmitting(false);
      navigate('/customerPortal');
    });
  };

  let options = accounts.map((account) => (
    <option key={account.AccountID} value={account.AccountID}>
      {account.AccountID}
    </option>
  ));
  options = [
    <option selected disabled>
      Choose Savings Account
    </option>,
    ...options,
  ];

  let optionsfd = fds.map((fd) => (
    <option key={fd.AccountID} value={fd.AccountID}>
      {fd.AccountID}
    </option>
  ));
  optionsfd = [
    <option selected disabled>
      Choose FD
    </option>,
    ...optionsfd,
  ];

  return (
    <div>
      <div className='navbar'>
        <img
          className='aruci--logo'
          src={Logo}
          onClick={() => navigate('/customerPortal/')}
          alt='logo'
        />
        <h1 className='topic'>Online Loan Registration</h1>
      </div>
      <Card className='form'>
        <Formik
          initialValues={{
            myAccountID: accounts[0]?.AccountID,
            fdAccountID: fds[0]?.AccountID,
            amount: '',
            duration: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={customerRegSchema}
        >
          {(props) => {
            return (
              <Form className='customer--reg--form'>
                <span>
                  <label htmlFor='myAccountID'>Savings Account ID </label>
                  <Field as='select' name='myAccountID'>
                    {options}
                  </Field>
                </span>
                <span>
                  <label htmlFor='fdAccountID'>FD Account ID </label>
                  <Field
                    as='select'
                    name='fdAccountID'
                    onChange={(e) => {
                      const fd = fds.find(
                        (fd) => fd.AccountID === parseInt(e.target.value, 10)
                      );
                      setSelectedFD(fd);
                      props.setFieldValue('fdAccountID', e.target.value);
                    }}
                  >
                    {optionsfd}
                  </Field>
                </span>
                <span>
                  <Field
                    type='number'
                    name='amount'
                    placeholder='Amount'
                    validate={validateAmount}
                  />
                </span>
                <span>
                  <Field
                    type='number'
                    name='duration'
                    placeholder='Duration in Months'
                  />
                </span>

                <Button
                  className='loan--reg--form--submit'
                  type='primary'
                  onClick={props.handleSubmit}
                  disabled={props.isSubmitting}
                >
                  Submit
                </Button>

                {Object.values(props.touched).includes(true) &&
                  Object.values(props.errors).length !== 0 && (
                    <Card className='errors'>
                      <ErrorMessage name='myAccountID' />
                      <ErrorMessage name='fdAccountID' />
                      <ErrorMessage name='amount' />
                      <ErrorMessage name='duration' />
                    </Card>
                  )}
              </Form>
            );
          }}
        </Formik>
      </Card>
    </div>
  );
}
