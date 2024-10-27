import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Container from '@mui/material/Container';
import { Box, Button, CardMedia, Grid } from '@mui/material';
import { Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ScheduleIcon from '@mui/icons-material/Schedule';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ChatIcon from '@mui/icons-material/Chat';

import logoImage from './assets/Yen-logo.png';
import StudentTimetable from './StudentTimetable';

const drawerWidth = 240;

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: calc(100% - `${drawerWidth}px`),
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function DemoCard({ navigate }) {
  const cardStyle = {
    borderRadius: "15px",
    padding: '10px',
    boxShadow: '0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06)',
    display: 'flex',
  };

  const titleStyle = {
    fontSize: 18,
    fontWeight: 'bold',
  };

  const handleGoProfile = () => {
    navigate('/studenthome/createProfile');
  };

  return (
    <Grid sx={{ margin: 2, marginTop: 13 }}>
      <Card style={cardStyle} variant="outlined">
        <CardContent>
          <Typography style={titleStyle} gutterBottom>
            Complete the Profile
          </Typography>
          <Typography variant="body2">
            Start with a brief introduction about yourself, including your name and the subjects you specialize in teaching.
          </Typography>
          <Button onClick={handleGoProfile}>go</Button>
        </CardContent>
        <CardMedia
          component="img"
          height="140"
          image="https://img.freepik.com/free-photo/fun-3d-cartoon-teenage-boy_183364-81177.jpg?t=st=1711274362~exp=1711277962~hmac=a7a1afc0d01308d998b53c5956ab95b1e62dafaaafdd88bafe0932a92496cf06&w=360"
          alt="Profile Image"
          sx={{ width: 100 }}
        />
      </Card>
    </Grid>
  );
}

export default function StudentHome() {
  const [studentDetail, setStudentDetail] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = JSON.parse(localStorage.getItem('Token'));

    // Make request to backend endpoint
    axios.get('http://localhost:3000/api/student/userid', {
      headers: {
        Authorization: token
      }
    })
      .then(response => {
        setStudentDetail(response.data.studentDetail);
       
      })
      .catch(error => {
        console.error('Error fetching user ID:', error);
      });
  }, []);

  React.useEffect(() => {
    const token = JSON.parse(localStorage.getItem('Token'));
if(!token) {
  navigate('/');
}
   
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false); // State variable for drawer

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = () => {
    navigate('/studenthome/profile');
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AppBarStyled position="fixed" open={open}
          sx={{
            background: 'linear-gradient(to left, #43c2eb, #afcb1f)',
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
            padding: 1
          }}
        >

          <Toolbar>
            <Grid sx={{ marginRight: 2 }}>
              <img src={logoImage} alt="no image" style={{ width: 38, height: 38, borderRadius: 100, left: -10 }} />
            </Grid>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Hello, {studentDetail?.name}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBarStyled>
        {renderMobileMenu}
      </Box>

      {!studentDetail?.name ? (
        <DemoCard navigate={navigate} />
      ) : (

        <Grid container spacing={2} sx={{ marginTop: 10, justifyContent: "flex-end", marginLeft: -3 }}>
          <Grid item>
            {/* Timetable Icon */}
            <IconButton color="primary" aria-label="timetable" onClick={() => navigate('/studenthome/timetablelist')}>
              <BackupTableIcon />
            </IconButton>
          </Grid>
          <Grid item>
            {/* Todolist Icon */}
            <IconButton color="primary" aria-label="todolist">
              <PlaylistAddCheckIcon />
            </IconButton>
          </Grid>
          <Grid item>
            {/* Chat Icon */}
            <IconButton color="primary" aria-label="chat">
              <ChatIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}


      <StudentTimetable studentDetail={studentDetail} />
    </>
  );
}