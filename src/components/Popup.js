import { useState, useEffect, useRef } from "react";
import { Dialog, DialogTitle, DialogActions, DialogContent, Typography, IconButton, makeStyles, } from "@material-ui/core";
import CloseIcon from "@material-ui//icons/Close";
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    closeIcon: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    }
}));

export const usePopup = () => {
    const [open, setOpen] = useState(false);

    const togglePopup = () => setOpen(prev => !prev)

    return {
        open,
        togglePopup
    }
}

export const Popup = (props) => {

    const {
        open,
        title,
        children,
        togglePopup,
        buttons,
        customTitle,
        customFooter,
        closeIcon = true,
        autoClose = true,
        scroll = 'paper',
        maxWidth = 'sm',
        dividers = true
    } = props

    const descriptionElementRef = useRef(null);
    const classes = useStyles();

    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={autoClose && togglePopup}
            scroll={scroll}
            fullWidth={false}
            maxWidth={maxWidth}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
        >
            <DialogTitle disableTypography >
                {customTitle || <Typography variant="h6">{title}</Typography>}
                {closeIcon &&
                    <IconButton
                        aria-label="close"
                        className={classes.closeIcon}
                        onClick={togglePopup}
                    >
                        <CloseIcon />
                    </IconButton>}
            </DialogTitle>
            <DialogContent
                dividers={dividers}
                ref={descriptionElementRef}
                tabIndex={-1}
            >
                {children}
            </DialogContent>
            {   buttons ?
                (<DialogActions>
                    {buttons}
                </DialogActions>) :
                customFooter
            }
        </Dialog >
    );
}

Popup.propsTypes = {
    title: PropTypes.string,
    closeIcon: PropTypes.bool,
    autoClose: PropTypes.bool,
    scroll: PropTypes.oneOf(['paper', 'body']),
    maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    dividers: PropTypes.bool,
    buttons: PropTypes.element,
    children: PropTypes.node.isRequired,
    togglePopup: PropTypes.func,
    open: PropTypes.bool,

}
Popup.defaultProps = {
    title: 'Title',
    closeIcon: true,
    autoClose: true,
    scroll: 'paper',
    maxWidth: 'sm',
    dividers: true
}


