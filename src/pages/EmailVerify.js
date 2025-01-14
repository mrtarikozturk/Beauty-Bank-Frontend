import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { useIntl } from 'react-intl';

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

const EmailVerify = () => {

  const { formatMessage } = useIntl();
  const classes = useStyles();
  const params = useParams();
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const userRole = searchParams.get('userRole')
  const [isVerified, setVerified] = useState(false);
  const history = useHistory();
  const { REACT_APP_API_BASE_URL } = process.env;

  useEffect(async () => {
    const token = params.token;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: `${token}` }),
    };

    const response = await fetch(
      `${REACT_APP_API_BASE_URL}auth/email-verify/`,
      requestOptions
    );
    const data = await response.json();

    if (data.email === "Successfully activated") {
      setVerified(true);
    }
  }, []);

  const handleClick = () => {
    if (userRole === "client") {
      history.push(`/login?_wfx_=6ad034e0-961d-11eb-8b3d-32b5f385aed9`);
    } else if (userRole === "professional") {
      history.push(`/login?_wfx_=4bb0e600-9ab3-11eb-b756-32b5f385aed9`);
    } else {
      history.push(`/login?_wfx_=9a38c990-9613-11eb-8b3d-32b5f385aed9`);
    }
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
              {
                formatMessage({
                  id: 'email_verification',
                  defaultMessage: 'E-mail Verification'
                })
              }
            </Typography>
            {isVerified ? (
              <Alert severity="success">
                {
                  formatMessage({
                    id: 'your_email_successfully_verified',
                    defaultMessage: 'Your e-mail successfully verified!'
                  })
                }
              </Alert>
            ) : (
              <Alert severity="error">{
                formatMessage({
                  id: 'your_email_not_verified',
                  defaultMessage: 'Your email not verified!'
                })
              }</Alert>
            )}
          </CardContent>
          <CardActions>
            <Button
              onClick={handleClick}
              fullWidth
              variant="outlined"
              color="secondary"
              value="Login Page"
            >
              {
                formatMessage({
                  id: 'go_to_login_page',
                  defaultMessage: 'Go to Login Page'
                })
              }
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export { EmailVerify };
