import { Grid, TextField } from '@material-ui/core'
import React from 'react';
import { useIntl } from 'react-intl';

const Input = (props) => {

    const { name, id, defaultMessage, required = true, formik, sm = 6, ...rest } = props;
    const { formatMessage } = useIntl();


    return (
        <Grid item xs={12} sm={sm}>
            <TextField
                label={formatMessage({ id, defaultMessage })}
                name={name}
                autoComplete={name}
                required={required}
                fullWidth
                {...formik.getFieldProps(name)}
                error={formik.touched[name] && formik.errors[name]}
                helperText={formik.touched[name] && formik.errors[name]}
                {...rest}
            />
        </Grid>
    )
}

export default Input
