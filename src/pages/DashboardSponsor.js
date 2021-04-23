import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { LayoutSponsor } from "../views";
import { useIntl } from 'react-intl';


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "none",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

// TODO: Bu sayfada ne gosterilecek? Ticket table kullanilmis. Ticket table sadece burada ve dashboardadmin sayfalarinda kullanilmis.

const DashboardSponsor = () => {
  const classes = useStyles();
  const { formatMessage } = useIntl();

  return (
    <LayoutSponsor pageTitle={formatMessage({
      id: 'dashboard',
      defaultMessage: '"Dashboard"'
    })}>
      <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          </Paper>
        </Grid>
      </Grid>
    </LayoutSponsor>
  );
};

export { DashboardSponsor };
