import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useIntl } from 'react-intl';

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
    CssBaseline,
    Drawer,
    Container,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    Avatar,
    IconButton,
    Box,
    MenuItem,
    Select,
} from "@material-ui/core";
import {
    ChevronLeft as ChevronLeftIcon,
    AccountBox as AccountBoxIcon,
    ExitToApp as ExitToAppIcon,
    Menu as MenuIcon
} from "@material-ui/icons";

import LayoutListItem from './ListItem'
import { AppContext } from "../../context/AppContext";
import config from '../../config'

const { theme: { drawer } } = config

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar,
    },
    appBarActions: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: "center",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawer.width,
        width: `calc(100% - ${drawer.width}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: "none",
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawer.width,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    small: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        marginRight: theme.spacing(1),
    },
    select: {
        '& .MuiSelect-select.MuiSelect-select': {
            padding: theme.spacing(2)
        }
    },
}));

const Layout = ({ children, pageTitle, list }) => {
    // constants
    const classes = useStyles();
    const history = useHistory();
    const { formatMessage } = useIntl();
    const { user, setUser, userProfile, lang, setLang } = useContext(AppContext);

    // states
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Log Out
    const handleLogOut = () => {
        setUser(null);
        localStorage.removeItem("user");
        history.push("/login");
    };

    const handleChangeFlag = (event) => {
        setLang(event.target.value);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />

            {/* AppBar */}
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, isDrawerOpen && classes.appBarShift)}
                color='secondary'
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color='inherit'
                        aria-label="open drawer"
                        onClick={() => setIsDrawerOpen(true)}
                        className={clsx(
                            classes.menuButton,
                            isDrawerOpen && classes.menuButtonHidden
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box className={classes.appBarActions}>
                        <Select
                            className={classes.select}
                            value={lang}
                            onChange={handleChangeFlag}
                            disableUnderline
                            IconComponent={() => ('')}
                        >
                            <MenuItem value={'en'}>
                                <img style={{ margin: 'auto', width: '30px' }} src={'../images/united-kingdom.png'} />
                            </MenuItem>
                            <MenuItem value={'nl'}>
                                <img style={{ margin: 'auto', width: '30px' }} src={'../images/netherlands.png'} />
                            </MenuItem>
                        </Select>
                        <IconButton color="inherit">
                            {false ? (
                                <Avatar
                                    alt={userProfile?.email}
                                    src={userProfile?.profile_image}
                                    className={classes.small}
                                />
                            ) : (
                                <AccountBoxIcon />
                            )}
                            <Typography>{user?.username}</Typography>
                        </IconButton>
                        <IconButton color="inherit" onClick={handleLogOut}>
                            <ExitToAppIcon />
                            <Typography>
                                {formatMessage({
                                    id: 'log_out',
                                    defaultMessage: 'Log Out'
                                })}
                            </Typography>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Side Menu */}
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !isDrawerOpen && classes.drawerPaperClose),
                }}
                open={isDrawerOpen}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={() => setIsDrawerOpen(false)} color='secondary'>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <div>
                        {
                            list.map(listItem => (
                                <LayoutListItem key={listItem.title} title={listItem.title} onClick={listItem.onClick}>
                                    {listItem.icon}
                                </LayoutListItem>
                            )
                            )
                        }
                    </div>
                </List>
            </Drawer>

            {/* Main Content */}
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    {children}
                </Container>
            </main>
        </div >
    );
};

export default Layout;
