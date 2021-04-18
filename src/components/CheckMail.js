import React from 'react';

import ModalHeader from './ModalHeader';
import { Popup } from './Popup';
import { makeStyles } from '@material-ui/core';
import ActionBox from './ActionBox';

const useStyles = makeStyles(theme => ({
    logo: {
        display: 'block',
        margin: 'auto',
        width: theme.spacing(30),
    }
}));

const CheckMail = (props) => {

    const { checkMailModal, setCheckMailModal, setForgotPasswordModal } = props;
    const classes = useStyles();

    const toggleCheckMail = () => setCheckMailModal(prev => !prev)
    const toggleForgot = () => setForgotPasswordModal(prev => !prev);

    const handleSkip = (e) => {
        toggleCheckMail();
    }

    return (
        <Popup
            open={checkMailModal}
            togglePopup={toggleCheckMail}
            dividers={false}
            scroll='body'
            customHeader={<ModalHeader
                titleId='check_your_email'
                titleMsg='Check Your E-mail'
                descId='check_your_mail_message'
                descMsg={'We have sent a password recover instructions to your email.'}
            />}
        >
            <img src={'../images/mail2.png'} alt='company logo' className={classes.logo} />
            <ActionBox
                buttonTextId='skip'
                buttonTextMsg={'Skip'}
                buttonOnClick={handleSkip}
            />
        </Popup >
    )
}

export default CheckMail
