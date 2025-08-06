import React, { useState } from 'react';
import {
  Container, Paper, Typography, TextField,
  Button, Box, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast }  from 'react-hot-toast';
import { adminLogin } from '../utils/api'; 

const AdminAuthPage = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const navigate = useNavigate();

    const handleSubmit =  async (e) => {
        try {
            e.preventDefault();
            if (!form.email || !form.password) {
                toast.error('Please fill in all fields');
                return;
            }
            setLoading(true);
            const response = await adminLogin(form);

            if (response.status === 200) {
                toast.success('Login successful');
                navigate('/admin/dashboard'); 
                
            } else {
                toast.error('Login failed. Please check your credentials.');
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error('An error occurred while logging in. Please try again.');
            
        }
    };

    return (
        <Container maxWidth="sm"  sx={{ mb: 35, }}>
        <Paper elevation={3} sx={{ mt: 10, p: 4, borderRadius: 3 }}>
            <Typography variant="h5" align="center" gutterBottom>
                Admin Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
                fullWidth
                label="Admin Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                margin="normal"
                type="email"
                required
            />
            <TextField
                fullWidth
                label="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                margin="normal"
                type="password"
                required
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ mt: 3, py: 1.2, fontWeight: 600 }}
            >
                {loading ? 'Logging in...' : 'Login'}
            </Button>
            </Box>
        </Paper>
        </Container>
    );
};

export default AdminAuthPage;
