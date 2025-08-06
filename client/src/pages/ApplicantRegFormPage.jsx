import React, { useState } from 'react';
import { 
    Box,TextField, Button, Container, Typography, 
    Grid, Checkbox, FormControlLabel, 
    FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { toast } from 'react-hot-toast';
import { registerApplicant } from '../utils/api';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        education: '',
        skills: [],
        experience: '',
        availability: '',
        appliedPosition: '',
        occupation: ''
    });
    
    const [skills, setSkills] = useState({
        programming: false,
        design: false,
        marketing: false,
        writing: false,
        communication: false,
        projectManagement: false
    });

    const experienceOptions = [
        'No experience',
        'Less than 1 year',
        '1-2 years',
        '3-5 years',
        '5+ years'
    ];

    const availabilityOptions = [
        'Full-time',
        'Part-time',
        'Weekends',
        'Evenings',
        'Flexible'
    ];

    const positionOptions = [
        'Software Development Intern',
        'UI/UX Design Volunteer',
        'Marketing Intern',
        'Content Writing Volunteer',
        'Project Management Intern',
        'Data Analysis Volunteer'
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSkillChange = (e) => {
        setSkills({ ...skills, [e.target.name]: e.target.checked });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const selectedSkills = Object.keys(skills).filter(skill => skills[skill]);
            console.log('Selected Skills:', selectedSkills);
            
            const applicantData = {
                ...formData,
                skills: selectedSkills
            };
            const response = await registerApplicant(applicantData);
                toast.success(response.data.message);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    education: '',
                    skills: [],
                    experience: '',
                    availability: '',
                    appliedPosition: '',
                    occupation: ''
                });
                setSkills({
                    programming: false,
                    design: false,
                    marketing: false,
                    writing: false,
                    communication: false,
                    projectManagement: false
                });
        } catch (error) {
            toast.error(error.response?.data?.message);
            console.error('Registration Error:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom sx={{ mt: 3, mb: 2 }}>
                Intern/Volunteer Registration
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{ backgroundColor: '#f9f9f9', padding: 3, borderRadius: 2, boxShadow: 1 }}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Education"
                            name="education"
                            value={formData.education}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Occupation"
                            name="occupation"
                            value={formData.occupation}
                            onChange={handleChange}
                            required
                        />
                    </Grid>

                    {/* Skills Section */}
                    <Grid item xs={12} sx={{ color: '#333', mt: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Skills</Typography>
                        <Grid container spacing={1}>
                            {Object.keys(skills).map((skill) => (
                                <Grid item xs={6} sm={4} key={skill}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={skills[skill]}
                                                onChange={handleSkillChange}
                                                name={skill}
                                                color="primary"
                                            />
                                        }
                                        label={skill.charAt(0).toUpperCase() + skill.slice(1)}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Box component="div" sx={{ width:'100%', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Experience</InputLabel>
                                <Select
                                    name="experience"
                                    value={formData.experience}
                                    label="Experience"
                                    onChange={handleChange}
                                >
                                    {experienceOptions.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Availability</InputLabel>
                                <Select
                                    name="availability"
                                    value={formData.availability}
                                    label="Availability"
                                    onChange={handleChange}
                                >
                                    {availabilityOptions.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Applied Position</InputLabel>
                                <Select
                                    name="appliedPosition"
                                    value={formData.appliedPosition}
                                    label="Applied Position"
                                    onChange={handleChange}
                                >
                                    {positionOptions.map((position) => (
                                        <MenuItem key={position} value={position}>{position}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Box>
                        
                    <Grid item xs={12}>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            fullWidth
                            size="large"
                            sx={{ mt: 2 }}
                        >
                            Submit Application
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default RegistrationForm;