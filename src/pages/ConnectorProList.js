import React from "react";
import {UserList} from '../components/UserList'

export const ConnectorProList = () => <UserList
  listType="is_pro"
  title="Professionals List"
  modal="Professional Details"
  list={{
    headers: [
      "User ID",
      "Company",
      "First Name",
      "Last Name",
      "Email",
      "Phone Number",
      "Address",
      "Zip Code",
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

