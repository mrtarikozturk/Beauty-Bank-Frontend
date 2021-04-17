import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

import { Popup } from './Popup';
import ModalHeader from './ModalHeader';
import ActionBox from './ActionBox';


const useStyles = makeStyles(theme => ({
    logo: {
        display: 'block',
        margin: 'auto',
        width: theme.spacing(30),
    }
}));

const PasswordChanged = (props) => {
    const classes = useStyles();
    const { passwordChangedModal, setPasswordChangedModal } = props;

    const togglePasswordChanged = () => setPasswordChangedModal(prev => !prev);

    const handleClick = (e) => {
        togglePasswordChanged();
    }

    return (
        <Popup
            open={passwordChangedModal}
            togglePopup={togglePasswordChanged}
            maxWidth='sm'
            dividers={false}
            customHeader={
                <ModalHeader
                    titleId='password_changed_successfully'
                    titleMsg='Password Changed Successfully'
                    descId='password_changed_successfully_message'
                    descMsg='You can now sign in with your new password'
                />
            }
        >
            <img src={'../images/success.png'} alt='password changed successfully' className={classes.logo} />
            <ActionBox
                buttonTextId='ok'
                buttonTextMsg='OK'
                buttonOnClick={handleClick}
            />
        </Popup >
    )
}

export default PasswordChanged;
