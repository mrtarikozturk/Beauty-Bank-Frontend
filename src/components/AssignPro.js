import React, { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CardContent,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { AppContext } from "../context/AppContext";
import api, { handleError } from "../api";
import { DateTimePicker } from "@material-ui/pickers";
import { useIntl } from 'react-intl';


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

const AssignPro = ({ selectedTicket, handleClose, modalName }) => {
  // Constants
  const classes = useStyles();
  const { formatMessage } = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // states
  const [proList, setProList] = useState([]);
  const [selectPro, setSelectPro] = useState("");
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [isIntake, setIsIntake] = useState(false);

  // Get Pro list
  useEffect(async () => {
    api
      .get(`/ticket/dist-list/${selectedTicket.id}`)
      .then((data) => {
        setProList(data);
        setLoading(false);
      })
      .catch(handleError(enqueueSnackbar, closeSnackbar, setLoading))
      .finally(() => setLoading(false));
  }, []);

  // handleSubmit // Assign Pro
  function onSubmit() {
    // alert(modalName)
    switch (modalName) {
      case 'Assign Pro':
        api
          .put(`/ticket/connector-tickets/${selectedTicket.id}`, {
            pro: selectPro,
            service_type: 0,
          })
          .then(() => {
            enqueueSnackbar(formatMessage({
              id: 'assign_pro_successfully',
              defaultMessage: 'Professional Assigned Successfully!'
            }), {
              variant: "success",
            });
            handleClose();
          })
          .catch(handleError(enqueueSnackbar, closeSnackbar));
        break;
      case 'Intake Call Date':
      case 'Intake Call Done':
        api
          .put(`/ticket/connector-intake/${selectedTicket.id}`, {
            ...(modalName === 'Intake Call Date' && { intake_call_date: date }),
            ...(modalName === 'Intake Call Done' && { is_intake_call: isIntake }),
          })
          .then(() => {
            enqueueSnackbar(formatMessage({
              id: 'done_successfully',
              defaultMessage: 'Done Successfully!'
            }), {
              variant: "success",
            });
            handleClose();
          })
          .catch(handleError(enqueueSnackbar, closeSnackbar));
        break;
    }
  }

  const handleChangePro = (event) => {
    setSelectPro(event.target.value);
  };

  // initial values
  const initialValues = {};

  // formik
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  console.log(selectedTicket);

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
                      // TODO:BUrasi nasil cevrilecek
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {formatMessage({
                        id: 'email',
                        defaultMessage: 'E-mail'
                      })}
                    </TableCell>
                    <TableCell align="left">
                      {selectedTicket?.owner.email}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {formatMessage({
                        id: 'first_name',
                        defaultMessage: 'First Name'
                      })}
                    </TableCell>
                    <TableCell align="left">
                      {selectedTicket?.owner.first_name}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {
                        formatMessage({
                          id: 'last_name',
                          defaultMessage: 'Last Name'
                        })
                      }
                    </TableCell>
                    <TableCell align="left">
                      {selectedTicket?.owner.last_name}
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
                      {selectedTicket?.owner.gender}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {formatMessage({
                        id: 'zip_code',
                        defaultMessage: 'Zip Code'
                      })}
                    </TableCell>
                    <TableCell align="left">
                      {selectedTicket?.owner.zip_address}
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
                      {selectedTicket?.owner.phone_number}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {
                        formatMessage({
                          id: 'minimum_income',
                          defaultMessage: 'Minimum Income'
                        })
                      }
                    </TableCell>
                    <TableCell align="left">
                      {selectedTicket?.owner.income}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Grid item xs={12}>
              <CardContent>
                <Typography variant="body2">
                  {
                    formatMessage({
                      id: 'about_me',
                      defaultMessage: 'About me:'
                    })
                  }
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {selectedTicket?.owner.about_me}
                </Typography>
              </CardContent>
            </Grid>
            <form
              className={classes.form}
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <div className={classes.formInputs}>
                <Grid item xs={12}>
                  {
                    modalName === 'Assign Pro' &&
                    (
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">
                          {
                            formatMessage({
                              id: 'select_pr',
                              defaultMessage: 'Select Professional'
                            })
                          }
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={selectPro}
                          onChange={handleChangePro}
                          label="Select Pro"
                        >
                          {!loading &&
                            proList?.map((pro) => (
                              <MenuItem
                                value={pro?.id}
                              >{`${pro?.company_name} (☎${pro?.phone}) (${pro?.distance}-KM)`}</MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    )
                  }
                  {
                    modalName === 'Intake Call Date' &&
                    (
                      <FormControlLabel
                        control={<DateTimePicker
                          clearable
                          ampm={false}
                          value={date}
                          onChange={setDate}
                          disablePast
                          format="DD/MM/yyyy HH:mm"
                        />}
                        label={formatMessage({
                          id: 'set_intake_call_date',
                          defaultMessage: 'Set Intake Call Date:'
                        })}
                        labelPlacement='start'
                      />
                    )
                  }
                  {
                    modalName === 'Intake Call Done' &&
                    (
                      <FormControlLabel
                        control={<Switch checked={isIntake} onChange={() => setIsIntake(prev => !prev)} name="isIntake" />}
                        label={formatMessage({
                          id: 'intake_call_done',
                          defaultMessage: 'Intake Call Done'
                        }) + '?'}
                        labelPlacement='top'
                      />
                    )
                  }
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
                  id: 'save',
                  defaultMessage: 'Save'
                })}
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </main>
  );
};

export { AssignPro };
