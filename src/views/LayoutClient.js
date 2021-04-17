import React from 'react';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';

import { Dashboard as DashboardIon, AccountCircle, PostAdd as PostAddIcon } from '@material-ui/icons'

import Layout from '../components/Layout'

export const LayoutClient = ({ children, pageTitle }) => {
  const history = useHistory();
  const { formatMessage } = useIntl();

  const list = [
    {
      icon: <AccountCircle color='secondary' />,
      title: formatMessage({
        id: 'profile',
        defaultMessage: 'Profile'
      }),
      onClick: () => history.push('/client-profile')
    },
    {
      icon: <DashboardIon color='secondary' />,
      title: formatMessage({
        id: 'dashboard',
        defaultMessage: 'Dashboard'
      }),
      onClick: () => history.push('/client')
    },
    {
      icon: <PostAddIcon color='secondary' />,
      title: formatMessage({
        id: 'make_request',
        defaultMessage: 'Make Request'
      }),
      onClick: () => history.push('/create-ticket')
    }
  ]
  return <Layout pageTitle={pageTitle} list={list}>{children}</Layout>
}
