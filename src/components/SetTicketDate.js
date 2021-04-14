import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { useIntl } from 'react-intl';

import {
  Paper,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";

import { AppContext } from "../context/AppContext";
import api, { handleError } from "../api";
import { useSnackbar } from "notistack";


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
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: "95%",
  },
  formInputs: {
    display: "flex",
    flexDirection: "row",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    minWidth: "100%",
  },
}));

const SetTicketDate = ({ selectedTicket, handleClose }) => {
  // constants
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  //useStates
  const [datePicker, setDatePicker] = useState("2021-01-01T00:00:00Z");

  // handleSubmit
  async function onSubmit(values) {
    // TODO: async olmasina gerek yok?
    api
      .put(`/ticket/client-tickets/${selectedTicket.id}`, {
        appointment_date: datePicker,
      })
      .then(() => {
        enqueueSnackbar(formatMessage({
          id: 'set_appointment_date_successfully',
          defaultMessage: 'Appointment Date Set Successfully!'
        }), {
          variant: "success",
        });
        handleClose();
      })
      .catch(handleError(enqueueSnackbar, closeSnackbar));
  }

  // initial values
  const initialValues = {};

  // formik
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const handleDatePicker = (event) => {
    setDatePicker(event.target.value);
  };

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
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
                    <TableCell>{`${selectedTicket?.owner.username.charAt(0).toUpperCase() +
                      selectedTicket?.owner.username.slice(1)
                      }'s Ticket`}</TableCell>
                      // TODO: BUrasi nasil duzeltilecek
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {formatMessage({
                        id: 'ticket_id',
                        defaultMessage: 'Request ID'
                      })}
                    </TableCell>
                    <TableCell align="left">{selectedTicket?.id}</TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell align="left">
                      {selectedTicket?.owner.first_name}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Last Name</TableCell>
                    <TableCell align="left">
                      {selectedTicket?.owner.last_name}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Gender</TableCell>
                    <TableCell align="left">
                      {selectedTicket?.owner.gender}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Zip Code</TableCell>
                    <TableCell align="left">
                      {selectedTicket?.owner.zip_address}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Phone Number</TableCell>
                    <TableCell align="left">
                      {selectedTicket?.owner.phone_number}
                    </TableCell>
                  </TableRow> */}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <Grid item xs={12}>
              <CardContent>
                <Typography variant="body2">About me:</Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {selectedTicket?.owner.about_me}
                </Typography>
              </CardContent>
            </Grid> */}
            <TableContainer>
              <Table
                className={classes.table}
                aria-label="a dense table"
                size="small"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      {formatMessage({
                        id: 'assign_professional',
                        defaultMessage: 'Assigned Professional'
                      })}
                    </TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {formatMessage({
                        id: 'full_name',
                        defaultMessage: 'Full Name'
                      })}
                    </TableCell>
                    <TableCell align="left">{`${selectedTicket?.pro_detail?.first_name} ${selectedTicket?.pro_detail?.last_name}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {formatMessage({
                        id: 'company_name',
                        defaultMessage: 'Company Name'
                      })}
                    </TableCell>
                    <TableCell align="left">
                      {selectedTicket?.pro_detail?.company_name}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {formatMessage({
                        id: 'phone_number',
                        defaultMessage: 'Phone Number'
                      })}
                    </TableCell>
                    <TableCell align="left">
                      {selectedTicket?.pro_detail?.phone_number}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {formatMessage({
                        id: 'email',
                        defaultMessage: 'E-mail'
                      })}
                    </TableCell>
                    <TableCell align="left">
                      {selectedTicket?.pro_detail?.email}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {
                        formatMessage({
                          id: 'zip_code',
                          defaultMessage: 'Zip Address'
                        })
                      }
                    </TableCell>
                    <TableCell align="left">
                      {selectedTicket?.pro_detail?.zip_address}
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
                    <TableCell align="left">
                      {selectedTicket?.pro_detail?.address
                        ? selectedTicket?.pro_detail?.address
                        : "--"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <form
              className={classes.form}
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <div className={classes.formInputs}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    id="datetime-local"
                    label={formatMessage({
                      id: 'set_ticket_date',
                      defaultMessage: 'Set Request Date'
                    })}
                    type="datetime-local"
                    defaultValue="2021-01-01T10:00"
                    className={classes.textField}
                    onChange={handleDatePicker}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                {formatMessage({
                  id: 'set_ticket_date',
                  defaultMessage: 'Set Request Date'
                })}
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </main>
  );
};

export { SetTicketDate };
