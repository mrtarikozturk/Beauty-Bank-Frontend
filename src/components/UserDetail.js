import React, { useState, useEffect, useContext } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import {
  LayoutClient,
  LayoutConnector,
  LayoutProfessional,
  LayoutSponsor,
} from "../components/Index";

import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Typography from "@material-ui/core/Typography";
import { AppContext } from "../context/AppContext";

import Avatar from "@material-ui/core/Avatar";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
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
  root: {
    maxWidth: 345,
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  media: {
    height: 140,
  },

  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    width: 600,
    textAlign: "center",
  },
  fixedHeight: {
    height: 240,
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  about: {
    width: theme.spacing(40),
    height: theme.spacing(30),
    textAlign: "left",
  },
  button: {
    textAlign: "right",
    margin: theme.spacing(2),
  },
  table: {
    margin: theme.spacing(5),
    width: 500,
  },
  paperModal: {
    position: "absolute",
    top: "20vh",
    left: "35vw",
    width: 700,
    height: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  profile_image: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    display: "none",
  },
}));

const UserDetail = ({ selectedUser, handleClose }) => {
  const classes = useStyles();
  const { user } = useContext(AppContext);
  const [userData, setUserData] = useState(null);

  useEffect(async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
    };

    const response = await fetch(
      `https://bbank-backend-app.herokuapp.com/auth/connector-user-detail/${selectedUser}`,
      requestOptions
    );
    const data = await response.json();
    console.log(data);

    setUserData(data);
  }, [userData?.username]);

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Grid
          container
          spacing={3}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {/* <Grid item xs={6} className={classes.profile_image}>
            <Avatar
              alt={userData?.email}
              src={userData?.profile_image}
              className={classes.large}
            />
          </Grid> */}

          {userData ? (
            <>
              <Grid item xs={12}>
                <Typography gutterBottom variant="h5" component="h2">
                  About me:
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {userData?.about_me}
                </Typography>
              </Grid>
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
                          userData?.username?.charAt(0).toUpperCase() +
                          userData?.username?.slice(1)
                        }'s Profile`}</TableCell>
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
                        <TableCell align="left">
                          {userData?.first_name}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Last Name</TableCell>
                        <TableCell align="left">
                          {userData?.last_name}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Gender</TableCell>
                        <TableCell align="left">
                          {userData?.gender === 0
                            ? "Male"
                            : userData?.gender === 1
                            ? "Female"
                            : "Not Specified"}
                        </TableCell>
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
                      <TableRow>
                        <TableCell>Phone Number 2</TableCell>
                        <TableCell align="left">
                          {userData?.phone_number2}
                        </TableCell>
                      </TableRow>
                      {userData?.is_pro && (
                        <>
                          <TableRow>
                            <TableCell>Company Name</TableCell>
                            <TableCell align="left">
                              {userData?.company_name}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Service Type</TableCell>
                            <TableCell align="left">
                              {userData?.service_type}
                            </TableCell>
                          </TableRow>
                        </>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </>
          ) : (
            <Grid
              item
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <CircularProgress color="secondary" />
            </Grid>
          )}
        </Grid>
      </Paper>
    </main>
  );
};

export { UserDetail };
