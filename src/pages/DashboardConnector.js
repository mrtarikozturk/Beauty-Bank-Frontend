import React, { useState, useEffect } from "react";

import { makeStyles, Button, IconButton } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Dashboard } from "../components/Dashboard";
import { LayoutConnector } from "../views";
import { FormatDate, FormatDateTime } from "../helper/FormatDate";
import { AssignPro } from "../components/AssignPro";
import api, { handleError } from "../api";
import { useSnackbar } from "notistack";
import AddIcCallIcon from '@material-ui/icons/AddIcCall';
import { useIntl } from 'react-intl';


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(10),
  },
  datePicker: {
    width: '135px',
  },
  fixedHeight: {
    height: 240,
  },
  paperModal: {
    width: 700,
    maxWidth: "90vw",
    maxHeight: "90%",
    margin: "auto",
    marginTop: "60px",
    overflowY: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: "20px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  button: {
    width: 'auto',
    fontSize: 12,
    paddingLeft: 2,
    paddingRight: 2,
  },
}));


export const DashboardConnector = () => {
  const classes = useStyles();
  const { formatMessage } = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();


  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [modalName, setModalName] = useState('');

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(null);

  const handleOpen = (ticket, name) => {
    setOpen(true);
    setSelectedTicket(ticket);
    setModalName(name);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    api
      .get(`ticket/ticket-list/?page=${page}`)
      .then((data) => {
        setTickets(data.results);
        // TODO: pageSize from backend
        setPageSize(Math.floor(data.count / 10));
      })
      .catch((err) => enqueueSnackbar(err.message, { variant: "error" }))
      .finally(() => setLoading(false));
  }, [open, page]);

  const dateParams = { selectedTicket, handleClose, modalName };
  const modalParams = { open, onModalClose: handleClose };

  return (
    <Dashboard
      Layout={LayoutConnector}
      classes={classes}
      tickets={tickets}
      loading={loading}
      pagination={{ pageSize, setPage }}
      modals={[
        {
          title: modalName,
          content: <AssignPro {...dateParams} />,
          ...modalParams,
        },
      ]}
      list={{
        title: formatMessage({
          id: 'all_tickets',
          defaultMessage: 'All Requests'
        }),
        headers: [
          formatMessage({
            id: 'ticket_id',
            defaultMessage: 'Request ID'
          }),
          formatMessage({
            id: 'owner',
            defaultMessage: 'Owner'
          }),
          formatMessage({
            id: 'create_date',
            defaultMessage: 'Create Date'
          }),
          formatMessage({
            id: 'appointment_date',
            defaultMessage: 'Appointment Date'
          }),
          formatMessage({
            id: 'phone_number',
            defaultMessage: 'Phone Number'
          }),
          formatMessage({
            id: 'intake_call_date',
            defaultMessage: 'Intake Call Date'
          }),
          formatMessage({
            id: 'intake_call',
            defaultMessage: 'Intake Call'
          }),
          formatMessage({
            id: 'assign_pro',
            defaultMessage: 'Assign Pro'
          })
        ],
        body: [
          (t) => t.id,
          (t) => `${t.owner.first_name} ${t.owner.last_name}`,
          (t) => FormatDate(t.created_at),
          (t) =>
            t?.appointment_date ? FormatDateTime(t.appointment_date) : "-",
          (t) => t.phone_number,
          (t) => (
            !t?.intake_call_date ?
              <Button
                onClick={() => handleOpen(t, 'intake_call_date')}
                variant="outlined"
                color='primary'
                value="intake"
                className={classes.button}
              >
                {formatMessage({
                  id: 'set_date',
                  defaultMessage: 'Set Date'
                })}
              </Button>
              :
              <DateTimePicker
                className={classes.datePicker}
                value={t?.intake_call_date}
                readOnly={t?.intake_call_date}
                format="DD/MM/yyyy HH:mm"
              />
          ),
          (t) => (
            t?.is_intake_call ?
              <CheckCircleIcon color='secondary' />
              :
              <IconButton onClick={() => handleOpen(t, 'intake_call_done')}>
                < AddIcCallIcon color='primary' />
              </IconButton>
          ),
          (t) => (
            <Button
              onClick={() => handleOpen(t, 'assign_pro')}
              variant="outlined"
              color={t?.pro ? "secondary" : "primary"}
              value="Choose"
              className={classes.button}
            >
              {t?.pro ?
                formatMessage({
                  id: 'pro_assigned',
                  defaultMessage: 'Pro Assigned'
                }) :
                formatMessage({
                  id: 'assign_pro',
                  defaultMessage: 'Assign Pro'
                })}
            </Button>
          ),
        ],
      }}
    />
  );
};
