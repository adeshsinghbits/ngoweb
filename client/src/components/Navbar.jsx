import React, { useState } from 'react';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    IconButton, 
    Button, 
    Drawer, 
    List, 
    ListItem, 
    ListItemText,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { 
    Menu as MenuIcon,
    Home as HomeIcon,
    PersonAdd as RegisterIcon,
    AdminPanelSettings as AdminIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const navItems = [
        { name: 'Home', path: '/', icon: <HomeIcon /> },
        { name: 'Register', path: '/applicant/register', icon: <RegisterIcon /> },
        { name: 'Admin', path: '/admin/dashboard', icon: <AdminIcon /> }
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
        <List>
            {navItems.map((item) => (
            <ListItem 
                button 
                key={item.name}
                component={Link}
                to={item.path}
                onClick={handleDrawerToggle}
            >
                {item.icon}
                <ListItemText primary={item.name} sx={{ ml: 2 }} />
            </ListItem>
            ))}
        </List>
        </div>
    );

    return (
        <>
        <AppBar position="sticky" sx={{ backgroundColor: 'transparent',color: '#969ac8ff', backdropFilter: 'blur(10px)' }}>
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 800, color: '#123abc' }}>
                VolunteerHub
            </Typography>
            
            {isMobile ? (
                <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                >
                <MenuIcon />
                </IconButton>
            ) : (
                <div>
                {navItems.map((item) => (
                    <Button
                    key={item.name}
                    color="inherit"
                    component={Link}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{ mx: 1, fontWeight: 600 }}
                    >
                    {item.name}
                    </Button>
                ))}
                </div>
            )}
            </Toolbar>
        </AppBar>
        
        <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
        >
            {drawer}
        </Drawer>
        </>
    );
};

export default Navbar;