import React from 'react';
import { useHistory } from 'react-router';

import { Dashboard as DashboardIon, AccountCircle, PostAdd as PostAddIcon } from '@material-ui/icons'

import Layout from '../components/Layout'

export const LayoutClient = ({ children, pageTitle }) => {
  const history = useHistory()

  const list = [
    {
      icon: <AccountCircle color='secondary' />,
      title: "Profile",
      onClick: () => history.push('/client-profile')
    },
    {
      icon: <DashboardIon color='secondary' />,
      title: "Dashboard",
      onClick: () => history.push('/client')
    },
    {
      icon: <PostAddIcon color='secondary' />,
      title: "Make Request",
      onClick: () => history.push('/create-ticket')
    }
  ]
  return <Layout pageTitle={pageTitle} list={list}>{children}</Layout>
}
