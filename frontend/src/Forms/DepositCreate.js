import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Card } from 'antd';
import { addDeposit } from '../api/deposits';
import * as Yup from 'yup';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';
import Logo from '../pages/Images/Logo2.png';
import '../pages/PageStyling/Navbar.css';

export default function DepositCreate() {
  const depositCreateSchema = Yup.object().shape({
    accountID: Yup.number().required().positive().integer(),
    amount: Yup.number().required().positive(),
    remark: Yup.string(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    const deposit = {
      accountID: values.accountID,
      amount: values.amount,
      remark: values.remark,
    };
    addDeposit({ deposit }).then(() => setSubmitting(false));
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
        <h1 className='topic'>Create Deposit</h1>
      </div>
      <Card className='form'>
      <Formik
        initialValues={{
          accountID: '',
          amount: '',
          remark: '',
        }}
        validationSchema={depositCreateSchema}
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
                  name='accountID'
                  placeholder='Account ID'
                  style={
                    props.touched.name && props.errors.name
                      ? errorInputStyle
                      : null
                  }
                />
              </span>
              <span>
                <Field type='number' name='amount' placeholder='Amount' />
              </span>
              <span>
                <Field type='text' name='remark' placeholder='Remark' />
              </span>

              <Button
                className='deposit--create--form--submit'
                type='primary'
                onClick={props.handleSubmit}
                disabled={props.isSubmitting}
              >
                Submit
              </Button>
              {Object.values(props.touched).includes(true) &&
                Object.values(props.errors).length !== 0 && (
                  <Card className='errors'>
                    <ErrorMessage name='accountID' component='div' />
                    <ErrorMessage name='amount' component='div' />
                    <ErrorMessage name='remark' component='div' />
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
