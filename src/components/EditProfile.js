import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from 'notistack';
import { makeStyles, Grid, Button, } from "@material-ui/core";
import { useIntl } from 'react-intl';

import api, { handleError } from '../api'
import {
  firstName,
  lastName,
  userName,
  email,
  phone,
  zipAddress,
  address,
  aboutMe,
  minimumIncome,
} from '../utils/validations';
import Field from '../components/Field/Field';
import ServiceTypeField from '../components/ServiceTypeField/';
import GenderField from '../components/GenderField/GenderField';
import IncomeField from '../components/IncomeField/';

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: "100%",
  },
  aboutMe: {
    '& .MuiInputBase-input': {
      textAlign: 'justify'
    }
  }
}));

export const EditProfile = ({ togglePopup, userData }) => {
  // constants
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  // validation obj
  const validationSchema = yup.object().shape({
    firstName,
    lastName,
    userName,
    email,
    phone,
    address,
    aboutMe,
    ...(!userData?.is_sponsor && { zipAddress }),
    ...(userData?.is_client && { minimumIncome }),
  });

  // initial values
  const initialValues = {
    firstName: userData?.first_name,
    lastName: userData?.last_name,
    userName: userData?.username,
    email: userData?.email,
    phone: userData?.phone_number,
    phone2: userData?.phone_number2,
    gender: userData?.gender,
    address: userData?.address,
    aboutMe: userData?.about_me,
    ...(!userData?.is_sponsor && { zipAddress: userData?.zip_address, }),
    ...(userData?.is_client && { minimumIncome: userData?.min_incomer }),
    ...(userData?.is_pro && {
      twitter: userData?.twitter_account,
      instagram: userData?.instagram_account,
      facebook: userData?.facebook_account,
      youtube: userData?.youtube_account,
      serviceTypes: userData?.service_type
    })
  };

  // handleSubmit
  const onSubmit = (values) => {
    api.put(`auth/user-detail/${userData?.username}`, {
      email: values.email,
      username: values.userName,
      first_name: values.firstName,
      last_name: values.lastName,
      phone_number: values.phone,
      phone_number2: values.phone2,
      address: values.address,
      about_me: values.aboutMe,
      gender: values.gender,
      service_type: userData?.is_pro ? values.serviceType : [1], // TODO: burasi duzeltilecek.
      ...(!userData.is_sponsor && { zip_address: values.zipAddress }),
      ...(userData.is_client && { min_incomer: values.minimumIncome }),
      ...(userData.is_pro && {
        twitter_account: values.twitter,
        youtube_account: values.youtube,
        instagram_account: values.instagram,
        facebook_account: values.facebook,
      })
    }).then(() => {
      enqueueSnackbar(formatMessage({
        id: 'update_profile_successfully',
        defaultMessage: 'Profile updated successfully!'
      }), { variant: 'success' })
      togglePopup()
    }).catch(handleError(enqueueSnackbar, closeSnackbar))
  }

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form
      className={classes.form}
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <Grid container spacing={3}>
        <Field
          name='firstName'
          formik={formik}
          id='first_name'
          defaultMessage='First Name'
          autoFocus
          size='small'
        />
        <Field
          name='lastName'
          formik={formik}
          id='last_name'
          defaultMessage='Last Name'
          size='small'
        />
        <Field
          name='userName'
          formik={formik}
          id='username'
          defaultMessage='User Name'
          size='small'
        />
        <Field
          name='email'
          formik={formik}
          id='email'
          defaultMessage='E-mail'
          size='small'
        />
        <Field
          name='phone'
          formik={formik}
          id='phone_number'
          defaultMessage='Phone Number'
          size='small'
        />
        <Field
          name='phone2'
          formik={formik}
          id='phone_number'
          defaultMessage='Phone Number'
          size='small'
          required={false}
        />
        <GenderField formik={formik} />
        {userData?.is_client && (<IncomeField formik={formik} />)}
        {
          !userData?.is_sponsor &&
          (
            <Field
              name='zipAddress'
              formik={formik}
              id='zip_code'
              defaultMessage='Zip Address'
              size='small'
            />
          )
        }
        <Field
          name='address'
          formik={formik}
          id='address'
          defaultMessage='Address'
          sm={userData?.is_client ? 6 : 12}
          size='small'
        />
        <Field
          name='aboutMe'
          formik={formik}
          id='about_me'
          defaultMessage='About Me (My goal, my dream, my wish..)'
          sm={12}
          className={classes.aboutMe}
          size='small'
          multiline
        />
        {
          userData?.is_pro && (
            <>
              <Field
                name='youtube'
                formik={formik}
                id='youtube'
                defaultMessage='Youtube'
                size='small'
              />
              <Field
                name='twitter'
                formik={formik}
                id='twitter'
                defaultMessage='Twitter'
                size='small'
              />
              <Field
                name='instagram'
                formik={formik}
                id='instagram'
                defaultMessage='Instagram'
                size='small'
              />
              <Field
                name='facebook'
                formik={formik}
                id='facebook'
                defaultMessage='Facebook'
                size='small'
              />
              <ServiceTypeField {...{ formik }} />
            </>
          )
        }
      </Grid>
      <Button
        type="submit"
        fullWidth
        size='small'
        variant="contained"
        color="secondary"
        className={classes.submit}
      >
        {
          formatMessage({
            id: 'submit',
            defaultMessage: 'Submit'
          })
        }
      </Button>
    </form >
  );
};
