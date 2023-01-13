import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card, Button } from 'antd';
import { addEmployee } from '../api/employee';
import * as Yup from 'yup';
import Logo from '../pages/Images/Logo2.png';

export default function EmployeeReg() {
  const employeeRegSchema = Yup.object().shape({
    name: Yup.string().required(),
    position: Yup.string().required(),
    branchID: Yup.number().required(),
    onlineID: Yup.string().required(),
    password: Yup.string().required(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    console.log(values);
    const newEmployee = {
      name: values.name,
      position: values.position,
      branchID: values.branchID,
      onlineID: values.onlineID,
      password: values.password,
    };
    addEmployee(newEmployee)
      .then(() => setSubmitting(false))
      .catch((err) => {
        console.log(err);
        setSubmitting(false);
      });
  };

  const navigate = useNavigate();
  return (
    <div>
      <div className='navbar'>
        <img
          className='aruci--logo'
          src={Logo}
          alt='ARUCI Logo'
          onClick={() => navigate('/employeePortal/')}
        />
        <h1 className='topic'>Employee Registration</h1>
      </div>
      <Card className='form'>
        <Formik
          initialValues={{
            name: '',
            position: '',
            branchID: '',
            onlineID: '',
            password: '',
          }}
          validationSchema={employeeRegSchema}
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
                    name='name'
                    placeholder='Full Name'
                    style={
                      props.touched.name && props.errors.name
                        ? errorInputStyle
                        : null
                    }
                  />
                </span>
                <span>
                  <Field type='text' name='position' placeholder='Position' />
                </span>
                <span>
                  <Field
                    type='number'
                    name='branchID'
                    placeholder='Branch ID'
                  />
                </span>
                <span>
                  <Field type='text' name='onlineID' placeholder='Online Username' />
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
                    <Card className='errors'>
                      <ErrorMessage name='name' />
                      <ErrorMessage name='position' />
                      <ErrorMessage name='branchID' />
                      <ErrorMessage name='onlineID' />
                      <ErrorMessage name='password' />
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
