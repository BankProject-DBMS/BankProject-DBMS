import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'antd';
import { addDeposit } from '../api/deposites';
import * as Yup from 'yup';

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
  return (
    <div>
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
            <Form className='deposit--create--form'>
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
                  <div className='deposit--create--form--errors'>
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
