import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
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
  Box,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import api, { handleError } from "../api";
import { useSnackbar } from "notistack";
import { usePopup, Popup } from '../components/Popup';
import Privacy from '../components/Privacy';

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
    height: theme.spacing(7),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: "100%",
  },
}));

const SignupDetail = () => {
  // constants
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { open, togglePopup } = usePopup();

  //states
  const [isShowPassword, setIsShowPassword] = useState(false);

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
    firstName: yup
      .string()
      .required("This field is required")
      .min(1, "Must be at least 1 characters")
      .max(30, "Must be a maximum of 30 characters"),
    lastName: yup
      .string()
      .required("This field is required")
      .min(1, "Must be at least 1 characters")
      .max(30, "Must be a maximum of 30 characters"),
    userName: yup
      .string()
      .required("This field is required")
      .min(1, "Must be at least 1 characters")
      .max(30, "Must be a maximum of 30 characters"),
    email: yup
      .string()
      .required("This field is required")
      .email("Invalid e-mail")
      .min(4, "Must be at least 4 characters")
      .max(30, "Must be a maximum of 30 characters"),
    password: yup
      .string()
      .required("This field is required")
      .min(6, "Must be at least 6 characters")
      .max(30, "Must be a maximum of 30 characters"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    phone: yup
      .string()
      .required("This field is required")
      .min(1, "Must be at least 1 characters")
      .max(20, "Must be a maximum of 20 characters"),
    conditions: yup.bool().oneOf([true], "This field is required"),
    ...(id === "client" && {
      zip: yup
        .string()
        .required("This field is required")
        .min(1, "Must be at least 1 characters")
        .max(8, "Must be a maximum of 8 characters"),
    }),
    ...(id === "professional" && {
      zip: yup
        .string()
        .required("This field is required")
        .min(1, "Must be at least 1 characters")
        .max(8, "Must be a maximum of 8 characters"),
      aboutMe: yup
        .string()
        .required("This field is required")
        .min(1, "Must be at least 1 characters")
        .max(1500, "Must be a maximum of 1500 characters"),
      companyName: yup.string().max(100, "Must be a maximum of 100 characters"),
      gender: yup.number().min(0).max(2),
      capacity: yup.number().min(0),
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
    ...(id === "professional" && {
      aboutMe: "",
      zip: "",
      companyName: "",
      gender: null,
      capacity: 0,

    }),
  };

  // handleSubmit
  const onSubmit = (values) => {
    setLoading(true);
    const data = {
      email: values.email,
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
        service_type: 0,
      }),
      ...(id === "client" && {
        zip_address: values.zip,
      }),
      ...(id === "connector" && {
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
        history.push("/register-email-info");
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

  return (
    <>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <img src="../images/logo.jpg" className={classes.avatar} />
          <Typography component="h1" variant="h5">
            Register
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
                  label="First Name"
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
                  label="Last Name"
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
                  label="User Name"
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
                  label="E-mail"
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
                  label="Password"
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
                  label="Confirm"
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
              )}

              {/* company name */}
              {id === "professional" && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Company"
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
                        <MenuItem value={null}>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={0}>Female</MenuItem>
                        <MenuItem value={1}>Male</MenuItem>
                        <MenuItem value={2}>I don't say</MenuItem>
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
                </>
              )}

              {/* phone number */}
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Phone Number"
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
                    label="About Me"
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
                  I have read the{" "}
                  <Button style={{ fontSize: "bold" }} onClick={handleTerms}>Privacy </Button>
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
              {loading ? <CircularProgress size={18} /> : "Sign Up"}
            </Button>
            <Grid container justify="flex-end" spacing={3}>
              <Grid item>
                Already have an account?{"  "}
                <Link href="/login" variant="body2">
                  Log in
              </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </main>
      <Popup
        {...{ open, togglePopup }}
        title='Terms & Conditions'
      >
        <Privacy />
      </Popup>
    </>
  );
};

export { SignupDetail };
