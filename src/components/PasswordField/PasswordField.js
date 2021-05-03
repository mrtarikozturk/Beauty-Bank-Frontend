import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const PasswordField = (props) => {
    // constants
    const { name, formik, id, defaultMessage, sm = 6, ...rest } = props;
    const { formatMessage } = useIntl();

    // usestate
    const [isShow, setIsShow] = useState(false);

    // functions
    const handleClick = () => {
        setIsShow(prev => !prev);
    };

    return (
        <Grid item xs={12} sm={sm}>
            <TextField
                label={formatMessage({ id, defaultMessage })}
                name={name}
                autoComplete={name}
                required
                fullWidth
                type={isShow ? "text" : "password"}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClick}
                            >
                                {isShow ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                {...formik.getFieldProps(name)}
                error={formik.touched[name] && formik.errors[name]}
                helperText={formik.touched[name] && formik.errors[name]}
                {...rest}
            />
        </Grid>
    )
}

export default PasswordField
