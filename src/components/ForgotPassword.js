import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useIntl } from 'react-intl';
import axios from 'axios';
import { useSnackbar } from "notistack";
import ModalHeader from './ModalHeader';
import ActionBox from './ActionBox';
import { Popup } from './Popup';
import { email } from '../utils/validations'
import { TextField, Button, makeStyles } from '@material-ui/core';
import { handleError } from "../api";


const useStyles = makeStyles(theme => ({
    submit: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    }
}));

const ForgotPassword = (props) => {

    const { forgotPasswordModal, setForgotPasswordModal, setCheckMailModal } = props;
    const { formatMessage } = useIntl();
    const { REACT_APP_API_BASE_URL } = process.env;

    const toggleForgot = () => setForgotPasswordModal(prev => !prev);
    const toggleCheckMail = () => setCheckMailModal(prev => !prev);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();


    const onSubmit = (values) => {
        axios.post(`https://bbank-backend-app.herokuapp.com/auth/reset-email`, { email: values.email })
            .then(() => {
                enqueueSnackbar(formatMessage({
                    id: 'We have sent you a link to reset your password',
                    defaultMessage: 'We have sent you a link to reset your password'
                }), {
                    variant: "success",
                });
                toggleForgot();
                toggleCheckMail();
            })
            .catch(handleError(enqueueSnackbar, closeSnackbar));
    }

    const formik = useFormik({
        initialValues: { email: '' },
        validationSchema: yup.object({ email }),
        onSubmit,
    });

    return (
        <Popup
            open={forgotPasswordModal}
            togglePopup={toggleForgot}
            dividers={false}
            customHeader={<ModalHeader
                titleId='Forgot Password'
                titleMsg='Forgot Password'
                descId='Forgot'
                descMsg={'Enter your email and we\' ll send you a link to reset your password'}
            />}
        >
            <form noValidate onSubmit={formik.handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label={formatMessage({
                        id: 'email_address',
                        defaultMessage: 'E-mail Address'
                    })}
                    name="email"
                    autoComplete="email"
                    autoFocus
                    {...formik.getFieldProps("email")}
                    error={formik.touched.email && formik.errors.email}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <ActionBox
                    buttonType='submit'
                    buttonTextId='submit'
                    buttonTextMsg='Submit'
                />
            </form>
        </Popup >
    )
}

export default ForgotPassword
