import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Card } from 'antd';
import { addCustomer } from '../api/customers';
import * as Yup from 'yup';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';
import Logo from '../pages/Images/Logo2.png';
import '../pages/PageStyling/Navbar.css';

// Use this instead https://github.com/jannikbuschke/formik-antd
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
    setSubmitting(true);
    const customer = {
      name: values.name,
      dateofbirth: values.dob,
      address: values.address,
      phone: values.phone,
      occupation: values.occupation,
    };
    addCustomer({ customer }).then(() => setSubmitting(false));
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className='navbar'>
        <img
          className='aruci--logo'
          src={Logo}
          alt='ARUCI Logo'
          onClick={() => navigate('/employeePortal/')}
        />
        <h1 className='topic'>Customer Registration</h1>
      </div>
      <Card className='form'>
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
                  <Field type='date' name='dob' placeholder='Date of Birth' />
                </span>
                <span>
                  <Field type='text' name='address' placeholder='Address' />
                </span>
                <span>
                  <Field type='text' name='phone' placeholder='Phone' />
                </span>
                <span>
                  <Field
                    type='text'
                    name='occupation'
                    placeholder='Occupation'
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
                    <Card className='errors'>
                      <ErrorMessage name='name' component='div' />
                      <ErrorMessage name='dob' component='div' />
                      <ErrorMessage name='address' component='div' />
                      <ErrorMessage name='phone' component='div' />
                      <ErrorMessage name='occupation' component='div' />
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
