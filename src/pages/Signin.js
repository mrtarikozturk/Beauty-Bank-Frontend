import React, { useState, useContext } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from 'notistack'
import {
  Button,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { AppContext } from "../context/AppContext";
import storage from '../services/storageService';
import api, { UserRoles, handleError } from '../api'
import { email, password } from '../utils/validations';
import ForgotPassword from '../components/ForgotPassword';
import CheckMail from '../components/CheckMail';
import ResetPassword from '../components/ResetPassword';
import PasswordChanged from '../components/PasswordChanged';
import Field from '../components/Field/Field';
import PasswordField from '../components/PasswordField/PasswordField';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(7),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signin = () => {
  // constants
  const classes = useStyles();
  const history = useHistory();
  const { setUser } = useContext(AppContext);
  const { formatMessage } = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { search } = useLocation();
  const searchParam = new URLSearchParams(search);
  const resetPassword = searchParam.get('resetPassword');
  const token = searchParam.get('token');
  const uidb64 = searchParam.get('uidb64');

  // states
  const [loading, setLoading] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [checkMailModal, setCheckMailModal] = useState(false)
  const [resetPasswordModal, setResetPasswordModal] = useState(resetPassword ? true : false)
  const [passwordChangedModal, setPasswordChangedModal] = useState(false)

  // validation schema
  const validationSchema = yup.object().shape({
    email,
    password,
  });

  // initial values
  const initialValues = {
    email: "",
    password: "",
  };

  // handleSubmit
  const onSubmit = (values) => {
    setLoading(true);
    api.post('/auth/login/', {
      email: values.email.toLowerCase(),
      password: values.password,
    }).then(data => {
      setUser(data)
      storage.set('user', data);
      history.push(UserRoles[data.role]?.path ?? '/login')
    }).catch(handleError(enqueueSnackbar, closeSnackbar, setLoading))
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <img src="../images/logo.jpg" className={classes.avatar} />
        <Typography component="h1" variant="h5">
          {formatMessage({
            id: 'sign_in',
            defaultMessage: 'Sign In'
          })}
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={3}>
            <Field
              name='email'
              formik={formik}
              id='email_address'
              defaultMessage='E-mail Address'
              autoFocus
              sm={12}
              variant='outlined'
            />
            <PasswordField
              name='password'
              formik={formik}
              id='password'
              defaultMessage='Password'
              sm={12}
              variant='outlined'
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            {loading ? <CircularProgress size={18} /> : formatMessage({ id: 'sign_in', defaultMessage: 'Sign In' })}
          </Button>
        </form>
        <Grid container>
          <Grid item xs>
            <Link to='#' variant="body2" onClick={() => setForgotPasswordModal(prev => !prev)}>
              {formatMessage({
                id: 'forgot_password',
                defaultMessage: 'Forgot password?'
              })}
            </Link>
          </Grid>
          <Grid item>
            <Link to='/register' variant="body2">
              {formatMessage({
                id: 'sign_up',
                defaultMessage: 'Sign Up'
              })}
            </Link>
          </Grid>
        </Grid>
      </div>
      <ForgotPassword {...{ forgotPasswordModal, setForgotPasswordModal, setCheckMailModal }} />
      <CheckMail {...{ checkMailModal, setForgotPasswordModal, setCheckMailModal }} />
      <ResetPassword {...{ resetPasswordModal, setResetPasswordModal, setPasswordChangedModal, token, uidb64 }} />
      <PasswordChanged {...{ passwordChangedModal, setPasswordChangedModal }} />
    </Container>
  );
};

export { Signin };
