import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Card } from 'antd';
import { addFD } from '../api/fd';
import * as Yup from 'yup';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';
import Logo from '../pages/Images/Logo2.png';
import '../pages/PageStyling/Navbar.css';

// Use this instead https://github.com/jannikbuschke/formik-antd
export default function FixedDepositReg() {
  const FixedDepositRegSchema = Yup.object().shape({
    savings: Yup.string().required(),
    myRadioGroup: Yup.string().required(),
    amount: Yup.number().required(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    const fd = {
      savings: values.savings,
      type: values.myRadioGroup,
      amount: values.amount,
    };
    //console.log(fd);
    addFD({ fd }).then(() => setSubmitting(false));
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
        <h1 className='topic'>Fixed Deposit Registration</h1>
      </div>
      <Card className='form'>
        <Formik
          initialValues={{
            savings: '',
            myRadioGroup: '',
            amount: '',
          }}
          validationSchema={FixedDepositRegSchema}
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
                    name='savings'
                    placeholder='Savings Account ID'
                    style={
                      props.touched.name && props.errors.name
                        ? errorInputStyle
                        : null
                    }
                  />
                </span>

                <span className='fd--reg--form--fillers'>
                  <Field type='text' name='amount' placeholder='Amount' />
                </span>
                <span className='fd--duration'>
                  <h4>Duration</h4>
                  <div>
                    <Field
                      type='radio'
                      id='radioOne'
                      name='myRadioGroup'
                      value='6'
                    />
                    <label htmlFor='radioOne'>6 Months</label>
                  </div>
                  <div>
                    <Field
                      type='radio'
                      id='radioTwo'
                      name='myRadioGroup'
                      value='12'
                    />
                    <label htmlFor='radioTwo'>1 Year</label>
                  </div>
                  <div>
                    <Field
                      type='radio'
                      id='radioThree'
                      name='myRadioGroup'
                      value='36'
                    />
                    <label htmlFor='radioThree'>3 Years</label>
                  </div>
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
                      <ErrorMessage name='savings' component='div' />
                      <ErrorMessage name='myRadioGroup' component='div' />
                      <ErrorMessage name='amount' component='div' />
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
