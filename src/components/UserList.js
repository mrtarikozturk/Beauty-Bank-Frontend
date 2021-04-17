import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useIntl } from 'react-intl';
import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Paper,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";

import Pagination from "@material-ui/lab/Pagination";
import { UserDetail } from "./UserDetail";
import { LayoutConnector } from "../views";
import api, { handleError } from "../api";
import { SearchBar } from "./SearchBar";

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
    maxWidth: 800,
    maxWidth: "90vw",
    maxHeight: "90%",
    margin: "auto",
    marginTop: "60px",
    overflowY: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: "20px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
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

export const UserList = ({ listType, title, modal, list }) => {
  const classes = useStyles();
  const { formatMessage } = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [userList, setUserList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const onSearch = (searchTerm) => {
    setLoading(true);
    api
      .get(`auth/user-list/?search=${searchTerm}&page=${page}&${listType}=true`)
      .then((data) => {
        setTotal(data.count);
        setUserList(data.results);
        setLoading(false);
      })
      .catch(handleError(enqueueSnackbar, closeSnackbar, setLoading));
  };

  const handleClick = (username) => {
    setOpen(true);
    setSelectedUser(username);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    api
      .get(`/auth/user-list/?page=${page}&${listType}=true`)
      .then((data) => {
        setTotal(data.count);
        setUserList(data.results);
        setLoading(false);
      })
      .catch(handleError(enqueueSnackbar, closeSnackbar, setLoading));
  }, [page, open]);

  const modalBody = (
    <div className={classes.paperModal}>
      <h1 id="simple-modal-title">{modal}</h1>
      <UserDetail selectedUser={selectedUser} handleClose={handleClose} />
    </div>
  );

  return (
    <LayoutConnector pageTitle={formatMessage({
      id: 'user_list',
      defaultMessage: 'User List'
    })}>
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
              {title}
            </Typography>
            <Grid item container xs={12}>
              <Grid item xs={12} md={6} lg={6}>
                <SearchBar onSearchClick={onSearch} />
              </Grid>
              <Grid item xs={12} md={12} lg={6} justify="flex-end">
                {total > 10 && (
                  <Pagination
                    count={total / 10}
                    color="secondary"
                    onChange={(event, page) => setPage(page)}
                  />
                )}
              </Grid>
            </Grid>
            <div style={{ overflowX: "auto" }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {list.headers.map((h) => (
                      <TableCell
                        style={{
                          overflowX: "auto",
                          whiteSpace: "nowrap",
                          textAlign: "center !important",
                        }}
                        key={h}
                      >
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!loading &&
                    userList.length > 0 &&
                    userList?.map((user) => (
                      <TableRow
                        style={{ cursor: "pointer" }}
                        hover
                        key={user?.id}
                        onClick={() => handleClick(user?.username)}
                        className={classes.tableRow}
                      >
                        {list.body.map((bf) => (
                          <TableCell
                            style={{
                              overflowX: "auto",
                              whiteSpace: "nowrap",
                              textAlign: "center !important",
                            }}
                            key={bf(user)}
                          >
                            {bf(user)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              {loading && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress color="secondary" />
                </div>
              )}
              {!loading && userList.length === 0 && (
                <Typography>
                  {formatMessage({
                    id: 'no_users_to_list',
                    defaultMessage: 'No users to list!'
                  })}
                </Typography>
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </LayoutConnector>
  );
};
