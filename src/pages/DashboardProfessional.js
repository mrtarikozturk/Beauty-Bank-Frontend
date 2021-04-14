import React, { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core'

import { Dashboard } from '../components/Dashboard'
import { LayoutProfessional } from '../views'
import { FormatDate, FormatDateTime } from '../helper/FormatDate'

import api from '../api'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "none",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export const DashboardProfessional = () => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const { formatMessage } = useIntl();

  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(null);

  useEffect(() => {
    api.get(`ticket/ticket-list/?page=${page}`).then(data => {
      setTickets(data.results)
      // TODO: pageSize from backend
      setPageSize(Math.floor(data.count / 10))
    }).catch(err => enqueueSnackbar(err.message, { variant: 'error' }))
      .finally(() => setLoading(false))

  }, [page])

  return <Dashboard
    Layout={LayoutProfessional}
    classes={classes}
    tickets={tickets}
    loading={loading}
    pagination={{ pageSize, setPage }}
    modals={[]}
    list={{
      title: formatMessage({
        id: 'tickets_assigned_to_me',
        defaultMessage: 'Request Assigned to Me'
      }),
      headers: [
        formatMessage({
          id: 'ticket_id',
          defaultMessage: 'Request ID'
        }),
        formatMessage({
          id: 'owner',
          defaultMessage: 'Owner'
        }),
        formatMessage({
          id: 'create_date',
          defaultMessage: 'Create Date'
        }),
        formatMessage({
          id: 'appointment_date',
          defaultMessage: 'Appointment Date'
        }),
        formatMessage({
          id: 'phone_number',
          defaultMessage: 'Phone Number'
        })
      ],
      body: [
        t => t.id,
        t => `${t.owner.first_name} ${t.owner.last_name}`,
        t => FormatDate(t.created_at),
        t => t?.appointment_date ? FormatDateTime(t.appointment_date) : '-',
        t => t.phone_number,
      ]
    }}
  />
}