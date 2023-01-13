import { useState, useEffect } from 'react';
import { getAccounts } from '../../api/accounts';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createTransaction } from '../../api/transactions';
import Logo from '../Images/Logo2.png';
import * as Yup from 'yup';
export default function OnlineBanking() {
  const [accounts, setAccounts] = useState([]);

  const navigate = useNavigate();

  const customerRegSchema = Yup.object().shape({
    myAccountID: Yup.string().required(),
    toAccountID: Yup.string().required(),
    amount: Yup.number().required(),
    remarks: Yup.string().required(),
  });

  useEffect(() => {
    getAccounts().then((accounts) => {
      setAccounts(accounts);
    });
  }, []);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(true);
    const transaction = {
      fromAccountID: values.myAccountID,
      toAccountID: values.toAccountID,
      amount: values.amount,
      remarks: values.remarks,
    };
    createTransaction(transaction).then(() => {
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
      Choose Account
    </option>,
    ...options,
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
        <h1 className='topic'>Online Banking</h1>
      </div>
      <Card className='form'>
        <Formik
          initialValues={{
            myAccountID: accounts[0]?.AccountID,
            toAccountID: '',
            amount: '',
            remarks: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={customerRegSchema}
        >
          {(props) => {
            return (
              <Form className='customer--reg--form'>
                <span>
                  <label htmlFor='myAccountID'>My Account ID</label>
                  <Field as='select' name='myAccountID'>
                    {options}
                  </Field>
                </span>
                <span>
                  <Field
                    type='number'
                    name='toAccountID'
                    placeholder='To Account'
                  />
                </span>
                <span>
                  <Field type='number' name='amount' placeholder='Amount' />
                </span>
                <span>
                  <Field type='text' name='remarks' placeholder='Remarks' />
                </span>

                <Button
                  className='customer--reg--form--submit'
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
                      <ErrorMessage name='toAccountID' />
                      <ErrorMessage name='amount' />
                      <ErrorMessage name='remarks' />
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
