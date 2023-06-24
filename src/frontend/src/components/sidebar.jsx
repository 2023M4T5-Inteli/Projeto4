import React, { useEffect, useState } from 'react'
import logo from '../images/Frame 12.svg'
import { styled, useTheme } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom'
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import GroupIcon from '@mui/icons-material/Group';
import FactoryIcon from '@mui/icons-material/Factory';
import RouterIcon from '@mui/icons-material/Router';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import { colors } from '@mui/joy';
import { Switch, useLocation } from 'react-router-dom';
import AIButton from './AIButton';

const drawerWidth = 240;
const path = ["/", "/tablets", "/colaboradores", "/setores", "/roteadores"];
var rota = ''

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '1%',
  // necessary for content to be below app bar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor: '#FFFFFF',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    backgroundColor: '#FFFFFF',
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  var page = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader open={open}>
          {open === false ? (
            <React.Fragment>
              <IconButton
                position="fixed"
                open={open}
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="center"
                sx={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  ...(open && { display: "none" }),
                  color: "#000000",
                }}
              >
                <MenuIcon />
              </IconButton>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <IconButton
                IconButton
                onClick={handleDrawerClose}
                edge="start"
                component={Link}
                to="/"
              >
                <img src={logo} alt="Logo" height={30} />
              </IconButton>
              <IconButton onClick={handleDrawerClose} sx={{ color: "#000000" }}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon sx={{ color: "#000000" }} />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </React.Fragment>
          )}
        </DrawerHeader>
        <Divider />
        <List>
          {["Mapa", "Tablets", "Colaboradores", "Setores", "Roteadores"].map(
            (text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  {...(index === 0 ? (rota = path[0]) : null)}
                  {...(index === 1 ? (rota = path[1]) : null)}
                  {...(index === 2 ? (rota = path[2]) : null)}
                  {...(index === 3 ? (rota = path[3]) : null)}
                  {...(index === 4 ? (rota = path[4]) : null)}
                  component={Link}
                  to={rota}
                  IconButton
                  onClick={handleDrawerClose}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index === 0 ? (
                      <IconButton>
                        <FmdGoodRoundedIcon sx={{ color: "#000000" }} />
                      </IconButton>
                    ) : null}
                    {index === 1 ? (
                      <IconButton>
                        <TabletMacIcon
                          sx={{
                            color: page === path[0] ? "#42e6f5" : "#000000",
                          }}
                        />
                      </IconButton>
                    ) : null}
                    {index === 2 ? (
                      <IconButton>
                        <GroupIcon sx={{ color: "#000000" }} />
                      </IconButton>
                    ) : null}
                    {index === 3 ? (
                      <IconButton>
                        <FactoryIcon sx={{ color: "#000000" }} />
                      </IconButton>
                    ) : null}
                    {index === 4 ? (
                      <IconButton>
                        <RouterIcon sx={{ color: "#000000" }} />
                      </IconButton>
                    ) : null}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )
          )}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              IconButton
              onClick={handleDrawerClose}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AIButton isAI={props.isAI} updateIsAI={props.updateIsAI} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            width: drawerWidth,
            padding: "16px",
            display: open ? "flex" : "none",
            justifyContent: open ? "space-between" : "space-between",
            alignItems: open ? "center" : "center",
          }}
        >
          <IconButton
            onClick={handleDrawerClose}
            edge="start"
            component={Link}
            to="earth"
          >
            <SettingsSharpIcon sx={{ color: "#000000" }} />
          </IconButton>
          <IconButton
            onClick={handleDrawerClose}
            component={Link}
            to="notificacoes"
            edge="end"
            sx={{ opacity: open ? 1 : 0 }}
          >
            {props.haveUnread ? (
              <NotificationsActiveIcon sx={{ color: "#000000" }} />
            ) : (
              <NotificationsSharpIcon sx={{ color: "#100000" }} />
            )}
          </IconButton>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}

