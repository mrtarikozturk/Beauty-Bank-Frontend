import React from 'react'
import { MenuItem, } from '@material-ui/core';
import { useIntl } from 'react-intl';
import SelectField from '../SelectField';

const GenderField = (props) => {

    const { formik, sm } = props;
    const { formatMessage } = useIntl();

    return (
        <SelectField
            name='gender'
            id='gender'
            defaultMessage='Gender'
            {...{ formik, sm }}
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
        </SelectField>
    )
}

export default GenderField
