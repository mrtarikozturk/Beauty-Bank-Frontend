import React from "react";
import clsx from "clsx";
import { useIntl } from 'react-intl';

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
  isMobile,
}) => {
  const fixedHeightPaper =
    hasStepper && !isMobile
      ? clsx(classes.paper, classes.fixedHeight)
      : clsx(classes.paperMobil);
  const { formatMessage } = useIntl();

  return (
    <Layout pageTitle={formatMessage({
      id: 'dashboard',
      defaultMessage: 'Dashboard'
    })}>
      {modals.map((modal) => (
        <Modal
          key={modal.title}
          open={modal.open}
          onClose={modal.onModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.paperModal}>
            <h1 className="simple-modal-title">
              {modal.title && formatMessage({
                id: modal.title
              })}
            </h1>
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
                isMobile={isMobile}
                className={isMobile && classes.mobilStep}
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
              <div style={{ overflowX: "auto" }}>
                <List list={list} tickets={tickets} pagination={pagination} />
              </div>
            )}
            {!loading && !tickets.length && (
              <Typography>{formatMessage({
                id: 'no_ticket_to_list',
                defaultMessage: 'No request was made.'
              })}</Typography>
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
