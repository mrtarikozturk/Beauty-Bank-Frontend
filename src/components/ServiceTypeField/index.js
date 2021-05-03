import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Checkbox, Input, ListItemText, MenuItem, } from '@material-ui/core'
import SelectField from '../SelectField';


const ServiceTypeField = (props) => {
    const { formik, sm } = props;
    const [services, setServices] = useState([]);
    const { REACT_APP_API_BASE_URL } = process.env;

    useEffect(() => {
        axios.get(`${REACT_APP_API_BASE_URL}auth/service-type/`)
            .then(response => {
                setServices(response?.data?.results);
            })
            .catch(err => {
                console.log(err)
            })
            .then(() => console.log(services))
    }, [])

    return (
        <SelectField
            name='serviceType'
            {...{ formik, sm }}
            id='services'
            defaultMessage='Services'
            multiple
            required
            fullWidth
            input={<Input />}
            renderValue={(selected) => selected.map(item => {
                return services.find(type => type.id == item)?.name
            }).join(', ')}
        >
            {services && services?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                    <Checkbox checked={formik?.values?.serviceType?.indexOf(item.id) > -1} />
                    <ListItemText primary={item.name} />
                </MenuItem>
            ))}
        </SelectField>
    )
}

export default ServiceTypeField
