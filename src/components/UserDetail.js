import React, { useState, useEffect } from "react";
import { useIntl } from 'react-intl';
import axios from 'axios';

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
  const { formatMessage } = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { REACT_APP_API_BASE_URL } = process.env;

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([])

  useEffect(() => {
    api
      .get(`/auth/connector-user-detail/${selectedUser}`)
      .then((data) => {
        console.log(data);
        setUserData(data);
        setLoading(false);
      })
      .catch(handleError(enqueueSnackbar, closeSnackbar, setLoading));

    axios.get(`${REACT_APP_API_BASE_URL}/auth/service-type/`)
      .then(response => {
        setServices(response?.data?.results);
        console.log(response?.data?.results)
      })
      .catch(err => {
        console.log(err)
      })
      .then(() => console.log(services))
  }, []);

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          {!loading ? (
            <>
              <Grid item xs={12}>
                <Typography gutterBottom variant="h5" component="h2">
                  {formatMessage({
                    id: 'about_me',
                    defaultMessage: 'About me:'
                  })}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {userData?.about_me}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TableContainer>
                  <Table aria-label="a dense table" size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          {formatMessage({
                            id: 'email',
                            defaultMessage: 'E-mail'
                          })}
                        </TableCell>
                        <TableCell align="left">{userData?.email}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          {formatMessage({
                            id: 'first_name',
                            defaultMessage: 'First Name'
                          })}
                        </TableCell>
                        <TableCell align="left">
                          {userData?.first_name}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          {formatMessage({
                            id: 'last_name',
                            defaultMessage: 'Last Name'
                          })}
                        </TableCell>
                        <TableCell align="left">
                          {userData?.last_name}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          {formatMessage({
                            id: 'username',
                            defaultMessage: 'Username'
                          })}
                        </TableCell>
                        <TableCell align="left">
                          {userData?.username}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          {
                            formatMessage({
                              id: 'gender',
                              defaultMessage: 'Gender'
                            })
                          }
                        </TableCell>
                        <TableCell align="left">
                          {userData?.gender === 0
                            ? formatMessage({
                              id: 'male',
                              defaultMessage: 'Male'
                            })
                            : userData?.gender === 1
                              ? formatMessage({
                                id: 'female',
                                defaultMessage: 'Female'
                              })
                              : formatMessage({
                                id: 'not_specified',
                                defaultMessage: 'Not Specified'
                              })}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          {
                            formatMessage({
                              id: 'address',
                              defaultMessage: 'Address'
                            })
                          }
                        </TableCell>
                        <TableCell align="left">{userData?.address}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          {formatMessage({
                            id: 'zip_code',
                            defaultMessage: 'Zip Code'
                          })}
                        </TableCell>
                        <TableCell align="left">
                          {userData?.zip_address}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          {
                            formatMessage({
                              id: 'phone_number',
                              defaultMessage: 'Phone Number'
                            })
                          }
                        </TableCell>
                        <TableCell align="left">
                          {userData?.phone_number}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          {formatMessage({
                            id: 'phone_number',
                            defaultMessage: 'Phone Number'
                          }) + '2'}
                        </TableCell>
                        <TableCell align="left">
                          {userData?.phone_number2}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          {formatMessage({
                            id: 'minimum_income',
                            defaultMessage: 'Minimum Income'
                          })}
                        </TableCell>
                        <TableCell align="left">
                          {userData?.min_incomer ? formatMessage({
                            id: 'yes',
                            defaultMessage: 'Yes'
                          }) : formatMessage({
                            id: 'no',
                            defaultMessage: 'No'
                          })}
                        </TableCell>
                      </TableRow>
                      {userData?.is_pro && (
                        <>
                          <TableRow>
                            <TableCell>
                              {
                                formatMessage({
                                  id: 'company_name',
                                  defaultMessage: 'Company Name'
                                })
                              }
                            </TableCell>
                            <TableCell align="left">
                              {userData?.company_name}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              {
                                formatMessage({
                                  id: 'service_type',
                                  defaultMessage: 'Service Type'
                                })
                              }
                            </TableCell>
                            <TableCell align="left">
                              {
                                userData?.service_type.map(item => {
                                  return services.find(type => type.id == item).name
                                }).join(', ')
                              }
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
      </Paper >
    </main >
  );
};

export { UserDetail };
