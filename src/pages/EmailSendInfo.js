import React from "react";
import { useHistory,useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
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
  const {search} = useLocation()
  const searchParams = new URLSearchParams(search)
  const userRole = searchParams.get('userRole')
  const handleClick = () => {

    if(userRole==="client") {
      history.push(`/login?_wfx_=6ad034e0-961d-11eb-8b3d-32b5f385aed9`);
    }else if (userRole==="professional") {
      history.push(`/login?_wfx_=4bb0e600-9ab3-11eb-b756-32b5f385aed9`);
    }else {
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
              Please Verify Your Email!
            </Typography>
            <Alert severity="success">
              We have sent an email to You need to verify your email to
              continue.If you have not receiveed the verification email, please
              check your "Spam" or "Bulk Email" folder.
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
              Go to Login Page
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export { EmailSendInfo };
