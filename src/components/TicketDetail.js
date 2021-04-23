import React from "react";
import { useIntl } from 'react-intl';
import { makeStyles } from "@material-ui/core/styles";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

import { FormatDateTime } from "../helper/FormatDate";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(3, 0),
    minWidth: 350,
  },
  header: {
    backgroundColor: '#ff4081',
    color: theme.palette.common.white,
  }
}));

const TicketDetail = ({ selectedTicket, connector = false }) => {
  // constants
  const classes = useStyles();
  const { formatMessage } = useIntl();

  return (
    <>
      <TableContainer component={Paper} className={classes.paper}>
        <Table
          size="small"
        >
          <TableBody>
            <TableRow hover>
              <TableCell>
                {formatMessage({
                  id: 'ticket_id',
                  defaultMessage: 'Request ID'
                })}
              </TableCell>
              <TableCell align="left">{selectedTicket?.id}</TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell>
                {formatMessage({
                  id: 'appoinment_date',
                  defaultMessage: 'Appointment Date'
                })}
              </TableCell>
              <TableCell align="left">
                {selectedTicket?.appointment_date &&
                  FormatDateTime(selectedTicket?.appointment_date)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* prof */}
      <TableContainer component={Paper} className={classes.paper}>
        <Table
          size="small"
        >
          <TableHead>
            <TableRow hover >
              <TableCell align='center' colSpan='2' className={classes.header}>
                {formatMessage({
                  id: 'professional_info',
                  defaultMessage: 'Professional Info'
                })}
              </TableCell>
            </TableRow>
          </TableHead>
          {!connector && Number(selectedTicket.ticket_status) >= 2 ? (
            <TableBody>
              <TableRow hover>
                <TableCell>
                  {
                    formatMessage({
                      id: 'full_name',
                      defaultMessage: 'Full Name'
                    })
                  }
                </TableCell>
                <TableCell align="left">{`${selectedTicket?.pro_detail?.first_name} ${selectedTicket?.pro_detail?.last_name}`}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>
                  {formatMessage({
                    id: 'company_name',
                    defaultMessage: 'Company Name'
                  })}
                </TableCell>
                <TableCell align="left">
                  {selectedTicket?.pro_detail?.company_name}
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>
                  {formatMessage({
                    id: 'phone_number',
                    defaultMessage: 'Phone Number'
                  })}
                </TableCell>
                <TableCell align="left">
                  {selectedTicket?.pro_detail?.phone_number}
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>
                  {
                    formatMessage({
                      id: 'email',
                      defaultMessage: 'E-mail'
                    })
                  }
                </TableCell>
                <TableCell align="left">
                  {selectedTicket?.pro_detail?.email}
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>
                  {
                    formatMessage({
                      id: 'zip_code',
                      defaultMessage: 'Zip Address'
                    })
                  }
                </TableCell>
                <TableCell align="left">
                  {selectedTicket?.pro_detail?.zip_address}
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>
                  {formatMessage({
                    id: 'address',
                    defaultMessage: 'Address'
                  })}
                </TableCell>
                <TableCell align="left">
                  {selectedTicket?.pro_detail?.address
                    ? selectedTicket?.pro_detail?.address
                    : "--"}
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              <TableRow hover>
                <TableCell>
                  {
                    formatMessage({
                      id: 'full_name',
                      defaultMessage: 'Full Name'
                    })
                  }
                </TableCell>
                <TableCell align="left">{selectedTicket?.pro_detail?.first_name ? `${selectedTicket?.pro_detail?.first_name} ${selectedTicket?.pro_detail?.last_name}` : "---"}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>
                  {formatMessage({
                    id: 'company_name',
                    defaultMessage: 'Company Name'
                  })}
                </TableCell>
                <TableCell align="left">
                  {selectedTicket?.pro_detail?.company_name}
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>
                  {formatMessage({
                    id: 'phone_number',
                    defaultMessage: 'Phone Number'
                  })}
                </TableCell>
                <TableCell align="left">
                  {selectedTicket?.pro_detail?.phone_number}
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>
                  {
                    formatMessage({
                      id: 'email',
                      defaultMessage: 'E-mail'
                    })
                  }
                </TableCell>
                <TableCell align="left">
                  {selectedTicket?.pro_detail?.email}
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>
                  {
                    formatMessage({
                      id: 'zip_code',
                      defaultMessage: 'Zip Address'
                    })
                  }
                </TableCell>
                <TableCell align="left">
                  {selectedTicket?.pro_detail?.zip_address}
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>
                  {formatMessage({
                    id: 'address',
                    defaultMessage: 'Address'
                  })}
                </TableCell>
                <TableCell align="left">
                  {selectedTicket?.pro_detail?.address
                    ? selectedTicket?.pro_detail?.address
                    : "--"}
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>

      {/* connector */}
      <TableContainer component={Paper} className={classes.paper}>
        <Table
          size="small"
        >
          <TableHead>
            <TableRow hover>
              <TableCell align='center' colSpan='2' className={classes.header}>
                {
                  formatMessage({
                    id: 'connector_info',
                    defaultMessage: 'Connector Info'
                  })
                }
              </TableCell>
            </TableRow>
          </TableHead>
          {!connector && Number(selectedTicket.ticket_status) >= 1 ? (
            <TableBody>
              <TableRow hover>
                <TableCell>
                  {
                    formatMessage({
                      id: 'full_name',
                      defaultMessage: 'Full Name'
                    })
                  }
                </TableCell>
                <TableCell align="left">{selectedTicket?.connector_detail?.first_name ? `${selectedTicket?.connector_detail?.first_name} ${selectedTicket?.connector_detail?.last_name}` : "---"}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>
                  {
                    formatMessage({
                      id: 'phone_number',
                      defaultMessage: 'Phone Number'
                    })
                  }
                </TableCell>
                <TableCell align="left">
                  {selectedTicket?.connector_detail?.phone_number}
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>
                  {
                    formatMessage({
                      id: 'email',
                      defaultMessage: 'E-mail'
                    })
                  }
                </TableCell>
                <TableCell align="left">
                  {selectedTicket?.connector_detail?.email}
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              <TableRow hover>
                <TableCell>
                  {
                    formatMessage({
                      id: 'full_name',
                      defaultMessage: 'Full Name'
                    })
                  }
                </TableCell>
                <TableCell align="left">{selectedTicket?.connector_detail?.first_name ? `${selectedTicket?.connector_detail?.first_name} ${selectedTicket?.connector_detail?.last_name}` : "---"}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>
                  {
                    formatMessage({
                      id: 'phone_number',
                      defaultMessage: 'Phone Number'
                    })
                  }
                </TableCell>
                <TableCell align="left">
                  {selectedTicket?.connector_detail?.phone_number}
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>
                  {
                    formatMessage({
                      id: 'email',
                      defaultMessage: 'E-mail'
                    })
                  }
                </TableCell>
                <TableCell align="left">
                  {selectedTicket?.connector_detail?.email}
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export { TicketDetail };
