import React, { useState, useEffect, useContext } from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useSnackbar } from 'notistack';
import {
  Grid,
  CardContent,
  Button,
  Typography,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Avatar,
  CircularProgress
} from "@material-ui/core";

// custom imports
import { AppContext } from "../context/AppContext";
import { EditProfile } from "../components/Index";
import api, { handleError } from '../api'
import {
  LayoutClient,
  LayoutConnector,
  LayoutProfessional,
  LayoutSponsor,
} from "../views";

import { Popup, usePopup } from '../components/Index';


const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
  root: {
    maxWidth: 345,
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  media: {
    height: 140,
  },

  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    width: 1200,
    textAlign: "center",
  },
  fixedHeight: {
    height: 240,
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  about: {
    width: theme.spacing(60),
    height: theme.spacing(40),
    textAlign: "left",
  },
  button: {
    textAlign: "right",
    margin: theme.spacing(2),
  },
  table: {
    margin: theme.spacing(10),
    width: 1000,
  },
  paperModal: {
    position: "absolute",
    top: "20vh",
    left: "35vw",
    width: 700,
    height: 700,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  profile_image: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    display: 'none',
  },
}));

const Profile = () => {
  // constants
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { user } = useContext(AppContext);
  const { open, handleClose, handleOpen } = usePopup();

  // states
  const [userData, setUserData] = useState([]);
  // const [open, setOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(false)

  let Layout;
  switch (user?.role) {
    case "Client":
      Layout = LayoutClient;
      break;
    case "Connector":
      Layout = LayoutConnector;
      break;
    case "Pro":
      Layout = LayoutProfessional;
      break;
    case "Sponsor":
      Layout = LayoutSponsor;
      break;
    default:
      break;
  }

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };


  const handleUploadImage = async (event) => {
    setImageLoading(true)
    let image = await event.target.files[0];
    let form_data = await new FormData();
    await form_data.append('profile_image', image);

    api.patch(`/auth/user-detail/${user?.username}`, form_data, { headers: { "Content-Type": "multipart/form-data" } })
      .then(data => setUserData({ ...userData, profile_image: data.profile_image }))
      .catch(handleError(enqueueSnackbar, closeSnackbar))
      .finally(() => setImageLoading(false))
  }

  const modalBody = (
    <div className={classes.paperModal}>
      <h1 id="simple-modal-title">Edit Profile</h1>
      <EditProfile handleClose={handleClose} userData={userData} />
    </div>
  );

  useEffect(() => {
    setImageLoading(true)
    api.get(`/auth/user-detail/${user?.username}`)
      .then(setUserData)
      .catch(handleError(enqueueSnackbar, closeSnackbar))
      .finally(() => setImageLoading(false))
  }, [open]);

  return (
    <Layout pageTitle="Profile">
      <Paper className={classes.paper}>
        <div className={classes.button}>
          <Button
            onClick={handleOpen}
            variant="outlined"
            color="secondary"
            value="Edit Profile"
          // size="small"
          >
            Edit Profile
          </Button>
        </div>
        <Grid container spacing={3}>
          {/* Profile Image */}
          <Grid item xs={6} className={classes.profile_image}>
            {imageLoading ? <div className={classes.large}> <CircularProgress /></div> : (
              <Avatar
                alt={userData?.email}
                src={userData?.profile_image}
                className={classes.large}
              />)}
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleUploadImage}
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
                component="span"
              >
                Upload
              </Button>
            </label>
          </Grid>
          {/* About me */}
          <Grid item xs={6}>
            <CardContent className={classes.about}>
              <Typography gutterBottom variant="h5" component="h2">
                About me:
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {userData?.about_me}
              </Typography>
            </CardContent>
          </Grid>
          {/* User data table */}
          <Grid item xs={12}>
            <TableContainer>
              <Table
                className={classes.table}
                aria-label="a dense table"
                size="small"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>{`${user?.username.charAt(0).toUpperCase() +
                      user?.username.slice(1)
                      }'s Profile`}</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell align="left">{userData?.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell align="left">{userData?.first_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Last Name</TableCell>
                    <TableCell align="left">{userData?.last_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Gender</TableCell>
                    <TableCell align="left">
                      {userData?.gender === 0
                        ? "Male"
                        : userData?.gender === 1
                          ? "Female"
                          : "Not Specified"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell align="left">{userData?.address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Zip Code</TableCell>
                    <TableCell align="left">{userData?.zip_address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Phone Number</TableCell>
                    <TableCell align="left">{userData?.phone_number}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Phone Number 2</TableCell>
                    <TableCell align="left">
                      {userData?.phone_number2}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalBody}
      </Modal> */}

      <Popup
        open={open}
        title={"Edit Profile"}
        handleClose={handleClose}
        buttonText={'Submit'}
      >
        <EditProfile handleClose={handleClose} userData={userData} />
      </Popup>

    </Layout>
  );
};

export { Profile };
