import React from "react";
import {UserList} from '../components/UserList'

export const ConnectorClientList = () => <UserList
  listType="is_client"
  title="Clients List"
  modal="Client Details"
  list={{
    headers: [
      "User ID",
      "First Name",
      "Last Name",
      "Email",
      "Phone Number",
      "Address",
      "Zip Code",
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

