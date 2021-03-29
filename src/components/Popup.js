import { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import { Dialog, DialogActions, DialogContent, DialogContentText, Typography, IconButton, makeStyles, } from "@material-ui/core";
import CloseIcon from "@material-ui//icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";

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

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return {
        open,
        handleClose,
        handleOpen,
    }
}

export const Popup = (props) => {

    const { open, title, children, handleClose, autoClose, scroll = 'paper' } = props
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
            onClose={autoClose && handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <MuiDialogTitle disableTypography >
                <Typography variant="h6">{title}</Typography>
                <IconButton
                    aria-label="close"
                    className={classes.closeIcon}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
            </MuiDialogTitle>
            <DialogContent
                dividers={scroll === "paper"}
                ref={descriptionElementRef}
                tabIndex={-1}
            >
                {children}
            </DialogContent>
        </Dialog >
    );
}


