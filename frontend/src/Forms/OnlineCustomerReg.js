import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Card } from 'antd';
import { addOnlineCustomer } from '../api/onlineCustomers';
import * as Yup from 'yup';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';
import Logo from '../pages/Images/Logo2.png';
import '../pages/PageStyling/Navbar.css';

// Use this instead https://github.com/jannikbuschke/formik-antd
export default function OnlineCustomerReg() {
  const OnlineCustomerRegSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
    customerID: Yup.number().required(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    const onlineCustomer = {
      username: values.username,
      password: values.password,
      customerID: values.customerID,
    };
    //console.log(fd);
    addOnlineCustomer({ onlineCustomer }).then(() => setSubmitting(false));
  };
  const navigate = useNavigate();

  return (
    <div>
      <div className='navbar'>
        <img
          className='aruci--logo'
          src={Logo}
          onClick={() => navigate('/employeePortal/')}
        />
        <h1 className='topic'>Online Customer Registration</h1>
      </div>
      <Card className='form'>
        <Formik
          initialValues={{
            username: '',
            password: '',
            customerID: '',
          }}
          validationSchema={OnlineCustomerRegSchema}
          onSubmit={handleSubmit}
        >
          {(props) => {
            const errorInputStyle = {
              borderColor: 'red',
            };
            return (
              <Form className='fd--reg--form'>
                <span className='fd--reg--form--fillers'>
                  <Field
                    type='text'
                    name='customerID'
                    placeholder='Customer ID'
                    style={
                      props.touched.name && props.errors.name
                        ? errorInputStyle
                        : null
                    }
                  />
                </span>

                <span className='fd--reg--form--fillers'>
                  <Field type='text' name='username' placeholder='Username' />
                </span>

                <span className='fd--reg--form--fillers'>
                  <Field type='password' name='password' placeholder='Password' />
                </span>

                <span className='fd--reg--form--fillers'>
                  <Field type='password' name='confirmpassword' placeholder='Confirm Password' />
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
                      <ErrorMessage name='customerID' component='div' />
                      <ErrorMessage name='username' component='div' />
                      <ErrorMessage name='password' component='div' />
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
