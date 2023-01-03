import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'antd';
import { addWithdrawal } from '../api/withdrawals';
import * as Yup from 'yup';

export default function WithdrawalCreate() {
  const withdrawalCreateSchema = Yup.object().shape({

    accountID: Yup.number().required().positive().integer(),
    amount: Yup.number().required().positive(),
    remark: Yup.string(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    const withdrawal = {
      accountID: values.accountID,
      amount: values.amount,
      remark: values.remark,
    };
    addWithdrawal({ withdrawal }).then(() => setSubmitting(false));
  };
  return (
    <div>
      <Formik
        initialValues={{
          accountID: '',
          amount: '',
          remark: '',
        }}
        validationSchema={withdrawalCreateSchema}
        onSubmit={handleSubmit}
      >
        {(props) => {
          const errorInputStyle = {
            borderColor: 'red',
          };
          return (
            <Form className='withdrawal--create--form'>
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
                className='withdrawal--create--form--submit'
                type='primary'
                onClick={props.handleSubmit}
                disabled={props.isSubmitting}
              >
                Submit
              </Button>
              {Object.values(props.touched).includes(true) &&
                Object.values(props.errors).length !== 0 && (
                  <div className='withdrawal--create--form--errors'>
                    <ErrorMessage name='accountID' component='div' />
                    <ErrorMessage name='amount' component='div' />
                    <ErrorMessage name='remark' component='div' />
                  </div>
                )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
