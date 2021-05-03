import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { useIntl } from 'react-intl';
import {
  Paper,
  Grid,
  Typography,
  Checkbox,
  Button,
  Link,
  CircularProgress,
} from "@material-ui/core";
import api, { handleError } from "../api";
import { useSnackbar } from "notistack";
import { usePopup, Popup } from '../components/Popup';
import Privacy from '../components/Privacy';
import {
  firstName,
  lastName,
  userName,
  email,
  password,
  passwordConfirm,
  phone,
  conditions,
  zipAddress,
  aboutMe,
  gender,
  companyName,
  capacity,
} from '../utils/validations'
import Field from '../components/Field/Field';
import GenderField from '../components/GenderField/GenderField';
import ServiceTypeField from '../components/ServiceTypeField';
import PasswordField from '../components/PasswordField/PasswordField';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    margin: theme.spacing(3, 1),
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      margin: theme.spacing(3, 0),
      padding: theme.spacing(3),
    },
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

const SignupDetail = () => {
  // constants
  const classes = useStyles();
  const history = useHistory();
  const { formatMessage } = useIntl();
  const { id } = useParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { open, togglePopup } = usePopup();

  //states
  const [detailPath, setDetailPath] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id === "client") {
      setDetailPath("register");
    } else if (id === "professional") {
      setDetailPath("register-pro");
    } else if (id === "connector") {
      setDetailPath("register-connector");
    } else if (id === "sponsor") {
      setDetailPath("register-sponsor");
    } else {
      history.push("/login");
    }
  }, []);

  // validation obj
  const validationSchema = yup.object().shape({
    firstName,
    lastName,
    userName,
    email,
    password,
    passwordConfirm,
    phone,
    conditions,
    ...(id === "client" && { zip: zipAddress }),
    ...(id === "professional" && {
      zip: zipAddress,
      aboutMe,
      companyName,
      gender,
      capacity,
    }),
  });

  // initial values
  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    conditions: false,
    ...(id === "client" && {
      zip: "",
    }),
    ...(id === "connector" && {
      zip: "1671 EA",
    }),
    ...(id === "sponsor" && {
      zip: "1671 EA",
    }),
    ...(id === "professional" && {
      aboutMe: "",
      zip: "",
      companyName: "",
      gender: null,
      capacity: 1,
      serviceType: [],
    }),
  };

  // handleSubmit
  const onSubmit = (values) => {
    setLoading(true);
    const data = {
      email: values.email.toLowerCase(),
      username: values.userName,
      password: values.password,
      first_name: values.firstName,
      last_name: values.lastName,
      phone_number: values.phone,
      gdpr_consent: values.conditions,
      ...(id === "professional" && {
        about_me: values.aboutMe,
        company_name: values.companyName,
        for_gender: values.gender,
        reserved_capacity: values.capacity,
        zip_address: values.zip,
        service_type: values.serviceType,
      }),
      ...(id === "client" && {
        zip_address: values.zip,
      }),
      ...(id === "connector" && {
        zip_address: "1671 EA",
      }),
      ...(id === "sponsor" && {
        zip_address: "1671 EA",
      }),
    };
    //TODO: Email verify info page yapılmalı register olduktan sonra oraya yonlendirmeli
    api
      .post(`auth/${detailPath}/`, data)
      .then(() => {
        enqueueSnackbar(
          "Successful! You have been registered! Please activate your email!",
          { variant: "success" }
        );
        setLoading(false);
        history.push(`/register-email-info?userRole=${id}`);
      })
      .catch(handleError(enqueueSnackbar, closeSnackbar, setLoading));
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  // handle Terms and conditions
  const handleTerms = () => {
    togglePopup();
  }

  return (
    <>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <img src="../images/logo.jpg" className={classes.avatar} />
          <Typography component="h1" variant="h5">
            {formatMessage({
              id: 'register',
              defaultMessage: 'Register'
            })}
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <Grid container spacing={3}>
              <Field
                name='firstName'
                id='first_name'
                defaultMessage='First Name'
                formik={formik}
                autoFocus
              />
              <Field
                name='lastName'
                formik={formik}
                id='last_name'
                defaultMessage='Last Name'
              />
              <Field
                name='userName'
                formik={formik}
                id='username'
                defaultMessage='User Name'
              />
              <Field
                name='email'
                formik={formik}
                id='email'
                defaultMessage='E-mail'
              />
              <PasswordField
                name='password'
                formik={formik}
                id='password'
                defaultMessage='Password'
              />
              <PasswordField
                name='passwordConfirm'
                formik={formik}
                id='confirm'
                defaultMessage='Confirm'
              />
              {id === "client" && (
                <Field
                  name='zip'
                  formik={formik}
                  id='zip_code'
                  defaultMessage='Zip / Postal code'
                />
              )}
              {id === "professional" && (
                <>
                  <Field
                    name='companyName'
                    formik={formik}
                    id='company'
                    defaultMessage='Company'
                  />
                  <GenderField formik={formik} />
                  <Field
                    name='capacity'
                    formik={formik}
                    id='capacity'
                    defaultMessage='Capacity'
                    required={false}
                    type='number'
                  />
                  <Field
                    name='zip'
                    formik={formik}
                    id='zip_code'
                    defaultMessage='Zip / Postal code'
                  />
                  <ServiceTypeField {...{ formik }} />
                </>
              )}
              <Field
                name='phone'
                sm={id === 'professional' || id === 'client' ? 6 : 12}
                formik={formik}
                id='phone_number'
                defaultMessage='Phone Number'
              />
              {id === "professional" && (
                <Field
                  name='aboutMe'
                  formik={formik}
                  id='about_me'
                  defaultMessage='About Me'
                  sm={12}
                  multiline
                />
              )}
              {/* Privacy */}
              <Grid item xs={12}>
                <Checkbox
                  {...formik.getFieldProps("conditions")}
                  name="conditions"
                  id="conditions"
                />
                <label for="conditions">
                  {formatMessage({
                    id: 'i_have_read_the',
                    defaultMessage: 'I have read the'
                  })}
                  <Button style={{ fontSize: "bold" }} onClick={handleTerms}>{formatMessage({
                    id: 'privacy_policy',
                    defaultMessage: 'Privacy Policy'
                  })}</Button>
                </label>
                {formik.errors.conditions ? (
                  <label style={{ color: "red" }}>
                    {formik.errors.conditions}
                  </label>
                ) : null}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              {loading ? <CircularProgress size={18} /> : formatMessage({
                id: 'sign_up',
                defaultMessage: 'Sign Up'
              })}
            </Button>
            <Grid container justify="flex-end" spacing={3}>
              <Grid item>
                {formatMessage({
                  id: 'already_have_an_account',
                  defaultMessage: 'Already have an account?'
                })}{"  "}
                <Link href="/login" variant="body2">
                  {formatMessage({
                    id: 'login',
                    defaultMessage: 'Log in'
                  })}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </main>
      <Popup {...{ open, togglePopup }} title='Privacy Policy' >
        <Privacy />
      </Popup>
    </>
  );
};

export { SignupDetail };
