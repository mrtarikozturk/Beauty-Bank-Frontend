import { MenuItem } from '@material-ui/core';
import SelectField from '../SelectField';
import { useIntl } from 'react-intl';

const IncomeField = (props) => {
    const { formik, sm } = props;
    const { formatMessage } = useIntl();

    return (
        <SelectField
            name='minimumIncome'
            {...{ formik, sm }}
            id='do_you_have_minimum_income'
            defaultMessage='Do you have minimum income?'
        >
            <MenuItem value={false}>
                {
                    formatMessage({
                        id: 'no',
                        defaultMessage: 'No'
                    })
                }
            </MenuItem>
            <MenuItem value={true}>
                {
                    formatMessage({
                        id: 'yes',
                        defaultMessage: 'Yes'
                    })
                }
            </MenuItem>
        </SelectField >
    )
}

export default IncomeField
