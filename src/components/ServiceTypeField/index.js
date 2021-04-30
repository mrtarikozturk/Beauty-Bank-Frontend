import React from 'react'
import { Checkbox, FormControl, Grid, Input, InputLabel, ListItemText, MenuItem, Select, makeStyles } from '@material-ui/core'
import { useIntl } from 'react-intl';

const useStyles = makeStyles({
    formControl: {
        minWidth: '100%',
        maxWidth: 275
    },
})

const ServiceTypeField = (props) => {
    const { services, selectedServices, handleChange, sm = 6 } = props;
    const classes = useStyles();
    const { formatMessage } = useIntl();

    return (
        <Grid item xs={12} sm={sm}>
            <FormControl className={classes.formControl}>
                <InputLabel id="mutiple-checkbox-label">
                    {formatMessage({
                        id: 'services',
                        defaultMessage: 'Services'
                    })}
                </InputLabel>
                <Select
                    labelId="mutiple-checkbox-label"
                    multiple
                    required
                    fullWidth
                    value={selectedServices}
                    onChange={handleChange}
                    input={<Input />}
                    renderValue={(selected) => selected.map(item => {
                        return services.find(type => type.id == item)?.name
                    }).join(', ')}
                >
                    {services && services?.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            <Checkbox checked={selectedServices.indexOf(item.id) > -1} />
                            <ListItemText primary={item.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    )
}

export default ServiceTypeField
