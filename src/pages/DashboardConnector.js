import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";

import { makeStyles, Button } from "@material-ui/core";

import { Dashboard } from "../components/Dashboard";
import { LayoutConnector } from "../views";
import { FormatDate, FormatDateTime } from "../helper/FormatDate";
import { AssignPro } from "../components/AssignPro";

import api from "../api";

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
    width: 150,
    fontSize: 12,
    paddingLeft: 2,
    paddingRight: 2,
  },
}));

export const DashboardConnector = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(null);

  const handleOpen = (ticket) => {
    setOpen(true);
    setSelectedTicket(ticket);
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

  const dateParams = { selectedTicket, handleClose };
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
          title: "Assign Pro",
          content: <AssignPro {...dateParams} />,
          ...modalParams,
        },
      ]}
      list={{
        title: "All Tickets",
        headers: [
          "Ticket ID",
          "Owner",
          "Create Date",
          "Appointment Date",
          "Phone Number",
          "Assign Pro",
        ],
        body: [
          (t) => t.id,
          (t) => `${t.owner.first_name} ${t.owner.last_name}`,
          (t) => FormatDate(t.created_at),
          (t) =>
            t?.appointment_date ? FormatDateTime(t.appointment_date) : "-",
          (t) => t.phone_number,
          (t) => (
            <Button
              onClick={() => handleOpen(t)}
              variant="outlined"
              color={t?.pro ? "primary" : "secondary"}
              value="Choose"
              className={classes.button}
            >
              {t?.pro ? "Pro Assigned" : "Assign Pro"}
            </Button>
          ),
        ],
      }}
    />
  );
};
