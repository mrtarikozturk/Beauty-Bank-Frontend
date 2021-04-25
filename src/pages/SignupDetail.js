import React, { useState, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { useIntl } from 'react-intl';
import axios from 'axios';
import {
  Paper,
  Grid,
  Typography,
  TextField,
  Checkbox,
  Button,
  Link,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  ListItemText,
  Input,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
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
  formControl: {
    minWidth: '100%',
    maxWidth: 275
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
  const { REACT_APP_API_BASE_URL } = process.env;

  //states
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [detailPath, setDetailPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  console.log(selectedServices)

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

    axios.get(`${REACT_APP_API_BASE_URL}auth/service-type/`)
      .then(response => {
        setServices(response?.data?.results);
        console.log(response?.data?.results)
      })
      .catch(err => {
        console.log(err)
      })
      .then(() => console.log(services))

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
        service_type: selectedServices,
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

  // handle functions
  const handleClickShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // handle Terms and conditions
  const handleTerms = () => {
    togglePopup();
  }

  const handleChange = (event) => {
    setSelectedServices(event.target.value);
  };

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
              {/* firstname */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label={formatMessage({
                    id: 'first_name',
                    defaultMessage: 'First Name'
                  })}
                  name="firstName"
                  autoComplete="fname"
                  required
                  fullWidth
                  autoFocus
                  {...formik.getFieldProps("firstName")}
                  error={formik.touched.firstName && formik.errors.firstName}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              {/* lastname */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label={formatMessage({
                    id: 'last_name',
                    defaultMessage: 'Last Name'
                  })}
                  name="lastName"
                  autoComplete="lname"
                  required
                  fullWidth
                  {...formik.getFieldProps("lastName")}
                  error={formik.touched.lastName && formik.errors.lastName}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              {/* username */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label={formatMessage({
                    id: 'username',
                    defaultMessage: 'User Name'
                  })}
                  name="userName"
                  autoComplete="uname"
                  required
                  fullWidth
                  {...formik.getFieldProps("userName")}
                  error={formik.touched.userName && formik.errors.userName}
                  helperText={formik.touched.userName && formik.errors.userName}
                />
              </Grid>
              {/* email */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label={formatMessage({
                    id: 'email',
                    defaultMessage: 'E-mail'
                  })}
                  name="email"
                  autoComplete="email"
                  {...formik.getFieldProps("email")}
                  error={formik.touched.email && formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              {/* password */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label={formatMessage({
                    id: 'password',
                    defaultMessage: 'Password'
                  })}
                  name="password"
                  autoComplete="password"
                  required
                  fullWidth
                  type={isShowPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {isShowPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...formik.getFieldProps("password")}
                  error={formik.touched.password && formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              {/* password confirm */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label={formatMessage({
                    id: 'confirm',
                    defaultMessage: 'Confirm'
                  })}
                  name="passwordConfirm"
                  autoComplete="passwordConfirm"
                  required
                  fullWidth
                  type={isShowPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {isShowPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...formik.getFieldProps("passwordConfirm")}
                  error={
                    formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm
                  }
                  helperText={
                    formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm
                  }
                />
              </Grid>

              {id === "client" && (
                <Grid item xs={12} sm={12}>
                  <TextField
                    label={
                      formatMessage({
                        id: 'zip_code',
                        defaultMessage: '"Zip / Postal code"'
                      })
                    }
                    name="zip"
                    autoComplete="zip"
                    required
                    fullWidth
                    {...formik.getFieldProps("zip")}
                    error={formik.touched.zip && formik.errors.zip}
                    helperText={formik.touched.zip && formik.errors.zip}
                  />
                </Grid>
              )}

              {id === "professional" && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={
                        formatMessage({
                          id: 'company',
                          defaultMessage: 'Company'
                        })
                      }
                      name="companyName"
                      autoComplete="companyName"
                      fullWidth
                      {...formik.getFieldProps("companyName")}
                      error={
                        formik.touched.companyName && formik.errors.companyName
                      }
                      helperText={
                        formik.touched.companyName && formik.errors.companyName
                      }
                    />
                  </Grid>
                  {/* Gender */}
                  <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="gender-select-helper-label">
                        Gender
                    </InputLabel>
                      <Select
                        labelId="gender-select-helper-label"
                        id="gender-select-helper"
                        name="gender"
                        {...formik.getFieldProps("gender")}
                        error={formik.touched.gender && formik.errors.gender}
                        helperText={formik.touched.gender && formik.errors.gender}
                      >
                        <MenuItem value={0}>{formatMessage({
                          id: 'male',
                          defaultMessage: 'Male'
                        })}</MenuItem>
                        <MenuItem value={1}>{formatMessage({
                          id: 'female',
                          defaultMessage: 'Female'
                        })}</MenuItem>
                        <MenuItem value={2}>{formatMessage({
                          id: 'not_spesified',
                          defaultMessage: 'Not Specified'
                        })}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Capacity"
                      name="capacity"
                      autoComplete="capacity"
                      fullWidth
                      type="number"
                      {...formik.getFieldProps("capacity")}
                      error={formik.touched.capacity && formik.errors.capacity}
                      helperText={
                        formik.touched.capacity && formik.errors.capacity
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Zip / Postal code"
                      name="zip"
                      autoComplete="zip"
                      required
                      fullWidth
                      {...formik.getFieldProps("zip")}
                      error={formik.touched.zip && formik.errors.zip}
                      helperText={formik.touched.zip && formik.errors.zip}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-mutiple-checkbox-label">Services</InputLabel>
                      <Select
                        labelId="demo-mutiple-checkbox-label"
                        id="demo-mutiple-checkbox"
                        multiple
                        required
                        fullWidth
                        value={selectedServices}
                        onChange={handleChange}
                        input={<Input />}
                        renderValue={(selected) => selected.map(item => {
                          return services.find(type => type.id == item)?.name
                        }).join(', ')}
                      >
                        {services && services?.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            <Checkbox checked={selectedServices.indexOf(item.id) > -1} />
                            <ListItemText primary={item.name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}
              {/* phone number */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label={formatMessage({
                    id: 'phone_number',
                    defaultMessage: 'Phone Number'
                  })}
                  name="phone"
                  autoComplete="phone"
                  required
                  fullWidth
                  {...formik.getFieldProps("phone")}
                  error={formik.touched.phone && formik.errors.phone}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
              {/* about me */}
              {id === "professional" && (
                <Grid item xs={12}>
                  <TextField
                    label={formatMessage({
                      id: 'about_me',
                      defaultMessage: 'About Me'
                    })}
                    name="aboutMe"
                    autoComplete="aboutMe"
                    multiline
                    required
                    fullWidth
                    {...formik.getFieldProps("aboutMe")}
                    error={formik.touched.aboutMe && formik.errors.aboutMe}
                    helperText={formik.touched.aboutMe && formik.errors.aboutMe}
                  />
                </Grid>
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
      <Popup
        {...{ open, togglePopup }}
        title='Privacy Policy'
      >
        <Privacy />
      </Popup>
    </>
  );
};

export { SignupDetail };
