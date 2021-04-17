import { makeStyles, Box, Typography, Link, Button } from '@material-ui/core';
import { useIntl } from 'react-intl';



const useStyles = makeStyles(theme => ({
    actionBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: theme.spacing(3, 0),
    },
    linkBox: {
        marginTop: theme.spacing(3),
    },
    linkMessage: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        color: 'rgba(0,11,42,0.88)',
        marginRight: theme.spacing(1),
    },
    link: {
        color: 'rgba(98, 0, 238, 1)',
        textTransform: 'capitalize',
        cursor: 'pointer',
    }
}));

const ActionBox = (props) => {
    const classes = useStyles();
    const { formatMessage } = useIntl()
    const {
        buttonType,
        buttonTextId,
        buttonTextMsg,
        buttonOnClick,
        linkTxtId,
        linkTxtMsg,
        linkOnClick,
        descId,
        descMsg,
    } = props

    return (
        <Box className={classes.actionBox}>
            <Button
                fullWidth
                variant="contained"
                color="secondary"
                type={buttonType}
                onClick={buttonOnClick}
            >
                {formatMessage({
                    id: buttonTextId,
                    defaultMessage: buttonTextMsg
                })}
            </Button>
            {
                linkTxtId && (
                    <Box className={classes.linkBox}>
                        {
                            descId && (
                                <Typography component='span' className={classes.linkMessage} >
                                    {formatMessage({
                                        id: descId,
                                        defaultMessage: descMsg
                                    })}
                                </Typography>
                            )
                        }
                        <Link onClick={linkOnClick} component='button' className={classes.link}>
                            {formatMessage({
                                id: linkTxtId,
                                defaultMessage: linkTxtMsg
                            })}
                        </Link>
                    </Box>
                )
            }
        </Box>
    )
}

export default ActionBox;
