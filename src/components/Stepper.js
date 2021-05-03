import { makeStyles } from "@material-ui/core/styles";
import MuiStepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const getSteps = () => {
  return [

    <FormattedMessage id='intake_call' defaultMessage='Intake Call' />,
    <FormattedMessage id='approve_terms' defaultMessage='Approve Terms and Conditions' />,
    <FormattedMessage id='set_appointment_date' defaultMessage='Set Appointment Date' />,
    <FormattedMessage id='appointment' defaultMessage='Appointment' />,
    <FormattedMessage id='feedback' defaultMessage='Feedback' />
  ];
};

const getStepContent = (stepIndex) => {
  switch (stepIndex) {
    case -1:
      return "";
    case 0:
      return <FormattedMessage
        id='our_connector_will_call_you'
        defaultMessage='We received your request. One of our connectors will call you soon...' />;
    case 1:
      return <FormattedMessage
        id='please_check_your_email_box_and_approve_the_terms'
        defaultMessage='We sent an email about our terms and conditions. We wait for your approve on the email to proceed.' />;
    case 2:
      return <FormattedMessage
        id='please_set_your_appointment_date'
        defaultMessage='Please set your appointment date.' />;
    case 3:
      return <FormattedMessage
        id='please_dont_forget_your_appointment'
        defaultMessage='This is a reminder for your appointment. Please let us know if you are unable to attend it.' />;
    case 4:
      return <FormattedMessage
        id='please_write_feedback_for_better_service'
        defaultMessage='Please, write your feelings and thoughts on your feedback. Also it would be great to attach some before and after pictures...' />;
    default:
      return <FormattedMessage
        id='there_is_a_problem_please_contact_us'
        defaultMessage='There is a problem, please contact us.' />;
  }
};

export const Stepper = ({ activeStep = 0, isMobile, className }) => {
  // constants
  const classes = useStyles();
  const steps = getSteps();

  return (
    <div className={classes.root}>
      {!isMobile ? (
        <>
          {" "}
          <MuiStepper
            activeStep={activeStep}
            alternativeLabel
            // orientation={isMobile ? "vertical" : "horizontal"}
            className={className}
          >
            {steps.map((item) => (
              <Step key={item}>
                <StepLabel>{item}</StepLabel>
              </Step>
            ))}
          </MuiStepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed
                </Typography>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Typography>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed
                </Typography>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Typography>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
