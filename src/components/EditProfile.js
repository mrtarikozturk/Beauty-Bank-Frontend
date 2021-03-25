import React from "react";
import { makeStyles, Select, FormControl, MenuItem, InputLabel } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import { Paper, Grid, TextField, Button } from "@material-ui/core";
import api, {handleError} from '../api'
import {useSnackbar} from 'notistack'

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(10),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(10),
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

export const EditProfile = ({handleClose, userData}) => {
  const classes = useStyles();
  const {enqueueSnackbar, closeSnackbar} = useSnackbar()

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
    phone: yup
      .string()
      .required("This field is required")
      .min(1, "Must be at least 1 characters")
      .max(20, "Must be a maximum of 20 characters"),
    zipAddress: yup
      .string()
      .required("This field is required")
      .min(1, "Must be at least 1 characters")
      .max(30, "Must be a maximum of 30 characters"),
    address: yup
      .string()
      .required("This field is required")
      .min(1, "Must be at least 1 characters")
      .max(100, "Must be a maximum of 30 characters"),
    aboutMe: yup
      .string()
      .required("This field is required")
      .min(100, "Must be at least 100 characters")
      .max(1500, "Must be a maximum of 1500 characters"),
    minimumIncome: yup
      .boolean()
      .required("This field is required")
  });

  // initial values
  const initialValues = {
    firstName: userData?.first_name,
    lastName: userData?.last_name,
    userName: userData?.username,
    email: userData?.email,
    phone: userData?.phone_number,
    phone2: userData?.phone_number2,
    zipAddress: userData?.zip_address,
    address: userData?.address,
    aboutMe: userData?.about_me,
    minimumIncome: userData?.min_incomer
  };

  // handleSubmit
  async function onSubmit(values) {
    api.put(`/auth/user-detail/${userData?.username}`, {
      email: values.email,
      username: values.userName,
      first_name: values.firstName,
      last_name: values.lastName,
      phone_number: values.phone,
      phone_number2: values.phone2,
      zip_address: values.zipAddress,
      address: values.address,
      about_me: values.aboutMe,
      min_incomer: values.minimumIncome
    }).then(() => {
      enqueueSnackbar("Updated profile successfully!", {variant: 'success'})
      handleClose()
    }).catch(handleError(enqueueSnackbar, closeSnackbar))
  }

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
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
            {/* phone number */}
            <Grid item xs={12} sm={6}>
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
             {/* phone number 2 */}
             <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number 2"
                name="phone2"
                autoComplete="phone2"
                required
                fullWidth
                {...formik.getFieldProps("phone2")}
              />
            </Grid>
            {/* zipaddress */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Zip Address"
                name="zipAddress"
                autoComplete="zaddress"
                required
                fullWidth
                {...formik.getFieldProps("zipAddress")}
                error={formik.touched.zipAddress && formik.errors.zipAddress}
                helperText={
                  formik.touched.zipAddress && formik.errors.zipAddress
                }
              />
            </Grid>
            {/* address */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                name="address"
                autoComplete="address"
                required
                fullWidth
                {...formik.getFieldProps("address")}
                error={formik.touched.address && formik.errors.address}
                helperText={
                  formik.touched.address && formik.errors.address
                }
              />
            </Grid>
            {/* aboutme */}
            <Grid item xs={12} sm={12}>
              <TextField
                label="About Me"
                name="aboutMe"
                autoComplete="ame"
                required
                fullWidth
                {...formik.getFieldProps("aboutMe")}
                error={formik.touched.aboutMe && formik.errors.aboutMe}
                helperText={
                  formik.touched.aboutMe && formik.errors.aboutMe
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
              <InputLabel id="min-income-select-helper-label">
                Do you have minimum income?
              </InputLabel>
              <Select
                labelId="min-income-select-helper-label"
                id="min-income-select-helper"
                name="minimumIncome"
                {...formik.getFieldProps("minimumIncome")}
                error={
                  formik.touched.minimumIncome && formik.errors.minimumIncome
                }
                helperText={
                  formik.touched.minimumIncome && formik.errors.minimumIncome
                }
              >
                <MenuItem value={false}>No</MenuItem>
                <MenuItem value={true}>Yes</MenuItem>
              </Select>
              {/* <FormHelperText>Some important helper text</FormHelperText> */}
            </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </main>
  );
};
