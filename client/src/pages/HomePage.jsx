import React from 'react';
import { Box, Container, Grid, Typography, Button, Card, CardContent, Paper, Avatar } from '@mui/material';
import { 
    People as PeopleIcon,
    Event as EventIcon,
    Handshake as HandshakeIcon,
    LocationOn as LocationIcon,
    EmojiEvents as BadgeIcon,
    Chat as ChatIcon,
    CheckCircle as CheckIcon,
    Facebook, Twitter, Instagram, LinkedIn
} from '@mui/icons-material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const HomePage = () => {
    // Features data
    const features = [
        {
        icon: <PeopleIcon fontSize="large" />,
        title: 'Community Building',
        description: 'Connect with like-minded individuals passionate about making a difference in their communities.'
        },
        {
        icon: <EventIcon fontSize="large" />,
        title: 'Flexible Scheduling',
        description: 'Find opportunities that fit your schedule with our easy-to-use calendar system.'
        },
        {
        icon: <HandshakeIcon fontSize="large" />,
        title: 'Impact Tracking',
        description: 'Monitor your volunteering hours and see the tangible impact you\'re making.'
        },
        {
        icon: <BadgeIcon fontSize="large" />,
        title: 'Recognition',
        description: 'Earn badges and certificates to showcase your contributions and skills.'
        }
    ];

    return (
        <div>
            {/* Hero Section */}
            <Box 
                sx={{
                background:'#000000',
                color:'#ffffff',
                py: 10,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 20%)',
                }
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h1"  component="h1" sx={{ mb: 3, fontWeight:500, fontSize: '4.0rem' }}>
                                Make a Difference in Your Community
                            </Typography>
                            <Typography variant="h5" component="p" sx={{ mb: 4, fontWeight: 400, opacity: 0.9 }}>
                                Join thousands of volunteers making an impact through meaningful opportunities. Find the perfect way to give back.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button 
                                variant="contained" 
                                color="secondary" 
                                size="large"
                                sx={{ 
                                    fontSize: '1.1rem',
                                    px: 4,
                                    py: 1.5,
                                }}
                                >
                                Join Now
                                </Button>
                                <Button 
                                variant="outlined" 
                                color="inherit" 
                                size="large"
                                sx={{ 
                                    fontSize: '1.1rem',
                                    borderWidth: '2px',
                                    px: 4,
                                    py: 1.5,
                                    '&:hover': {
                                    borderWidth: '2px',
                                    backgroundColor: 'rgba(255,255,255,0.1)'
                                    }
                                }}
                                >
                                Learn More
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box 
                                sx={{ 
                                width: '100%', 
                                maxWidth: 500,
                                height: 350,
                                borderRadius: '16px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                                position: 'relative',
                                overflow: 'hidden',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: -50,
                                    left: -50,
                                    width: 150,
                                    height: 150,
                                    borderRadius: '50%',
                                    background: 'rgba(255, 167, 38, 0.2)',
                                },
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: -30,
                                    right: -30,
                                    width: 100,
                                    height: 100,
                                    borderRadius: '50%',
                                    background: 'rgba(66, 133, 244, 0.2)',
                                }
                                }}
                            >
                                <Box sx={{ textAlign: 'center', zIndex: 1, px: 4 }}>
                                <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 2 }}>
                                    VolunteerHub Platform
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 3 }}>
                                    Connecting passionate volunteers with organizations making a difference
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
                                    <Avatar src="https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg?w=2000" sx={{ bgcolor: 'primary.main', color: 'white' }}/>
                                    <Avatar src="https://cdn.pixabay.com/photo/2023/05/27/08/04/ai-generated-8021008_1280.jpg" sx={{ bgcolor: 'primary.main', color: 'white' }}/>
                                    <Avatar src="https://cdn.pixabay.com/photo/2017/10/18/21/36/portrait-2865605_1280.jpg" sx={{ bgcolor: 'primary.main', color: 'white' }}/>
                                </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Features Section */}
            <Box sx={{ py: 10 }}>
                <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography variant="h2" component="h2" sx={{ mb: 2, fontWeight:500, fontSize: '2.5rem' }}>
                    Why VolunteerHub?
                    </Typography>
                    <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto' }}>
                    Our platform makes volunteering simple, rewarding, and impactful. Join a community dedicated to positive change.
                    </Typography>
                </Box>
                
                <Grid container spacing={4} sx={{display:'flex', justifyContent:'center'}}>
                    {features.map((feature, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index} >
                        <Card sx={{width:250,height:300}}>
                        <CardContent sx={{ textAlign: 'center', py: 4 }}>
                            <Box sx={{ 
                            width: 80, 
                            height: 80, 
                            borderRadius: '50%', 
                            bgcolor: 'primary.light', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 3,
                            color: 'white'
                            }}>
                            {feature.icon}
                            </Box>
                            <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
                            {feature.title}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" >
                            {feature.description}
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                </Container>
            </Box>
            
            {/* How It Works Section */}
            <Box sx={{ py: 10,  }}>
                <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography variant="h2" component="h2" sx={{ mb: 2, fontWeight:500 }}>
                    How It Works
                    </Typography>
                    <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto' }}>
                    Getting started with VolunteerHub is simple. Follow these easy steps to begin your volunteering journey.
                    </Typography>
                </Box>
                
                <Grid container spacing={4} alignItems="center" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={12} md={6}>
                    <Box sx={{ 
                        p: 4, 
                        borderRadius: '16px', 
                        backgroundColor: 'white',
                        position: 'relative',
                        height: '100%'
                    }}>
                        {[1, 2, 3, 4].map((step, index) => (
                        <Box key={index} sx={{ display: 'flex', mb: 4, alignItems: 'flex-start' }}>
                            <Avatar sx={{ 
                            bgcolor: 'primary.main', 
                            color: 'white', 
                            mr: 3,
                            width: 40,
                            height: 40,
                            flexShrink: 0
                            }}>
                            {step}
                            </Avatar>
                            <Box>
                            <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
                                {index === 0 ? 'Create Your Profile' : 
                                index === 1 ? 'Browse Opportunities' : 
                                index === 2 ? 'Apply & Get Approved' : 
                                'Start Volunteering'}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                {index === 0 ? 'Set up your volunteer profile in minutes with your interests and availability.' : 
                                index === 1 ? 'Find opportunities that match your skills and passions in your community.' : 
                                index === 2 ? 'Apply with one click and get approved by the organization quickly.' : 
                                'Show up and make a difference while tracking your impact and hours.'}
                            </Typography>
                            </Box>
                        </Box>
                        ))}
                    </Box>
                    </Grid>
                </Grid>
                </Container>
            </Box>

            {/* Call to Action */}
            <Box sx={{ py: 10, color: 'white' }}>
                <Container maxWidth="md">
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h2" component="h2" sx={{ mb: 3, fontWeight: 500 }}>
                    Ready to Make an Impact?
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 4, fontWeight: 400, maxWidth: 700, mx: 'auto' }}>
                    Join our community of volunteers and start making a difference today. It only takes a few minutes to get started.
                    </Typography>
                    <Button 
                    variant="contained" 
                    color="secondary" 
                    size="large"
                    sx={{ 
                        fontSize: '1.2rem',
                        px: 6,
                        py: 1.8,
                        fontWeight: 600
                    }}
                    >
                    Join VolunteerHub
                    </Button>
                </Box>
                </Container>
            </Box>
        </div>
    );
};

export default HomePage;