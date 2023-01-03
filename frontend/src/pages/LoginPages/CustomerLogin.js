import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Card } from 'antd';
import { loginCustomer } from '../../api/customerLogin';
import * as Yup from 'yup';
// Use this instead https://github.com/jannikbuschke/formik-antd
export default function CustomerLogin() {
  const customerRegSchema = Yup.object().shape({
    username: Yup.string().required(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    const loginDetails = {
      userName: values.username,
      password: values.password,
    };
    loginCustomer({ loginDetails }).then(() => setSubmitting(false));
  };
  return (
    <div className='login-box'>
      <Card hoverable title='LOG IN' style={{ width: 600 }}>
        <Formik
          initialValues={{
            username: '',
            password: '',
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
                    name='username'
                    placeholder='Username'
                    style={
                      props.touched.name && props.errors.name
                        ? errorInputStyle
                        : null
                    }
                  />
                </span>
                <span>
                  <Field
                    type='password'
                    name='password'
                    placeholder='Password'
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
                    <div className='customer--reg--form--errors'>
                      <ErrorMessage name='username' component='div' />
                    </div>
                  )}
              </Form>
            );
          }}
        </Formik>
      </Card>
    </div>
  );
}
