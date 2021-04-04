import { makeStyles } from "@material-ui/core/styles";
import MuiStepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";

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
    "Intake Call",
    "Approve Terms",
    "Set Appointment Date",
    "Appointment",
    "Feedback",
  ];
};

const getStepContent = (stepIndex) => {
  switch (stepIndex) {
    case -1:
      return "";
    case 0:
      return "Our connector will call you...";
    case 1:
      return "Please, check your e-mail box and approve the terms.";
    case 2:
      return "Please, set your appointment date.";
    case 3:
      return "Please, don't forget your appointment!";
    case 4:
      return "Please, write feedback for better service...";
    default:
      return "There is a problem, please contact us.";
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
