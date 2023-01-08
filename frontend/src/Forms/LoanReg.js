import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'antd';
import { createPhysicalLoan } from '../api/physloans';
import * as Yup from 'yup';

export default function LoanReg() {
  const loanRegSchema = Yup.object().shape({
    customerID: Yup.number().required().positive().integer(),
    branchID: Yup.number().required().positive().integer(),
    amount: Yup.number().required().positive(),
    duration: Yup.number().required().positive().integer().min(6).max(240),
    savingsAccountID: Yup.number().required().positive().integer(),
  });
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(true);
    const loan = {
      customerID: values.customerID,
      branchID: values.branchID,
      amount: values.amount,
      duration: values.duration,
      savingsAccountID: values.savingsAccountID,
    };
    createPhysicalLoan({ loan }).then(() => setSubmitting(false));
  };
  return (
    <div>
      <Formik
        initialValues={{
          customerID: '',
          branchID: '',
          amount: '',
          duration: '',
          savingsAccountID: '',
        }}
        validationSchema={loanRegSchema}
        onSubmit={handleSubmit}
      >
        {(props) => {
          return (
            <Form className='loan--reg--form'>
              <span>
                <Field
                  type='number'
                  name='customerID'
                  placeholder='Customer ID'
                />
                <Field type='number' name='branchID' placeholder='Branch ID' />

                <Field type='number' name='amount' placeholder='Amount' />
              </span>

              <span>
                <Field type='number' name='duration' placeholder='Duration' />
              </span>
              <span>
                <Field
                  type='number'
                  name='savingsAccountID'
                  placeholder='Savings Account'
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
                  <div className='loan--reg--form--errors'>
                    <ErrorMessage name='customerID' component='div' />
                    <ErrorMessage name='branchID' component='div' />
                    <ErrorMessage name='amount' component='div' />
                    <ErrorMessage name='duration' component='div' />
                    <ErrorMessage name='savingsAccountID' component='div' />
                  </div>
                )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
