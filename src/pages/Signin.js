import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { useIntl } from "react-intl";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from 'notistack'
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { AppContext } from "../context/AppContext";
import api, { UserRoles, handleError } from '../api'

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
    height: theme.spacing(7),
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
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  // states
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // validation schema
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("This field is required")
      .email("Invalid e-mail"),
    password: yup.string().required("This field is required"),
  });

  // initial values
  const initialValues = {
    email: "",
    password: "",
  };

  // handleSubmit
  const onSubmit = (values) => {
    setLoading(true);
    console.log({ values })
    api.post('/auth/login/', values).then(data => {
      setUser(data)
      localStorage.setItem("user", JSON.stringify(data))
      history.push(UserRoles[data.role]?.path ?? '/login')
    }).catch(handleError(enqueueSnackbar, closeSnackbar, setLoading))
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

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <img src="../images/logo.jpg" className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...formik.getFieldProps("email")}
            error={formik.touched.email && formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={isShowPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            {loading ? <CircularProgress size={18} /> : formatMessage({ id: 'sign_in' })}
          </Button>
        </form>
        <Grid container>
          <Grid item xs>
            <Link to='#' variant="body2">
              Forgot password?
              </Link>
          </Grid>
          <Grid item>
            Don't have an account?{" "}
            <Link to='/register' variant="body2">
              Sign Up
              </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export { Signin };
