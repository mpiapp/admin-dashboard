/* istanbul ignore file */

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewListIcon from '@mui/icons-material/ViewList';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import GroupIcon from '@mui/icons-material/Group';
import { useHistory } from 'react-router';


const drawerWidth = 240;

interface Props {
    window?: () => Window;
  }

const NavDashboard = (props: Props) => {
        
    const history = useHistory()
    const { window } = props

    const [mobileOpen, setMobileOpen] = React.useState(false);
        
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // dropdown menu 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event : any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const open = Boolean(anchorEl);
    const id = 2 ? 'simple-popover' : undefined;

    const onClickSignOut = () : void => {
        localStorage.clear()
        history.go(0)
    }

  const drawer = (
    <div>
      <Toolbar>
        <div className="logo-mpi">
            <a href="/">
                <img 
                    alt="logo mpi" 
                    src="https://www.wilsonfamilychiropracticcenter.net/wp-content/uploads/2018/12/placeholder-logo-2.png"
                />
            </a>
        </div>
      </Toolbar>
      <Divider />
      <List>
        <ListItem button >
            <ListItemIcon>
                <ViewListIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Orders" />
        </ListItem>
        <ListItem button >
            <ListItemIcon>
                <CalendarViewDayIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Products" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button >
            <ListItemIcon>
                <LocationCityIcon />
            </ListItemIcon>
            <ListItemText primary="Company Profile" />
        </ListItem>
        <ListItem button >
            <ListItemIcon>
                <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="User Management" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button >
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Setting" />
        </ListItem>
      </List>
      
    </div>
  );


  const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: '#fff'
                }}
            >
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' }, color: '#000' }}
                    >
                        <MenuIcon />
                    </IconButton> 
                    <div style={{flexGrow: 1}} />
                    <Box>
                        <div className="right-navbar" onClick={handleClick}>
                            <Box> <AccountCircleIcon/>  </Box>
                            <Box pl={1}> John Doe</Box>
                            <Box pl={1}> <ArrowDropDownIcon/></Box>
                        </div>
                        {/* Dropdown Menu */}
                        <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        className="popper-style"
                        >
                        <Box>
                            <div style={{ width: 150 }}>
                            <List component="nav" aria-label="secondary mailbox folders">
                                <ListItem button >
                                    <ListItemText className="btn-navlist" primary="Profile" />
                                </ListItem>
                                <ListItem button >
                                    <ListItemText className="btn-navlist" primary="Setting" />
                                </ListItem>
                                <ListItem button onClick={() => onClickSignOut()}>
                                    <ListItemText className="btn-navlist" primary="Sign Out" />
                                </ListItem>
                            </List>
                            </div>
                        </Box>
                        </Popover>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </div>
    )
}

export default NavDashboard;
