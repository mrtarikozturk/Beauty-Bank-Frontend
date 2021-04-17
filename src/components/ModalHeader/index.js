import { makeStyles, Typography, Box } from '@material-ui/core';
import { useIntl } from "react-intl";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    },
    logo: {
        margin: theme.spacing(4, 0),
        width: theme.spacing(10),
    },
    title: {
        fontWeight: '500',
        fontSize: "1.25rem",
        color: "rgba(0, 11, 42, 0.88)",
    },
    description: {
        fontSize: '0.875rem',
        fontWeight: '400',
        color: 'rgba(0, 34, 74, 0.73)',
    }

}));

const ModalHeader = ({ titleId, titleMsg, descId, descMsg }) => {

    const { formatMessage } = useIntl();
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <img src='../images/logo.jpg' alt='company logo' className={classes.logo} />
            <Typography
                component="h5"
                variant="h5"
                className={classes.title}
                align='center'
            >
                {formatMessage({
                    id: titleId,
                    defaultMessage: titleMsg
                })}
            </Typography>
            <Typography
                component="h6"
                variant="h6"
                align='center'
                className={classes.description}
            >
                {formatMessage({
                    id: descId,
                    defaultMessage: descMsg
                })}
            </Typography>
        </Box>
    )
}

export default ModalHeader;
