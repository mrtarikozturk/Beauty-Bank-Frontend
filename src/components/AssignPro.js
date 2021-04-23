import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useIntl } from 'react-intl';
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import { DateTimePicker } from "@material-ui/pickers";
import {
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
  TableRow,
  CardContent,
  FormControlLabel,
  Switch,
  Box,
} from "@material-ui/core";

import api, { handleError } from "../api";


const useStyles = makeStyles((theme) => ({
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
  dateBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(3),
    padding: theme.spacing(2)
  }
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

  // handleSubmit
  function onSubmit() {

    switch (modalName) {
      case 'assign_pro':
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
      case 'intake_call_date':
      case 'intake_call_done':
        api
          .put(`/ticket/connector-intake/${selectedTicket.id}`, {
            ...(modalName === 'intake_call_date' && { intake_call_date: date }),
            ...(modalName === 'intake_call_done' && { is_intake_call: isIntake }),
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
    <>
      <Table
        className={classes.table}
        aria-label="a dense table"
        size="small"
      >
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
              {selectedTicket?.owner.min_incomer ? 'Yes' : 'No'}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <CardContent>
        <Typography variant="h6" component='h6'>
          {
            formatMessage({
              id: 'about_me',
              defaultMessage: 'About me'
            }) + ':'
          }
        </Typography>
        <Typography variant="body2" component="p" align='justify'>
          {selectedTicket?.owner.about_me}
        </Typography>
      </CardContent>
      <form
        className={classes.form}
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <div className={classes.formInputs}>
          <Grid item xs={12}>
            {
              modalName === 'assign_pro' &&
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
              modalName === 'intake_call_date' &&
              (
                <Box className={classes.dateBox}>
                  <Typography >
                    {
                      formatMessage({
                        id: 'set_intake_call_date',
                        defaultMessage: 'Set Intake Call Date'
                      })}{':'}
                  </Typography>
                  < DateTimePicker
                    id='component-simple'
                    clearable
                    ampm={false}
                    value={date}
                    onChange={setDate}
                    disablePast
                    format="DD/MM/yyyy HH:mm"
                  />
                </Box>
              )
            }
            {
              modalName === 'intake_call_done' &&
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
    </>
  );
};

export { AssignPro };

