import React from 'react';
import { useHistory } from 'react-router';

import { Dashboard as DashboardIon, AccountCircle } from '@material-ui/icons'

import Layout from '../components/Layout'

export const LayoutProfessional = ({ children, pageTitle }) => {
  const history = useHistory()

  const list = [
    {
      icon: <DashboardIon color='secondary' />,
      title: "Dashboard",
      onClick: () => history.push('/professional')
    },
    {
      icon: <AccountCircle color='secondary' />,
      title: "Profile",
      onClick: () => history.push('/professional-profile')
    }
  ]
  return <Layout pageTitle={pageTitle} list={list}>{children}</Layout>
}
