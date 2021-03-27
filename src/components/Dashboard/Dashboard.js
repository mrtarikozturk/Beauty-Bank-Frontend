import React from "react";
import clsx from "clsx";

import {
  Grid,
  Paper,
  Typography,
  Modal,
  CircularProgress,
} from "@material-ui/core";

import { Stepper } from "../Stepper";
import { List } from "./List";

export const Dashboard = ({
  Layout,
  classes,
  tickets,
  modals,
  hasStepper,
  list,
  pagination,
  loading,
}) => {
  const fixedHeightPaper = hasStepper
    ? clsx(classes.paper, classes.fixedHeight)
    : 0;

  return (
    <Layout pageTitle="Dashboard">
      {modals.map((modal) => (
        <Modal
          key={modal.title}
          open={modal.open}
          onClose={modal.onModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.paperModal}>
            <h1 className="simple-modal-title">{modal.title}</h1>
            {modal.content}
          </div>
        </Modal>
      ))}
      <Grid container spacing={3}>
        {hasStepper && (
          <Grid item xs={12}>
            <Paper className={fixedHeightPaper}>
              <Stepper
                activeStep={
                  tickets.length > 0 ? Number(tickets[0]?.ticket_status) : -1
                }
              />
            </Paper>
          </Grid>
        )}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography
              component="h2"
              variant="h6"
              color="secondary"
              gutterBottom
            >
              {list.title}
            </Typography>
            {!loading && tickets.length > 0 && (
              <List list={list} tickets={tickets} pagination={pagination} />
            )}
            {!loading && !tickets.length && (
              <Typography>No tickets to list!</Typography>
            )}
            {loading && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress color="secondary" />
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};
