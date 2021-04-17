import React from 'react';
import { useHistory } from 'react-router';
import { Dashboard as DashboardIon, AccountCircle, PeopleAlt as PeopleAltIcon } from '@material-ui/icons'
import { useIntl } from 'react-intl';

import Layout from '../components/Layout'

export const LayoutConnector = ({ children, pageTitle }) => {
  const history = useHistory();
  const { formatMessage } = useIntl();

  const list = [
    {
      icon: <AccountCircle color='secondary' />,
      title: formatMessage({
        id: 'profile',
        defaultMessage: 'Profile'
      }),
      onClick: () => history.push('/connector-profile')
    },
    {
      icon: <DashboardIon color='secondary' />,
      title: formatMessage({
        id: 'tickects',
        defaultMessage: 'Tickets'
      }),
      onClick: () => history.push('/connector')
    },
    {
      icon: <PeopleAltIcon color='secondary' />,
      title: formatMessage({
        id: 'client_list',
        defaultMessage: 'Client List'
      }),
      onClick: () => history.push('/connector-client-list')
    },
    {
      icon: <PeopleAltIcon color='secondary' />,
      title: formatMessage({
        id: 'pro_list',
        defaultMessage: 'Professional List'
      }),
      onClick: () => history.push('/connector-pro-list')
    }
  ]
  return <Layout pageTitle={pageTitle} list={list}>{children}</Layout>
}
