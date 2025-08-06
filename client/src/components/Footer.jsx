import React from 'react';
import { 
    Box, 
    Container, 
    Grid, 
    Typography, 
    Link as MuiLink,
    IconButton 
} from '@mui/material';
import { 
    Facebook as FacebookIcon,
    Twitter as TwitterIcon,
    Instagram as InstagramIcon,
    LinkedIn as LinkedInIcon
} from '@mui/icons-material';

const Footer = () => {
    return (
        <Box 
        component="footer" 
        sx={{ 
            py: 4,
            borderTop: '1px solid #e0e0e0',
            mt: 'auto' 
        }}
        >
        <Container maxWidth="lg">
            <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                VolunteerHub
                </Typography>
                <Typography variant="body2">
                Connecting passionate volunteers with meaningful opportunities to create positive change in communities worldwide.
                </Typography>
            </Grid>
            
            <Grid item xs={6} md={2}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Quick Links
                </Typography>
                <Box>
                <MuiLink href="/" color="inherit" underline="hover" display="block">Home</MuiLink>
                <MuiLink href="/register" color="inherit" underline="hover" display="block">Register</MuiLink>
                <MuiLink href="/admin" color="inherit" underline="hover" display="block">Admin</MuiLink>
                </Box>
            </Grid>
            
            <Grid item xs={6} md={2}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Legal
                </Typography>
                <Box>
                <MuiLink href="#" color="inherit" underline="hover" display="block">Privacy Policy</MuiLink>
                <MuiLink href="#" color="inherit" underline="hover" display="block">Terms of Use</MuiLink>
                <MuiLink href="#" color="inherit" underline="hover" display="block">Cookies</MuiLink>
                </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Connect With Us
                </Typography>
                <Box>
                <IconButton aria-label="Facebook">
                    <FacebookIcon />
                </IconButton>
                <IconButton aria-label="Twitter">
                    <TwitterIcon />
                </IconButton>
                <IconButton aria-label="Instagram">
                    <InstagramIcon />
                </IconButton>
                <IconButton aria-label="LinkedIn">
                    <LinkedInIcon />
                </IconButton>
                </Box>
                <Typography variant="body2" mt={2}>
                contact@volunteerhub.example.com<br />
                +1 (555) 123-4567
                </Typography>
            </Grid>
            </Grid>
            
            <Box mt={4} pt={2} borderTop="1px solid #e0e0e0">
            <Typography variant="body2" align="center">
                © {new Date().getFullYear()} VolunteerHub. All rights reserved.
            </Typography>
            </Box>
        </Container>
        </Box>
    );
};

export default Footer;