import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { useIntl } from 'react-intl';

import { AppContext } from "../context/AppContext";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 600,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const ConfirmTicket = () => {
  const classes = useStyles();
  const params = useParams();
  const [isConfirmed, setConfirmed] = useState(false);
  const history = useHistory();
  const { formatMessage } = useIntl();

  const { user, setUser, userProfile, setUserProfile } = useContext(AppContext);

  useEffect(async () => {

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
    };

    const response = await fetch(
      `https://bbank-backend-app.herokuapp.com/ticket/confirm/${params.id}`,
      requestOptions
    );
    const data = await response.json();

    if (data.messages == "Confirm  Ticket Successfuly") {
      setConfirmed(true);
      history.push("/client");
    }
  }, [user]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12}>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title}>
              {formatMessage({
                id: 'confirm_ticket',
                defaultMessage: 'Confirm Request'
              })}
            </Typography>
            {isConfirmed ? (
              <Alert severity="success">
                {formatMessage({
                  id: 'your_ticket_successfully_confirmed',
                  defaultMessage: 'Your request was successfully confirmed!'
                })}
              </Alert>
            ) : (
              <Alert severity="error">
                {formatMessage({
                  id: 'your_ticket_not_confirmed',
                  defaultMessage: 'Your request was not confirmed!'
                })}
              </Alert>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export { ConfirmTicket };
