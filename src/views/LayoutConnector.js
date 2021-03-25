import React from 'react';
import { useHistory } from 'react-router';

import {Dashboard as DashboardIon, AccountCircle, PeopleAlt as PeopleAltIcon} from '@material-ui/icons'

import Layout from '../components/Layout'

export const LayoutConnector = ({children, pageTitle}) => {
  const history = useHistory()

  const list = [
    {
      icon: <AccountCircle color='primary' />,
      title: "Profile",
      onClick: () => history.push('/connector-profile')
    },
    {
      icon: <DashboardIon color='primary' />,
      title: "Tickets",
      onClick: () => history.push('/connector')
    },
    {
      icon: <PeopleAltIcon color='primary' />,
      title: "Client List",
      onClick: () => history.push('/connector-client-list')
    },
    {
      icon: <PeopleAltIcon color='primary' />,
      title: "Pro List",
      onClick: () => history.push('/connector-pro-list')
    }
  ]
  return <Layout pageTitle={pageTitle} list={list}>{children}</Layout>
}
