import React from 'react';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';

import { Dashboard as DashboardIon, AccountCircle } from '@material-ui/icons'

import Layout from '../components/Layout'

export const LayoutSponsor = ({ children, pageTitle }) => {
  const history = useHistory();
  const { formatMessage } = useIntl();

  const list = [
    {
      icon: <DashboardIon color='secondary' />,
      title: formatMessage({
        id: 'dashboard',
        defaultMessage: 'Dashboard'
      }),
      onClick: () => history.push('/sponsor')
    },
    {
      icon: <AccountCircle color='secondary' />,
      title: formatMessage({
        id: 'profile',
        defaultMessage: 'Profile'
      }),
      onClick: () => history.push('/sponsor-profile')
    }
  ]
  return <Layout pageTitle={pageTitle} list={list}>{children}</Layout>
}
