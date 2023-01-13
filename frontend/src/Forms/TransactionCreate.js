import { useState, useEffect } from 'react';
import { getAccounts } from '../api/accounts';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createTransaction } from '../api/transactions';
import Logo from '../pages/Images/Logo2.png';
import * as Yup from 'yup';
export default function TransactionCreate() {
  const navigate = useNavigate();

  const customerRegSchema = Yup.object().shape({
    fromAccountID: Yup.number().positive().required(),
    toAccountID: Yup.number().positive().required(),
    amount: Yup.number().positive().required(),
    remarks: Yup.string().required(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(true);
    const transaction = {
      fromAccountID: values.fromAccountID,
      toAccountID: values.toAccountID,
      amount: values.amount,
      remarks: values.remarks,
    };
    createTransaction(transaction).then(() => setSubmitting(false));
  };

  return (
    <div>
      <div className='navbar'>
        <img
          className='aruci--logo'
          src={Logo}
          onClick={() => navigate('/employeePortal/')}
          alt='logo'
        />
        <h1 className='topic'>Create Transaction</h1>
      </div>
      <Card className='form'>
        <Formik
          initialValues={{
            fromAccountID: '',
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
                  <Field
                    type='text'
                    name='fromAccountID'
                    placeholder='From Account'
                  />
                </span>
                <span>
                  <Field
                    type='text'
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
                      <ErrorMessage name='fromAccountID' />
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
