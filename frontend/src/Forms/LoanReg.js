import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'antd';
import { addLoan } from '../api/loans';
import * as Yup from 'yup';


export default function LoanReg() {
 
    
  const loanRegSchema = Yup.object().shape({
    customerID: Yup.number().required().positive().integer(),
    branchID: Yup.number().required().positive().integer(),
    employeeID: Yup.number().required().positive().integer(),
    amount: Yup.number().required().positive(),
    loanType: Yup.string().required(),
    savingsAccountID: Yup.number().required().positive().integer(),
  });
  console.log('Rendered');
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(true);
    const loan = {
      customerID: values.customerID,
      branchID: values.branchID,
      employeeID: values.employeeID,
      amount: values.amount,
      loanType: values.loanType,
      savingsAccountID: values.savingsAccountID,
    };
    addLoan({ loan }).then(() => setSubmitting(false));
  };
  return (
    <div>
      <Formik
        initialValues={{
          customerID: '',
          branchID: '',
          employeeID: '',
          amount: '',
          loanType: '',
          savingsAccountID: '',
        }}
        validationSchema={loanRegSchema}
        onSubmit={handleSubmit}
      >
        {(props) => {
          const errorInputStyle = {
            borderColor: 'red',
          };
          return (
            <Form className='loan--reg--form'>
              <span>
                <Field
                  type='number'
                  name='customerID'
                  placeholder='Customer ID'
                />

                <Field
                  type='number'
                  name='branchID'
                  placeholder='Branch ID'
                />

                <Field
                  type='number'
                  name='employeeID'
                  placeholder='Employee ID'
                />

                <Field
                  type='number'
                  name='amount'
                  placeholder='Amount'
                />
              </span>

              <span></span>
              <span>
                <div name='LoanType'>
                  <h4>Loan Type</h4>
                  <Field type='radio' name='loanType' value='B1450' />
                  <label htmlFor='Business Loan'>Business Loan</label>
                  
                  <Field type='radio' name='loanType' value='H1050' />
                  <label htmlFor='Housing Loan'>Housing Loan</label>
                  
                  <Field type='radio' name='loanType' value='L1350' />
                  <label htmlFor='Land Loan'>Land Loan</label>

                  <Field type='radio' name='loanType' value='P1250' />
                  <label htmlFor='Personal Loan'>Personal Loan</label>
                  
                  <Field type='radio' name='loanType' value='V1150' />
                  <label htmlFor='Vehicle Loan'>Vehicle Loan</label>


                </div>
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
                    <ErrorMessage name='employeeID' component='div' />
                    <ErrorMessage name='amount' component='div' />
                    <ErrorMessage name='loanType' component='div' />
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
