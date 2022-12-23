import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'antd';
import { addFD } from '../api/customers';
import * as Yup from 'yup';
// Use this instead https://github.com/jannikbuschke/formik-antd
export default function FixedDepositReg() {
    const FixedDepositRegSchema = Yup.object().shape({
        savings: Yup.string().required(),
        type: Yup.required(),
        amount: Yup.string().required(),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        const fd = {
            savings: values.savings,
            type: values.type,
            amount: values.amount
        };
        addFD({ fd }).then(() => setSubmitting(false));
    };
    return (
        <div>
            <Formik
                initialValues={{
                    savings: '',
                    type: '',
                    amount: ''
                }}
                validationSchema={FixedDepositRegSchema}
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
                                    name='savings'
                                    placeholder='Savings Account'
                                    style={
                                        props.touched.name && props.errors.name
                                            ? errorInputStyle
                                            : null
                                    }
                                />
                            </span>

                            <span>
                                <Field type='radio' name='type' />
                            </span>
                            <span>
                                <Field type='text' name='amount' placeholder='Amount' />
                            </span>
                            <Field component="div" name="type">
                                <input
                                    type="radio"
                                    id="radioOne"
                                    defaultChecked={values.myRadioGroup === "one"}
                                    name="myRadioGroup"
                                    value="one"
                                />
                                <label htmlFor="radioOne">One</label>

                                <input
                                    type="radio"
                                    id="radioTwo"
                                    defaultChecked={values.myRadioGroup === "two"}
                                    name="myRadioGroup"
                                    value="two"
                                />
                                <label htmlFor="radioTwo">Two</label>
                            </Field>
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
                                        <ErrorMessage name='savings' component='div' />
                                        <ErrorMessage name='type' component='div' />
                                        <ErrorMessage name='amount' component='div' />
                                    </div>
                                )}
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}
