import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";

import {
  Paper,
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CardContent,
} from "@material-ui/core";
import { LayoutClient } from "../views";

import api, { handleError } from "../api";
import { AppContext } from "../context/AppContext";

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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CreateTicket = () => {
  // Constants
  const classes = useStyles();
  const history = useHistory();
  const { user } = useContext(AppContext);
  const [userData, setUserData] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // Get User
  useEffect(() => {
    api
      .get(`/auth/user-detail/${user?.username}`)
      .then(setUserData)
      .catch(handleError(enqueueSnackbar, closeSnackbar));
  }, []);

  // Submit Create Ticket
  async function handleCreateTicket() {
    if (userData.about_me && userData.address && userData.zip_address) {
      api
        .post("/ticket/create/")
        .then(() => {
          enqueueSnackbar("Your ticket successfully created!", {
            variant: "success",
          });
          history.push("/client");
        })
        .catch(handleError(enqueueSnackbar, closeSnackbar));
    } else {
      enqueueSnackbar("Please complete your missing profile information!", {
        variant: "error",
      });
      history.push("/client-profile");
    }
  }

  return (
    <LayoutClient pageTitle="Create Ticket">
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <img src="../images/logo.jpg" className={classes.avatar} />
          <Typography component="h1" variant="h5">
            Create Ticket
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-label="a dense table"
                  size="small"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>{`${
                        user?.username.charAt(0).toUpperCase() +
                        user?.username.slice(1)
                      }'s Credentials`}</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell align="left">{userData?.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>First Name</TableCell>
                      <TableCell align="left">{userData?.first_name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Last Name</TableCell>
                      <TableCell align="left">{userData?.last_name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Gender</TableCell>
                      <TableCell align="left">{userData?.gender}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Address</TableCell>
                      <TableCell align="left">{userData?.address}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Zip Code</TableCell>
                      <TableCell align="left">
                        {userData?.zip_address}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Phone Number</TableCell>
                      <TableCell align="left">
                        {userData?.phone_number}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Grid item xs={12}>
                <CardContent>
                  <Typography variant="body2">About me:</Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {userData?.about_me}
                  </Typography>
                </CardContent>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={() => handleCreateTicket()}
                >
                  Create Ticket
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </main>
    </LayoutClient>
  );
};

export { CreateTicket };
