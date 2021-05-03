import { useIntl } from 'react-intl';
import { FormControl, Grid, InputLabel, Select, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    formControl: {
        minWidth: '100%',
        maxWidth: 275
    },
})

const SelectField = (props) => {
    const { name, id, defaultMessage, formik, children, sm = 6, ...rest } = props;
    const classes = useStyles();
    const { formatMessage } = useIntl();

    return (
        <Grid item xs={12} sm={sm}>
            <FormControl className={classes.formControl}>
                <InputLabel id="selectLabel">
                    {formatMessage({ id, defaultMessage })}
                </InputLabel>
                <Select
                    name={name}
                    labelId="selectLabel"
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    error={formik.touched[name] && formik.errors[name]}
                    helperText={formik.touched[name] && formik.errors[name]}
                    {...rest}
                >
                    {children}
                </Select>
            </FormControl>
        </Grid>
    )
}

export default SelectField
