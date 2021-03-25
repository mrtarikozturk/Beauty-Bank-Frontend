import React from 'react';
import { useHistory } from 'react-router';

import {Dashboard as DashboardIon, AccountCircle, PostAdd as PostAddIcon} from '@material-ui/icons'

import Layout from '../components/Layout'

export const LayoutClient = ({children, pageTitle}) => {
  const history = useHistory()

  const list = [
    {
      icon: <AccountCircle color='primary' />,
      title: "Profile",
      onClick: () => history.push('/client-profile')
    },
    {
      icon: <DashboardIon color='primary' />,
      title: "Dashboard",
      onClick: () => history.push('/client')
    },
    {
      icon: <PostAddIcon color='primary' />,
      title: "Create Ticket",
      onClick: () => history.push('/create-ticket')
    }
  ]
  return <Layout pageTitle={pageTitle} list={list}>{children}</Layout>
}
