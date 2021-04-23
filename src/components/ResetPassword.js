import React, { useState } from 'react';
import { Box, Grid, InputAdornment, IconButton, makeStyles, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useIntl } from 'react-intl';
import axios from 'axios';
import { useSnackbar } from "notistack";



import { handleError } from "../api";
import ModalHeader from './ModalHeader';
import { Popup } from './Popup';
import ActionBox from './ActionBox';
import { passwordConfirm, password } from '../utils/validations';


const ResetPassword = (props) => {
    const { formatMessage } = useIntl();

    const { resetPasswordModal, setResetPasswordModal, setPasswordChangedModal, token, uidb64 } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { REACT_APP_API_BASE_URL } = process.env;
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();


    const toggleResetModal = () => setResetPasswordModal(prev => !prev);
    const toggleSuccessModal = () => setPasswordChangedModal(prev => !prev);
    const togglePassword = () => setShowPassword(prev => !prev);
    const toggleConfirm = () => setShowConfirmPassword(prev => !prev);

    const onSubmit = (values) => {
        axios.patch(`${REACT_APP_API_BASE_URL}auth/password-reset-complete`,
            { password: values.password, token, uidb64 })
            .then(() => {
                enqueueSnackbar(formatMessage({
                    id: 'we_have sent you a link to reset your password',
                    defaultMessage: 'We have sent you a link to reset your password'
                }), {
                    variant: "success",
                });
                toggleResetModal();
                toggleSuccessModal();
            })
            .catch(handleError(enqueueSnackbar, closeSnackbar));
    }

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validationSchema: yup.object({
            password,
            confirmPassword: passwordConfirm
        }),
        onSubmit
    });

    return (
        <Popup
            open={resetPasswordModal}
            togglePopup={toggleResetModal}
            maxWidth='xs'
            dividers={false}
            customHeader={
                <ModalHeader
                    titleId='reset_your_password'
                    titleMsg='Reset Your Password'
                    descId='reset_your_password_message'
                    descMsg="Please enter and confirm your new password below to access your account"
                />
            }
        >
            <form onSubmit={formik.handleSubmit} noValidate>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <TextField
                            id='password'
                            name='password'
                            variant="outlined"
                            required
                            fullWidth
                            label={formatMessage({
                                id: 'password',
                                defaultMessage: 'Password'
                            })}
                            type={showPassword ? 'text' : 'password'}
                            {...formik.getFieldProps("password")}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={togglePassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id='confirmPassword'
                            name='confirmPassword'
                            variant="outlined"
                            required
                            fullWidth
                            label={formatMessage({
                                id: 'confirm',
                                defaultMessage: 'Confirm Password'
                            })}
                            type={showConfirmPassword ? 'text' : 'password'}
                            {...formik.getFieldProps("confirmPassword")}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={toggleConfirm}
                                        >
                                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
                <ActionBox
                    buttonType='submit'
                    buttonTextId='submit'
                    buttonTextMsg='Submit'
                />
            </form>
        </Popup >
    )
}

export default ResetPassword;
