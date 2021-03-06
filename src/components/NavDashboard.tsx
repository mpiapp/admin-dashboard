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
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';


const drawerWidth = 240;

interface Props {
    window?: () => Window;
  }

const NavDashboard = (props: Props) => {
    const auth = useSelector((state : RootState) => state.login )
    // console.log(auth, 'auth store')
    
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

    /* istanbul ignore next */
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const open = Boolean(anchorEl);
    /* istanbul ignore next */
    const id = 2 ? 'simple-popover' : undefined;

    /* istanbul ignore next */
    const onClickSignOut = () : void => {
        localStorage.clear()
        history.go(0)
    }

  const drawer = (
    <div>   
      <Toolbar>
        <div className="logo-mpi">
            <a href="/dashboard">
                <img 
                    alt="logo mpi dashboard" 
                    src="https://www.wilsonfamilychiropracticcenter.net/wp-content/uploads/2018/12/placeholder-logo-2.png"
                />
            </a>
        </div>
      </Toolbar>
      <Divider />

        <div className="sidebar-navbar">
            <NavLink exact to="/dashboard" activeClassName="active-link">
                <ul>
                    <li className="navbar-list">
                        <span>Dashboard</span>
                    </li>
                </ul>
            </NavLink>
            <NavLink exact to="/dashboard/capabilities" activeClassName="active-link">
                <ul>
                    <li className="navbar-list">
                        <span>Master Capabilities</span>
                    </li>
                </ul>
            </NavLink>
            
            <NavLink exact to="/dashboard/features" activeClassName="active-link">
                <ul>
                    <li className="navbar-list">
                        <span>Master Features</span>
                    </li>
                </ul>
            </NavLink>
            <NavLink exact to="/dashboard/modules" activeClassName="active-link">
                <ul>
                    <li className="navbar-list">
                        <span>Master Modules</span>
                    </li>
                </ul>
            </NavLink>
            <NavLink exact to="/dashboard/roles" activeClassName="active-link">
                <ul>
                    <li className="navbar-list">
                        <span>Master Roles</span>
                    </li>
                </ul>
            </NavLink>
            <NavLink exact to="/dashboard/status" activeClassName="active-link">
                <ul>
                    <li className="navbar-list">
                        <span>Master Status</span>
                    </li>
                </ul>
            </NavLink>
            <NavLink exact to="/dashboard/status-config" activeClassName="active-link">
                <ul>
                    <li className="navbar-list">
                        <span>Master Config Status</span>
                    </li>
                </ul>
            </NavLink>
            <NavLink exact to="/dashboard/payment-terms" activeClassName="active-link">
                <ul>
                    <li className="navbar-list">
                        <span>Master Payment Terms</span>
                    </li>
                </ul>
            </NavLink>
            <NavLink exact to="/dashboard/legal-document" activeClassName="active-link">
                <ul>
                    <li className="navbar-list">
                        <span>Master Legal DOC</span>
                    </li>
                </ul>
            </NavLink>
            <NavLink exact to="/dashboard/type-company" activeClassName="active-link">
                <ul>
                    <li className="navbar-list">
                        <span>Master Type Company</span>
                    </li>
                </ul>
            </NavLink>
            <NavLink exact to="/dashboard/users-superadmin" activeClassName="active-link">
                <ul>
                    <li className="navbar-list">
                        <span>Users Superadmin</span>
                    </li>
                </ul>
            </NavLink>
            <NavLink exact to="/dashboard/vendor-category" activeClassName="active-link">
                <ul>
                    <li className="navbar-list">
                        <span>Vendor Category</span>
                    </li>
                </ul>
            </NavLink>
            <NavLink exact to="/dashboard/buyer-category" activeClassName="active-link">
                <ul>
                    <li className="navbar-list">
                        <span>Buyer Category</span>
                    </li>
                </ul>
            </NavLink>
            <Divider />
            <NavLink exact to="/dashboard/setting" activeClassName="active-link">
                <ul>
                    <li className="navbar-list">
                        <span>Setting</span>
                    </li>
                </ul>
            </NavLink>

        </div>

    </div>
  );

    /* istanbul ignore next */
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
                        data-testid="menuButton"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' }, color: '#000' }}
                    >
                        <MenuIcon />
                    </IconButton> 
                    <div style={{flexGrow: 1}} />
                    <Box>
                        <div 
                            className="right-navbar"  
                            data-testid="dropdownButton"
                            onClick={handleClick}
                        >
                            <Box> <AccountCircleIcon/>  </Box>
                            <Box pl={1}> {auth?.data?.fullname}</Box>
                            <Box pl={1}> <ArrowDropDownIcon/></Box>
                        </div>
                        {/* Dropdown Menu */}
                        <Popover
                        data-testid="dropdown"
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
                                <ListItem 
                                    button 
                                    onClick={() => {
                                        /* istanbul ignore next */
                                        onClickSignOut()
                                    }}>
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
                    data-testid="drawer"
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
