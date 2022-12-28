import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'antd';
import { addAccount } from '../api/accounts';
import * as Yup from 'yup';
// Use this instead https://github.com/jannikbuschke/formik-antd
export default function AccountReg() {
    // this is the schema for the form validation using Yup
    // fields validations
  const accountRegSchema = Yup.object().shape({
    name: Yup.string().required(),
    customerID: Yup.number().required().positive().integer(),
    dateCreated: Yup.date().required(),
    accountType: Yup.number().required().positive().integer(),
    initialBalance: Yup.number().required().min(2000.0),
    initialWithdrawals: Yup.number().required().positive().integer(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    const account = {
      name: values.name,
      customerID: values.customerID,
      dateCreated: values.dateCreated,
      accountType: values.accountType,
      initialBalance: values.initialBalance,
      initialWithdrawals: values.initialWithdrawals,
    };
    addAccount({ account }).then(() => setSubmitting(false));
  };
  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          customerID: '',
          dateCreated: '',
          accountType: '',
          initialBalance: '',
          initialWithdrawals: '',
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
                <Field type='text' name='name' placeholder='Full Name As Customer Registation'
                  style={
                    props.touched.name && props.errors.name
                      ? errorInputStyle
                      : null
                  }
                />
              </span>
              <span>
                <Field type='number' name='customerID' placeholder='Customer ID' />
              </span>
              <span>
                <Field type='date' name='dateCreated' placeholder='Account Created Date' />
              </span>
              <span>
                <div name='AccountType'>

                  <Field type='radio' name='accountType' value='Children Account' />
                  <label htmlFor='Children Account'>Children Account</label>
                  <Field type='radio' name='accountType' value='Teen Account' />
                  <label htmlFor='Teen Account'>Teen Account</label>
                  <Field type='radio' name='accountType' value='Adult Account' />
                  <label htmlFor='Adult Account'>Adult Account</label>
                  <Field type='radio' name='accountType' value='Senior Account' />
                  <label htmlFor='Senior Account'>Senior Account</label>
                  <Field type='radio' name='accountType' value='Checking Account' />
                  <label htmlFor='Checking Account'>Checking Account</label>
                  
                </div>
              </span>
              <span>
                <Field type='text' name='initialBalance' placeholder='Initial Balance' />
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
                  <div className='account--reg--form--errors'>
                    <ErrorMessage name='name' component='div' />
                    <ErrorMessage name='customerID' component='div' />
                    <ErrorMessage name='dateCreated' component='div' />
                    <ErrorMessage name='accountType' component='div' />
                    <ErrorMessage name='initialBalance' component='div' />
                  </div>
                )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
