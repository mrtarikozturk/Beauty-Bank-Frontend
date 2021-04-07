import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

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

const EmailVerify = () => {
  const classes = useStyles();
  const params = useParams();
  const [isVerified, setVerified] = useState(false);
  const history = useHistory();

  useEffect(async () => {
    const token = params.token;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: `${token}` }),
    };

    const response = await fetch(
      "https://bbank-backend-app.herokuapp.com/auth/email-verify/",
      requestOptions
      //TODO API nin degismesi gerekiyor.
    );
    const data = await response.json();

    if (data.email == "Successfully activated") {
      setVerified(true);
    }
  }, []);

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
              Email Verification
            </Typography>
            {isVerified ? (
              <Alert severity="success">
                Your email successfully verified!
              </Alert>
            ) : (
              <Alert severity="error">Your email not verified!</Alert>
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
              Go to Login Page
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export { EmailVerify };
