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
    <Table>
      <TableHead>
        <TableRow>
          {list.headers.map((lh) => (
            <TableCell
              style={{
                overflowX: "auto",
                whiteSpace: "nowrap",
                textAlign: "center !important",
              }}
              key={lh}
            >
              {lh}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {tickets?.map((ticket) => (
          <TableRow key={ticket.id}>
            {list.body.map((lb) => (
              <TableCell
                style={{
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                  textAlign: "center !important",
                }}
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
