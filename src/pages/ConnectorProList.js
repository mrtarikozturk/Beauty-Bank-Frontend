import React from "react";
import { UserList } from '../components/UserList';
import { useIntl } from 'react-intl';

export const ConnectorProList = () => {

  const { formatMessage } = useIntl();

  return (
    <UserList
      listType="is_pro"
      title={formatMessage({
        id: 'professionals_list',
        defaultMessage: 'Professionals List'
      })}
      modal={formatMessage({
        id: '',
        defaultMessage: 'Professional Details'
      })}
      list={{
        headers: [
          formatMessage({
            id: 'user_id',
            defaultMessage: 'User ID'
          }),
          formatMessage({
            id: 'company',
            defaultMessage: 'Company'
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
          }),
        ],
        body: [
          u => u?.id,
          u => u?.company_name,
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

