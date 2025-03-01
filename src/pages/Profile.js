import React, { useState, useEffect, useContext } from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { useSnackbar } from "notistack";
import { useIntl } from 'react-intl';

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
  TableRow,
  Paper,
  Avatar,
  CircularProgress,
} from "@material-ui/core";

// custom imports
import { AppContext } from "../context/AppContext";
import { EditProfile } from "../components/Index";
import api, { handleError } from "../api";
import {
  LayoutClient,
  LayoutConnector,
  LayoutProfessional,
  LayoutSponsor,
} from "../views";

import { Popup, usePopup, SocialMediaLinks } from '../components/Index';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    width: '100vv',
    textAlign: "center",
  },
  avatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    marginBottom: theme.spacing(1),
  },
  aboutme: {
    textAlign: "justify",
    overflow: 'auto',
  },
  editButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
    margin: theme.spacing(2),
    gap: theme.spacing(3),
  },
  avatarBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: '100%'
  },
  fileInput: {
    display: "none",
  },
  aboutmeText: {
    marginTop: theme.spacing(3),
  }
}));

const Profile = () => {
  // constants
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { user } = useContext(AppContext);
  const { formatMessage } = useIntl();
  const { open, togglePopup } = usePopup();

  // states
  const [userData, setUserData] = useState([]);
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

  const handleUploadImage = async (event) => {
    setImageLoading(true);
    let image = await event.target.files[0];
    let form_data = await new FormData();
    await form_data.append("profile_image", image);

    api
      .patch(`/auth/user-detail/${user?.username}`, form_data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((data) =>
        setUserData({ ...userData, profile_image: data.profile_image })
      )
      .catch(handleError(enqueueSnackbar, closeSnackbar))
      .finally(() => setImageLoading(false));
  };

  useEffect(() => {
    setImageLoading(true);
    api
      .get(`/auth/user-detail/${user?.username}`)
      .then(setUserData)
      .catch(handleError(enqueueSnackbar, closeSnackbar))
      .finally(() => setImageLoading(false));
  }, [open]);

  const socialMedia = {
    ...(userData.youtube_account && {
      youtube: {
        label: 'Youtube',
        color: 'secondary',
        size: 'small',
        url: userData.youtube_account,
        icon: <YouTubeIcon />,
      },
    }),
    ...(userData.twitter_account && {
      twitter: {
        label: 'Twitter',
        color: 'secondary',
        size: 'small',
        url: userData.twitter_account,
        icon: <TwitterIcon />
      },
    }),
    ...(userData.instagram_account && {
      instagram: {
        label: 'Instagram',
        color: 'secondary',
        size: 'small',
        url: userData.instagram_account,
        icon: <InstagramIcon />
      },
    }),
    ...(userData.facebook_account && {
      facebook: {
        label: 'Facebook',
        color: 'secondary',
        size: 'small',
        url: userData.facebook_account,
        icon: <FacebookIcon />
      },
    })

  }

  return (
    <Layout pageTitle={formatMessage({
      id: 'profile',
      defaultMessage: 'Profile'
    })}>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12} className={classes.editButton}>
            <Button
              onClick={togglePopup}
              variant="contained"
              color="secondary"
            >
              {formatMessage({
                id: 'edit_profile',
                defaultMessage: 'Edit Profile'
              })}
            </Button>
          </Grid>
          <Grid container item xs={12}>
            {/* Profile Image */}
            <Grid item md={6} sm={12} className={classes.avatarBox}>
              <Avatar
                alt={userData?.email}
                src={userData?.profile_image}
                className={classes.avatar}
              >
                {imageLoading ? (
                  < CircularProgress />
                ) : (

                  <AccountCircleIcon className={classes.avatar} />
                )}
              </Avatar>
              <input
                accept="image/*"
                className={classes.fileInput}
                id="fileInput"
                multiple
                type="file"
                onChange={handleUploadImage}
              />
              <label htmlFor="fileInput">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<CloudUploadIcon />}
                  component="span"
                >
                  {formatMessage({
                    id: 'upload',
                    defaultMessage: 'Upload'
                  })}
                </Button>
              </label>
            </Grid>
            {/* About me */}
            <Grid item md={6} sm={12}>
              <CardContent className={classes.aboutme}>
                <Typography gutterBottom variant="h5" component="h2" color='secondary'>
                  {formatMessage({
                    id: 'about_me',
                    defaultMessage: 'About me:'
                  })}
                </Typography>
                {userData?.is_client && (
                  <Typography gutterBottom variant="span" component="span" color='secondary' >
                    {formatMessage({
                      id: 'about_me_detail',
                      defaultMessage: `This section is very important for us to understand you better. Please tell about your dreams, your goals, your wishes..`
                    })}
                  </Typography>
                )}
                <Typography variant="body2" color="textSecondary" component="p" className={classes.aboutmeText}>
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
                  <TableBody>
                    {userData?.is_pro && (
                      <TableRow>
                        <TableCell>{formatMessage({
                          id: 'social_media',
                          defaultMessage: 'Social Media'
                        })}</TableCell>
                        <TableCell align="left">
                          <SocialMediaLinks
                            {...{ socialMedia }}
                          />
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell>{formatMessage({
                        id: 'email',
                        defaultMessage: 'E-mail'
                      })}</TableCell>
                      <TableCell align="left">{userData?.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>{formatMessage({
                        id: 'first_name',
                        defaultMessage: 'First Name'
                      })}</TableCell>
                      <TableCell align="left">{userData?.first_name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>{formatMessage({
                        id: 'last_name',
                        defaultMessage: 'Last Name'
                      })}</TableCell>
                      <TableCell align="left">{userData?.last_name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>{formatMessage({
                        id: 'gender',
                        defaultMessage: 'Gender'
                      })}</TableCell>
                      <TableCell align="left">
                        {userData?.gender === 0
                          ? formatMessage({
                            id: 'male',
                            defaultMessage: 'male'
                          })
                          : userData?.gender === 1
                            ? formatMessage({
                              id: 'female',
                              defaultMessage: 'Female'
                            })
                            : formatMessage({
                              id: 'not_specified',
                              defaultMessage: 'Not Specified'
                            })}
                      </TableCell>
                    </TableRow>
                    {userData?.is_pro && (
                      <>
                        <TableRow>
                          <TableCell>{formatMessage({
                            id: 'company_name',
                            defaultMessage: 'Company Name'
                          })}</TableCell>
                          <TableCell align="left">
                            {userData?.company_name}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{formatMessage({
                            id: 'capacity',
                            defaultMessage: 'Capacity'
                          })}</TableCell>
                          <TableCell align="left">
                            {userData?.reserved_capacity}
                          </TableCell>
                        </TableRow>
                      </>
                    )}
                    <TableRow>
                      <TableCell>{formatMessage({
                        id: 'address',
                        defaultMessage: 'Address'
                      })}</TableCell>
                      <TableCell align="left">{userData?.address}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>{formatMessage({
                        id: 'zip_code',
                        defaultMessage: 'Zip Code'
                      })}</TableCell>
                      <TableCell align="left">{userData?.zip_address}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>{formatMessage({
                        id: 'phone_number',
                        defaultMessage: 'Phone Number'
                      })}</TableCell>
                      <TableCell align="left">{userData?.phone_number}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>{formatMessage({
                        id: 'phone_number',
                        defaultMessage: 'Phone Number'
                      })} 2</TableCell>
                      <TableCell align="left">
                        {userData?.phone_number2}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Popup
        scroll='paper'
        dividers={true}
        open={open}
        title="Edit Profile"
        togglePopup={togglePopup}
        autoClose={false}
        buttonText={'Submit'}
      >
        <EditProfile togglePopup={togglePopup} userData={userData} />
      </Popup>
    </Layout >
  );
};

export { Profile };


// ?? Sosyal medya linkleri daha guzel bir sekilde yukarida sadece olanlar olacak sekilde sergilenebilir.
