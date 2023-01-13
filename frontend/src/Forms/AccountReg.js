import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Card } from 'antd';
import { addAccount } from '../api/accounts';
import * as Yup from 'yup';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';
import Logo from '../pages/Images/Logo2.png';
import '../pages/PageStyling/Navbar.css';

// Use this instead https://github.com/jannikbuschke/formik-antd
export default function AccountReg() {
  // this is the schema for the form validation using Yup
  // fields validations
  const accountRegSchema = Yup.object().shape({
    customerID: Yup.number().required().positive().integer(),
    accountType: Yup.string().required(),
    initialBalance: Yup.number().required().min(2000.0),
  });
  console.log('Rendered');
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(true);
    const account = {
      customerID: values.customerID,
      accountType: values.accountType,
      initialBalance: values.initialBalance,
    };
    addAccount({ account }).then(() => setSubmitting(false));
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
        <h1 className='topic'>Account Registration</h1>
      </div>
      <Card className='form'>
        <Formik
          initialValues={{
            customerID: '',
            accountType: '',
            initialBalance: '',
          }}
          validationSchema={accountRegSchema}
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
                    type='number'
                    name='customerID'
                    placeholder='Customer ID'
                  />
                </span>
                <span>
                  <div
                    name='AccountType'
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'left',
                    }}
                  >
                    <h4>Account Type</h4>
                    <div>
                      <Field type='radio' name='accountType' value='SC' />
                      <label htmlFor='Children Account'>Children Account</label>
                    </div>

                    <div>
                      <Field type='radio' name='accountType' value='ST' />
                      <label htmlFor='Teen Account'>Teen Account</label>
                    </div>
                    <div>
                      <Field type='radio' name='accountType' value='SA' />
                      <label htmlFor='Adult Account'>Adult Account</label>
                    </div>
                    <div>
                      <Field type='radio' name='accountType' value='SS' />
                      <label htmlFor='Senior Account'>Senior Account</label>
                    </div>
                    <div>
                      <Field type='radio' name='accountType' value='C0' />
                      <label htmlFor='Checking Account'>Checking Account</label>
                    </div>
                  </div>
                </span>
                <span>
                  <Field
                    type='text'
                    name='initialBalance'
                    placeholder='Initial Balance'
                  />
                </span>
                <Button
                  className='account--reg--form--submit'
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
                      <ErrorMessage name='accountType' component='div' />
                      <ErrorMessage name='initialBalance' component='div' />
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
