import React from "react";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

export const List = ({ list, tickets, pagination }) => (
  <>
    {pagination && (
      <Pagination
        count={pagination.pageSize}
        color="secondary"
        onChange={(_, page) => pagination.setPage(page)}
      />
    )}
    <Table size='small'>
      <TableHead>
        <TableRow>
          {list.headers.map((lh) => (
            <TableCell
              style={{
                overflowX: "auto",
                whiteSpace: "nowrap",
              }}
              key={lh}
              align='center'
            >
              {lh}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {tickets?.map((ticket) => (
          <TableRow key={ticket.id} hover>
            {list.body.map((lb) => (
              <TableCell
                style={{
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                }}
                align='center'
              >
                {lb(ticket)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
);
