import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'antd';
import { addCustomer } from '../api/customers';
import * as Yup from 'yup';

export default function CustomerReg() {
  const customerRegSchema = Yup.object().shape({
    name: Yup.string().required(),
    dob: Yup.date().required(),
    address: Yup.string().required(),
    phone: Yup.string()
      .matches(/(^[0-9]+$|^\+[0-9]+$)/, 'Invalid Phone Number')
      .min(10, 'Phone number must be at least 10 digits')
      .max(12, 'Phone number must be at most 12 digits')
      .required(),
    occupation: Yup.string().required(),
  });
  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));

      setSubmitting(false);
    }, 400);
  };
  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          dob: '',
          address: '',
          phone: '',
          occupation: '',
        }}
        validationSchema={customerRegSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form className='customer--reg--form'>
            <span>
              <Field type='text' name='name' placeholder='Full Name' />
              <ErrorMessage name='name' component='span' />
            </span>
            <span>
              <Field type='date' name='dob' placeholder='Date of Birth' />
              <ErrorMessage name='dob' component='span' />
            </span>
            <span>
              <Field type='text' name='address' placeholder='Address' />
              <ErrorMessage name='address' component='span' />
            </span>
            <span>
              <Field type='text' name='phone' placeholder='Phone' />
              <ErrorMessage name='phone' component='span' />
            </span>
            <span>
              <Field type='text' name='occupation' placeholder='Occupation' />
              <ErrorMessage name='occupation' component='span' />
            </span>

            <Button
              className='customer--reg--form--submit'
              type='primary'
              onClick={props.handleSubmit}
              disabled={props.isSubmitting}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
