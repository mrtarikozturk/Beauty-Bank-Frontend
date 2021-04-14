import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { useIntl } from 'react-intl';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";

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
  },
}));

const EmailSendInfo = () => {
  const classes = useStyles();
  const history = useHistory();
  const { formatMessage } = useIntl();

  const handleClick = () => {
    history.push("/login");
  };

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
              <img src="../images/logo.jpg" className={classes.avatar} />
              {formatMessage({
                id: 'please_verify_your_email',
                defaultMessage: 'Please Verify Your E-mail!'
              })}
            </Typography>
            <Alert severity="success">
              {formatMessage({
                id: 'please_verify_your_email_success_message',
                defaultMessage: 'We have sent an email to you.If you have not received the verification email, please check your "Spam" or "Bulk Email" folder.'
              })}
            </Alert>
          </CardContent>
          <CardActions>
            <Button
              onClick={handleClick}
              fullWidth
              variant="outlined"
              color="secondary"
              value="Login Page"
            >
              {formatMessage({
                id: 'go_to_login_page',
                defaultMessage: 'Go to Login Page'
              })}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export { EmailSendInfo };
