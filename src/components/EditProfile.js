import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from 'notistack';
import { makeStyles, Select, FormControl, MenuItem, InputLabel, Paper, Grid, TextField, Button } from "@material-ui/core";

import api, { handleError } from '../api'
import {
  firstName,
  lastName,
  userName,
  email,
  phone,
  zipAddress,
  address,
  aboutMe,
  minimumIncome,
  url,
} from '../utils/validations';

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: "100%",
  },
}));

export const EditProfile = ({ togglePopup, userData }) => {
  // constants
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  // validation obj
  const validationSchema = yup.object().shape({
    firstName,
    lastName,
    userName,
    email,
    phone,
    zipAddress,
    address,
    aboutMe,
    ...(userData?.is_client && { minimumIncome }),
    // ...(userData?.is_pro && {
    //   twitter: url,
    //   youtube: url,
    //   instagram: url,
    //   facebook: url,

    // })
  });

  // initial values
  const initialValues = {
    firstName: userData?.first_name,
    lastName: userData?.last_name,
    userName: userData?.username,
    email: userData?.email,
    phone: userData?.phone_number,
    phone2: userData?.phone_number2,
    gender: userData?.gender,
    zipAddress: userData?.zip_address,
    address: userData?.address,
    aboutMe: userData?.about_me,
    ...(userData?.is_client && { minimumIncome: userData?.min_incomer }),
    ...(userData?.is_pro && {
      twitter: userData?.twitter_account,
      instagram: userData?.instagram_account,
      facebook: userData?.facebook_account,
      youtube: userData?.youtube_account,
    })
  };

  // handleSubmit
  const onSubmit = (values) => {
    api.put(`auth/user-detail/${userData?.username}`, {
      email: values.email,
      username: values.userName,
      first_name: values.firstName,
      last_name: values.lastName,
      phone_number: values.phone,
      phone_number2: values.phone2,
      zip_address: values.zipAddress,
      address: values.address,
      about_me: values.aboutMe,
      gender: values.gender,
      ...(userData.is_client && { min_incomer: values.minimumIncome }),
      ...(userData.is_pro && {
        twitter_account: values.twitter,
        youtube_account: values.youtube,
        instagram_account: values.instagram,
        facebook_account: values.facebook,
      })
    }).then(() => {
      enqueueSnackbar("Updated profile successfully!", { variant: 'success' })
      togglePopup()
    }).catch(handleError(enqueueSnackbar, closeSnackbar))
  }

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
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
            size="small"
            required
            fullWidth
            size='small'
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
            size='small'
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
            size='small'
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
            size='small'
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
            size='small'
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
            fullWidth
            size='small'
            {...formik.getFieldProps("phone2")}
          />
        </Grid>
        {/* Gender */}
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel putLabel id="gender-label">
              Gender
                </InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              name="gender"
              {...formik.getFieldProps("gender")}
              error={
                formik.touched.gender && formik.errors.gender
              }
              helperText={
                formik.touched.gender && formik.errors.gender
              }
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
        {/* Income */}
        {
          userData.is_client &&
          (<Grid item xs={12} sm={6}>
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
            </FormControl>
          </Grid>)
        }
        {/* zipaddress */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Zip Address"
            name="zipAddress"
            autoComplete="zaddress"
            required
            fullWidth
            size='small'
            {...formik.getFieldProps("zipAddress")}
            error={formik.touched.zipAddress && formik.errors.zipAddress}
            helperText={
              formik.touched.zipAddress && formik.errors.zipAddress
            }
          />
        </Grid>
        {/* address */}
        <Grid item xs={12} sm={userData.is_client ? 6 : 12}>
          <TextField
            label="Address"
            name="address"
            autoComplete="address"
            required
            fullWidth
            size='small'
            {...formik.getFieldProps("address")}
            error={formik.touched.address && formik.errors.address}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Grid>
        {/* aboutme */}
        <Grid item xs={12} sm={12}>
          <TextField
            label="About Me (My goal, my dream, my wish..)"
            name="aboutMe"
            autoComplete="aboutMe"
            required
            fullWidth
            size='small'
            {...formik.getFieldProps("aboutMe")}
            error={formik.touched.aboutMe && formik.errors.aboutMe}
            helperText={
              formik.touched.aboutMe && formik.errors.aboutMe
            }
          />
        </Grid>
        {/* Professional links */}
        {
          userData.is_pro && (
            <>
              <Grid item xs={12}>
                <TextField
                  label="Youtube"
                  name="youtube"
                  autoComplete="youtube"
                  fullWidth
                  size='small'
                  {...formik.getFieldProps("youtube")}
                  error={formik.touched.youtube && formik.errors.youtube}
                  helperText={formik.touched.youtube && formik.errors.youtube}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Twitter"
                  name="twitter"
                  autoComplete="twitter"
                  fullWidth
                  size='small'
                  {...formik.getFieldProps("twitter")}
                  error={formik.touched.twitter && formik.errors.twitter}
                  helperText={formik.touched.twitter && formik.errors.twitter}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Instagram"
                  name="instagram"
                  autoComplete="instagram"
                  fullWidth
                  size='small'
                  {...formik.getFieldProps("instagram")}
                  error={formik.touched.instagram && formik.errors.instagram}
                  helperText={formik.touched.instagram && formik.errors.instagram}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Facebook"
                  name="facebook"
                  autoComplete="facebook"
                  fullWidth
                  size='small'
                  {...formik.getFieldProps("facebook")}
                  error={formik.touched.facebook && formik.errors.facebook}
                  helperText={formik.touched.facebook && formik.errors.facebook}
                />
              </Grid>
            </>
          )
        }
      </Grid>
      <Button
        type="submit"
        fullWidth
        size='small'
        variant="contained"
        color="secondary"
        className={classes.submit}
      >
        Submit
          </Button>
    </form>
  );
};
