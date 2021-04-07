import React, { useState, useEffect } from "react";

import {
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { useSnackbar } from "notistack";

import api, { handleError } from "../api";

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
      width: 800,
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
  profileImage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const UserDetail = ({ selectedUser, handleClose }) => {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/auth/connector-user-detail/${selectedUser}`)
      .then((data) => {
        console.log(data);
        setUserData(data);
        setLoading(false);
      })
      .catch(handleError(enqueueSnackbar, closeSnackbar, setLoading));
  }, []);

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          {/* <Grid item xs={6} className={classes.profile_image}>
            <Avatar
              alt={userData?.email}
              src={userData?.profile_image}
              className={classes.large}
            />
          </Grid> */}
          // TODO: Burasi nedir? Gerekli degilse silelim.

          {!loading ? (
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
                  <Table aria-label="a dense table" size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{
                            overflowX: "auto",
                            whiteSpace: "nowrap",
                            textAlign: "center !important",
                          }}
                        >{`${
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
