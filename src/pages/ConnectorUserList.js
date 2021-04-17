import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "@material-ui/core/Modal";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import { useIntl } from 'react-intl';

import { AppContext } from "../context/AppContext";
import { LayoutConnector } from "../views";
import { UserDetail } from "../components/UserDetail";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(10),
  },
  paperModal: {
    position: "absolute",
    top: "%50",
    left: "%50",
    width: 700,
    height: 650,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  fixedHeight: {
    height: 240,
  },
  tableRow: {
    "&:hover": {
      backgroundColor: "#8695e0 !important",
    },
  },
}));

const ConnectorUserList = () => {
  const classes = useStyles();
  const { formatMessage } = useIntl();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const { user, setUser, userProfile, setUserProfile } = useContext(AppContext);
  const [userList, setUserList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(null);

  const handleClick = (username) => {
    setOpen(true);
    setSelectedUser(username);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
    };

    const response = await fetch(
      `https://bbank-backend-app.herokuapp.com/auth/user-list/?page=${page}`,
      requestOptions
    );
    // TODO: api .env dosyasina tasinmasi gerekir.
    // TODO:console.log ifadelerini temizle.

    const data = await response.json();
    setPageSize(Math.floor(data.count / 10));

    setUserList(data.results);
  }, [page, open]);

  const modalBody = (
    <div className={classes.paperModal}>
      <h1 id="simple-modal-title">{formatMessage({
        id: 'user_detail',
        defaultMessage: 'User Detail'
      })}</h1>
      <UserDetail selectedUser={selectedUser} handleClose={handleClose} />
    </div>
  );

  return (
    <LayoutConnector pageTitle={formatMessage({ id: 'user_list', defaultMessage: 'All Users List' })}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalBody}
      </Modal>
      <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography
              component="h2"
              variant="h6"
              color="secondary"
              gutterBottom
            >
              {formatMessage({ id: 'user_list', defaultMessage: 'All Users List' })}
            </Typography>
            {userList.length > 0 ? (
              <>
                <Pagination
                  count={pageSize}
                  color="secondary"
                  onChange={(event, page) => setPage(page)}
                />
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>{formatMessage({
                        id: 'user_id',
                        defaultMessage: 'User ID'
                      })}</TableCell>
                      <TableCell>{formatMessage({
                        id: 'username',
                        defaultMessage: 'Username'
                      })}</TableCell>
                      <TableCell>{formatMessage({
                        id: 'first_name',
                        defaultMessage: 'First Name'
                      })}</TableCell>
                      <TableCell>{formatMessage({
                        id: 'last_name',
                        defaultMessage: 'Last Name'
                      })}</TableCell>
                      <TableCell>{formatMessage({
                        id: 'email',
                        defaultMessage: 'E-mail'
                      })}</TableCell>
                      <TableCell>{formatMessage({
                        id: 'phone_number',
                        defaultMessage: 'Phone Number'
                      })}</TableCell>
                      <TableCell>{formatMessage({
                        id: 'gender',
                        defaultMessage: 'Gender'
                      })}</TableCell>
                      <TableCell>{formatMessage({
                        id: 'zip_code',
                        defaultMessage: 'Zip Code'
                      })}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userList?.map((user) => (
                      <TableRow
                        style={{ cursor: "pointer" }}
                        hover
                        key={user?.id}
                        onClick={() => handleClick(user?.username)}
                        className={classes.tableRow}
                      >
                        <TableCell>{user?.id}</TableCell>
                        <TableCell>{user?.username}</TableCell>
                        <TableCell>{user?.first_name}</TableCell>
                        <TableCell>{user?.last_name}</TableCell>
                        <TableCell>{user?.email}</TableCell>
                        <TableCell>{user?.phone_number}</TableCell>
                        <TableCell>
                          {user?.gender == 0
                            ? formatMessage({
                              id: 'male',
                              defaultMessage
                            })
                            : user?.gender == 1
                              ? formatMessage({
                                id: 'female',
                                defaultMessage: 'Female'
                              })
                              : formatMessage({
                                id: 'not_specified',
                                defaultMessage: 'Not Specified'
                              })}
                        </TableCell>
                        <TableCell>{user?.zip_address}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
                <CircularProgress color="secondary" />
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </LayoutConnector>
  );
};

export { ConnectorUserList };
