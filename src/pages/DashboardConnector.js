import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// import { Steps } from "../components/Index";
import { AppContext } from "../context/AppContext";
import { LayoutConnector } from "../components/LayoutConnector";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { AssignPro } from "../components/Index";

import { FormatDate, FormatDateTime } from "../helper/FormatDate";

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
    position: "absolute",
    top: "15vh",
    left: "35vw",
    width: 700,
    height: 650,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    width: 150,
  },
}));

const DashboardConnector = () => {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const { user, setUser, userProfile, setUserProfile } = useContext(AppContext);
  const [ticketsData, setTicketsData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(null);

  useEffect(async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
    };

    const response = await fetch(
      `https://bbank-backend-app.herokuapp.com/ticket/ticket-list/?page=${page}`,
      requestOptions
    );
    const data = await response.json();
    console.log("DATA", data);
    setPageSize(Math.floor(data.count / 10));

    setTicketsData(data.results);
  }, [open, page]);

  const handleOpen = (ticket) => {
    setOpen(true);
    setSelectedTicket(ticket);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalBody = (
    <div className={classes.paperModal}>
      <h1 id="simple-modal-title">Assign Pro</h1>
      <AssignPro selectedTicket={selectedTicket} handleClose={handleClose} />
    </div>
  );

  return (
    <LayoutConnector pageTitle="Dashboard">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalBody}
      </Modal>
      <Grid container spacing={3}>
        {/* Stepper */}
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>{/* <Steps /> */}</Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography
              component="h2"
              variant="h6"
              color="secondary"
              gutterBottom
            >
              All Tickets
            </Typography>

            {ticketsData.length > 0 ? (
              <>
                <Pagination
                  count={pageSize}
                  color="secondary"
                  onChange={(event, page) => setPage(page)}
                />
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Ticket ID</TableCell>
                      <TableCell>Owner</TableCell>
                      <TableCell>Create Date</TableCell>
                      <TableCell>Appointment Date</TableCell>
                      <TableCell>Phone Number</TableCell>
                      <TableCell>Assign Pro</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ticketsData?.slice(0).map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>{ticket.id}</TableCell>
                        <TableCell>{`${ticket.owner.first_name} ${ticket.owner.last_name}`}</TableCell>
                        <TableCell>{FormatDate(ticket.created_at)}</TableCell>
                        <TableCell>
                          {ticket?.appointment_date
                            ? FormatDateTime(ticket?.appointment_date)
                            : "-"}
                        </TableCell>
                        <TableCell>{ticket.phone_number}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => {
                              handleOpen(ticket);
                            }}
                            variant="outlined"
                            color={ticket?.pro ? "primary" : "secondary"}
                            value="Choose"
                            className={classes.button}
                          >
                            {ticket?.pro ? "Pro Assigned" : "Assign Pro"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
                <CircularProgress color="secondary" />
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </LayoutConnector>
  );
};

export { DashboardConnector };
