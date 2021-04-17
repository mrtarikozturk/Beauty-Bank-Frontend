import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";

import { makeStyles, Button } from "@material-ui/core";

import { Dashboard } from "../components/Dashboard";
import { LayoutClient } from "../views/LayoutClient";
import { FormatDate, FormatDateTime } from "../helper/FormatDate";
import { SetTicketDate } from "../components/SetTicketDate";
import { SetTicketFeedback } from "../components/SetTicketFeedback";
import { TicketDetail } from "../components/TicketDetail";
import useWindowSize from "../hooks/useWindowsSize";
import { useIntl } from 'react-intl';

import api from "../api";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    display: "flex",
    overflow: "none",
    flexDirection: "column",
    marginBottom: theme.spacing(10),
  },
  paperMobil: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  fixedHeight: {
    minHeight: 240,
  },
  mobilStep: {
    display: "flex",
    overflow: "none",
    flexDirection: "column",
    marginBottom: theme.spacing(10),
    alignItems: "center",
    justifyContent: "center",
  },
  paperModal: {
    width: 900,
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
    fontSize: 12,
    paddingLeft: 2,
    paddingRight: 2,
  },
}));

export const DashboardClient = () => {
  const classes = useStyles();
  const { formatMessage } = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const { width } = useWindowSize();
  const isMobile = width < 550;

  const [open, setOpen] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openTicket, setOpenTicket] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState([]);
  const [tickets, setTickets] = useState([]);

  const handleOpenDate = (ticket) => {
    setOpenDate(true);
    setSelectedTicket(ticket);
  };

  const handleOpenTicket = (ticket) => {
    setOpenTicket(true);
    setSelectedTicket(ticket);
  };
  const handleOpen = (ticket) => {
    setOpen(true);
    setSelectedTicket(ticket);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDate(false);
    setOpenTicket(false);
  };

  useEffect(() => {
    api
      .get("ticket/ticket-list/")
      .then((data) => {
        setTickets(data.results);
      })
      .catch((err) => enqueueSnackbar(err.message, { variant: "error" }))
      .finally(() => setLoading(false));
  }, [open, openDate]);

  const dateParams = { selectedTicket, handleClose };

  return (
    <Dashboard
      Layout={LayoutClient}
      loading={loading}
      classes={classes}
      tickets={tickets}
      hasStepper={true}
      isMobile={isMobile}
      modals={[
        {
          title: formatMessage({
            id: 'set_appointment_date',
            defaultMessage: 'Set Appointment Date'
          }),
          content: <SetTicketDate {...dateParams} />,
          open: openDate,
          onModalClose: handleClose,
        },
        {
          title: formatMessage({
            id: 'set_appointment_feedbac',
            defaultMessage: 'Give Feedback'
          }),
          content: <SetTicketFeedback {...dateParams} />,
          open: open,
          onModalClose: handleClose,
        },
        {
          title: formatMessage({
            id: 'ticket_detail_page',
            defaultMessage: 'Request Detail Page'
          }),
          content: <TicketDetail {...dateParams} />,
          open: openTicket,
          onModalClose: handleClose,
        },
      ]}
      list={{
        title: formatMessage({
          id: 'my_tickets',
          defaultMessage: 'My Requests'
        }),
        headers: [
          formatMessage({
            id: 'ticket_id',
            defaultMessage: 'Request ID'
          }),
          formatMessage({
            id: 'appointment_date',
            defaultMessage: 'Appointment Date'
          }),
          formatMessage({
            id: 'approve_set_date',
            defaultMessage: 'Approve&Set Date'
          }),
          formatMessage({
            id: 'ticket_detail',
            defaultMessage: 'Request Detail'
          })
        ],
        body: [
          (t) => t.id,
          (t) =>
            t?.appointment_date ? FormatDateTime(t.appointment_date) : "-",
          (t) => (
            <Button
              size="small"
              onClick={() => {
                t?.appointment_date
                  ? alert(formatMessage({
                    id: 'you_already_set_the_date',
                    defaultMessage: 'You already set the date!'
                  }))
                  : handleOpenDate(t);
              }}
              variant="outlined"
              color={t?.appointment_date ? "secondary" : "primary"}
              disabled={!t?.terms_approved}
              value="Confirm"
              className={classes.button}
            >
              {t?.appointment_date
                ? formatMessage({
                  id: 'date_setted',
                  defaultMessage: 'Date Setted'
                })
                : t?.terms_approved
                  ? formatMessage({
                    id: 'set_ticket_date',
                    defaultMessage: 'Set Request Date'
                  })
                  : formatMessage({
                    id: 'approve_terms',
                    defaultMessage: 'Approve Terms and Conditions'
                  })}
            </Button>
          ),
          (t) => (
            <Button
              size="small"
              onClick={() => handleOpenTicket(t)}
              variant="outlined"
              color={"primary"}
              value="Ticket Detail"
              className={classes.button}
            >
              {formatMessage({
                id: 'ticket_detail',
                defaultMessage: 'Request Detail'
              })}
            </Button>
          ),
          (t) =>
            t?.ticket_status === "4" && (
              <Button
                size="small"
                onClick={() => handleOpen(t)}
                variant="outlined"
                color={"primary"}
                disabled={t?.ticket_status === "4" ? false : true}
                value="Feedback"
                className={classes.button}
              >
                {formatMessage({
                  id: 'feedback',
                  defaultMessage: 'Feedback'
                })}
              </Button>
            ),
        ],
      }}
    />
  );
};
