import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'antd';
import { useParams } from 'react-router-dom';

import * as Yup from 'yup';
import { getCustomer, updateCustomer } from '../../api/customers';
import React from 'react';
// Use this instead https://github.com/jannikbuschke/formik-antd

export default function CustomerEditor() {
  let { customerId } = useParams();

  const [customer, setCustomer] = React.useState({});

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
    setSubmitting(true);
    const customer = {
      Name: values.name,
      dateofbirth: values.dob,
      Address: values.address,
      Phone: values.phone,
      occupation: values.occupation,
    };
    updateCustomer({ customer, customerId }).then(() => setSubmitting(false));
  };

  React.useEffect(() => loadCustomer(), []);

  function loadCustomer() {
    getCustomer(customerId)
      .then((data) => {
        console.log(data);
        setCustomer({ ...data });
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: customer.Name || '',
          dob: customer.dateofbirth || Date.toString(),
          address: customer.Address || '',
          phone: customer.Phone || '',
          occupation: customer.occupation || '',
        }}
        validationSchema={customerRegSchema}
        onSubmit={handleSubmit}
      >
        {(props) => {
          const errorInputStyle = {
            borderColor: 'red',
          };
          return (
            <Form className='customer--reg--form'>
              <span>
                <Field
                  type='text'
                  name='name'
                  placeholder='Full Name'
                  style={
                    props.touched.name && props.errors.name
                      ? errorInputStyle
                      : null
                  }
                />
              </span>
              <span>
                <Field
                  type='date'
                  name='dob'
                  placeholder='Date of Birth'
                  style={
                    props.touched.dob && props.errors.dob
                      ? errorInputStyle
                      : null
                  }
                />
              </span>
              <span>
                <Field
                  type='text'
                  name='address'
                  placeholder='Address'
                  style={
                    props.touched.address && props.errors.address
                      ? errorInputStyle
                      : null
                  }
                />
              </span>
              <span>
                <Field
                  type='text'
                  name='phone'
                  placeholder='Phone'
                  style={
                    props.touched.phone && props.errors.phone
                      ? errorInputStyle
                      : null
                  }
                />
              </span>
              <span>
                <Field
                  type='text'
                  name='occupation'
                  placeholder='Occupation'
                  style={
                    props.touched.occupation && props.errors.occupation
                      ? errorInputStyle
                      : null
                  }
                />
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
                  <div className='customer--reg--form--errors'>
                    <ErrorMessage name='name' component='div' />
                    <ErrorMessage name='dob' component='div' />
                    <ErrorMessage name='address' component='div' />
                    <ErrorMessage name='phone' component='div' />
                    <ErrorMessage name='occupation' component='div' />
                  </div>
                )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
