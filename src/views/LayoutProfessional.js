import React from 'react';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';

import { Dashboard as DashboardIon, AccountCircle } from '@material-ui/icons'

import Layout from '../components/Layout'

export const LayoutProfessional = ({ children, pageTitle }) => {
  const history = useHistory();
  const { formatMessage } = useIntl();

  const list = [
    {
      icon: <DashboardIon color='secondary' />,
      title: formatMessage({
        id: 'dashboard',
        defaultMessage: 'Dashboard'
      }),
      onClick: () => history.push('/professional')
    },
    {
      icon: <AccountCircle color='secondary' />,
      title: formatMessage({
        id: 'profile',
        defaultMessage: 'Profile'
      }),
      onClick: () => history.push('/professional-profile')
    }
  ]
  return <Layout pageTitle={pageTitle} list={list}>{children}</Layout>
}
