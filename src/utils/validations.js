import { string, number, boolean, date, array, object, ref, bool } from 'yup';
import { FormattedMessage } from 'react-intl'

export const firstName = string()
    .required(<FormattedMessage id='this_field_is_required' defaultMessage='This field is required' defaultMessage='This field is required' />)
    .min(2, <FormattedMessage id='must_be_at_least_2_characters' defaultMessage='Must be at least 2 characters' />)
    .max(30, <FormattedMessage id='must_be_a_maximum_of_30_characters' defaultMessage='Must be a maximum of 30 characters' />);

export const lastName = string()
    .required(<FormattedMessage id='this_field_is_required' defaultMessage='This field is required' />)
    .min(1, <FormattedMessage id='must_be_at_least_2_characters' defaultMessage='Must be at least 2 characters' />)
    .max(30, <FormattedMessage id='must_be_a_maximum_of_30_characters' defaultMessage='Must be a maximum of 30 characters' />
    );

export const userName = string()
    .required(<FormattedMessage id='this_field_is_required' defaultMessage='This field is required' />)
    .min(1, <FormattedMessage id='must_be_at_least_1_characters' defaultMessage='Must be at least 1 characters' />)
    .max(30, <FormattedMessage id='must_be_a_maximum_of_30_characters' defaultMessage='Must be a maximum of 30 characters' />);

export const email = string()
    .required(<FormattedMessage id='this_field_is_required' defaultMessage='This field is required' />)
    .email(<FormattedMessage id='invalid_email' defaultMessage='Invalid e-mail' />)
    .min(4, <FormattedMessage id='must_be_at_least_4_characters' defaultMessage='Must be at least 4 characters' />)
    .max(30, <FormattedMessage id='must_be_a_maximum_of_30_characters' defaultMessage='Must be a maximum of 30 characters' />);

export const password = string()
    .required(<FormattedMessage id='this_field_is_required' defaultMessage='This field is required' />)
    .min(6, <FormattedMessage id='must_be_at_least_6_characters' defaultMessage='Must be at least 6 characters' />)
    .max(30, <FormattedMessage id='must_be_a_maximum_of_30_characters' defaultMessage='Must be a maximum of 30 characters' />);

export const passwordConfirm = string()
    .oneOf([ref("password"), null], <FormattedMessage id='passwords_must_match' defaultMessage='Passwords must match' />);

export const phone = string()
    .required(<FormattedMessage id='this_field_is_required' defaultMessage='This field is required' />)
    .min(1, <FormattedMessage id='must_be_at_least_1_characters' defaultMessage='Must be at least 1 characters' />)
    .max(20, <FormattedMessage id='must_be_a_maximum_of_20_characters' defaultMessage='Must be a maximum of 20 characters' />);

export const zipAddress = string()
    .required(<FormattedMessage id='this_field_is_required' defaultMessage='This field is required' />)
    .min(1, <FormattedMessage id='must_be_at_least_1_characters' defaultMessage='Must be at least 1 characters' />)
    .max(30, <FormattedMessage id='must_be_a_maximum_of_8_characters' defaultMessage='Must be a maximum of 8 characters' />);

export const address = string()
    .typeError(<FormattedMessage id='this_field_is_required' defaultMessage='This field is required' />)
    .required(<FormattedMessage id='this_field_is_required' defaultMessage='This field is required' />)
    .min(1, <FormattedMessage id='must_be_at_least_1_characters' defaultMessage='Must be at least 1 characters' />)
    .max(100, <FormattedMessage id='must_be_a_maximum_of_30_characters' defaultMessage='Must be a maximum of 30 characters' />);

export const aboutMe = string()
    .typeError(<FormattedMessage id='this_field_is_required' defaultMessage='This field is required' />)
    .required(<FormattedMessage id='this_field_is_required' defaultMessage='This field is required' />)
    .min(50, <FormattedMessage id='must_be_at_least_50_characters' defaultMessage='Must be at least 50 characters' />)
    .max(1000, <FormattedMessage id='must_be_a_maximum_of_1000_characters' defaultMessage='Must be a maximum of 1000 characters' />);

export const minimumIncome = boolean()
    .required(<FormattedMessage id='this_field_is_required' defaultMessage='This field is required' />);

export const content = string()
    .typeError('This field is required')
    .required(<FormattedMessage id='this_field_is_required' defaultMessage='This field is required' />)
    .min(50, <FormattedMessage id='must_be_at_least_50_characters' defaultMessage='Must be at least 50 characters' />)
    .max(1000, <FormattedMessage id='must_be_a_maximum_of_1000_characters' defaultMessage='Must be a maximum of 1000 characters' />);

export const conditions = bool()
    .oneOf([true], <FormattedMessage id='this_field_is_required' defaultMessage='This field is required' />)

export const companyName = string()
    .max(100, <FormattedMessage id='must_be_a_maximum_of_100_characters' defaultMessage='Must be a maximum of 100 characters' />);

export const gender = number().min(0).max(2);

export const capacity = number().min(0);
