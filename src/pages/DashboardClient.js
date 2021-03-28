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
    width: 150,
    fontSize: 12,
    paddingLeft: 2,
    paddingRight: 2,
  },
}));

export const DashboardClient = () => {
  const classes = useStyles();
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
          title: "Set Appointment Date",
          content: <SetTicketDate {...dateParams} />,
          open: openDate,
          onModalClose: handleClose,
        },
        {
          title: "Set Appointment Feedback",
          content: <SetTicketFeedback {...dateParams} />,
          open: open,
          onModalClose: handleClose,
        },
        {
          title: "Ticket Detail Page",
          content: <TicketDetail {...dateParams} />,
          open: openTicket,
          onModalClose: handleClose,
        },
      ]}
      list={{
        title: "My Tickets",
        headers: [
          "Ticket ID",
          "Appointment Date",
          "Approve&Set Date",
          "Ticket Detail",
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
                  ? alert("You already set the date!")
                  : handleOpenDate(t);
              }}
              variant="outlined"
              color={t?.appointment_date ? "primary" : "secondary"}
              disabled={!t?.terms_approved}
              value="Confirm"
              className={classes.button}
            >
              {t?.appointment_date
                ? "Date Setted"
                : t?.terms_approved
                ? "Set Ticket Date"
                : "Approve Terms"}
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
              Ticket Detail
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
                Feedback
              </Button>
            ),
        ],
      }}
    />
  );
};
