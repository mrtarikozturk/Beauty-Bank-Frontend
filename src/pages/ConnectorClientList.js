import React from "react";
import { UserList } from '../components/UserList'
import { useIntl } from 'react-intl';

export const ConnectorClientList = () => {

  const { formatMessage } = useIntl();

  return (
    <UserList
      listType="is_client"
      title={formatMessage({
        id: 'clients_list',
        defaultMessage: 'Clients List'
      })}
      modal={formatMessage({
        id: 'client_details',
        defaultMessage: 'Client Details'
      })}
      list={{
        headers: [
          formatMessage({
            id: 'user_id',
            defaultMessage: 'User ID'
          }),
          formatMessage({
            id: 'first_name',
            defaultMessage: 'First Name'
          }),
          formatMessage({
            id: 'last_name',
            defaultMessage: 'Last Name'
          }),
          formatMessage({
            id: 'email',
            defaultMessage: 'Email'
          }),
          formatMessage({
            id: 'phone_number',
            defaultMessage: 'Phone Number'
          }),
          formatMessage({
            id: 'address',
            defaultMessage: 'Address'
          }),
          formatMessage({
            id: 'zip_code',
            defaultMessage: 'Zip Code'
          })
        ],
        body: [
          u => u?.id,
          u => u?.first_name,
          u => u?.last_name,
          u => u?.email,
          u => u?.phone_number,
          u => u?.address,
          u => u?.zip_address,
        ]
      }}
    />
  )
}

