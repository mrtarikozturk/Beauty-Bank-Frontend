import { FormControl, Grid, InputLabel, MenuItem, Select, makeStyles } from '@material-ui/core';
import React from 'react'
import { useIntl } from 'react-intl';

const useStyles = makeStyles({
    formControl: {
        minWidth: '100%',
        maxWidth: 275
    },
})

const GenderField = (props) => {

    const { formik, sm = 6 } = props;
    const { formatMessage } = useIntl();
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={sm}>
            <FormControl className={classes.formControl}>
                <InputLabel id="gender-select-helper-label">
                    {formatMessage({
                        id: 'gender',
                        defaultMessage: 'Gender'
                    })}
                </InputLabel>
                <Select
                    labelId="gender-select-helper-label"
                    name="gender"
                    {...formik.getFieldProps("gender")}
                    error={formik.touched.gender && formik.errors.gender}
                    helperText={formik.touched.gender && formik.errors.gender}
                >
                    <MenuItem value={0}>
                        {formatMessage({
                            id: 'male',
                            defaultMessage: 'Male'
                        })}
                    </MenuItem>
                    <MenuItem value={1}>
                        {formatMessage({
                            id: 'female',
                            defaultMessage: 'Female'
                        })}
                    </MenuItem>
                    <MenuItem value={2}>
                        {formatMessage({
                            id: 'not_spesified',
                            defaultMessage: 'Not Specified'
                        })}
                    </MenuItem>
                </Select>
            </FormControl>
        </Grid>
    )
}

export default GenderField
