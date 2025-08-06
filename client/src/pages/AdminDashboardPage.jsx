// src/components/AdminDashboard.jsx
import React, { useState, useEffect, useCallback  } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box, 
    Typography, 
    Container, 
    Chip,
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Button,
    TextField,
    CircularProgress,
    Alert,
    Snackbar,
    IconButton,
    Menu,
    MenuItem,
    TablePagination,
    InputAdornment
} from '@mui/material';
import { 
    MoreVert as MoreIcon, 
    Search as SearchIcon,
} from '@mui/icons-material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { getAdmin, getApplicants, deleteApplicant } from '../utils/api';

const AdminDashboard = () => {
    const [applicants, setApplicants] = useState([]);
    const [filteredApplicants, setFilteredApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(''); 
    const [isLoggedIn, setIsLoggedIn] = useState(null); // Changed to null for initial state
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const navigate = useNavigate();

    // Use useCallback for stable function reference
    const showSnackbar = useCallback((message, severity) => {
        setSnackbar({ open: true, message, severity });
    }, []);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await getAdmin();
                if (response.status === 200) {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                setIsLoggedIn(false);
                console.error('Error fetching admin:', error);
            }
        };
        fetchAdmin();
    }, []);

    useEffect(() => {
        if (isLoggedIn === false) {
            navigate('/admin/auth');
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        if (!isLoggedIn) return;
        
        const fetchApplicants = async () => {
            try {
                setLoading(true);
                const response = await getApplicants();
                setApplicants(response.data.data);
                setFilteredApplicants(response.data.data);
            } catch (err) {
                setError('Failed to fetch applicants');
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchApplicants();
    }, [isLoggedIn]);

    useEffect(() => {
        if (applicants.length === 0) return;
        
        const filtered = applicants.filter(applicant => 
            applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (applicant.phone && applicant.phone.includes(searchTerm)) ||
            (applicant.appliedPosition && applicant.appliedPosition.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredApplicants(filtered);
        setPage(0);
    }, [searchTerm, applicants]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        showSnackbar('Logged out successfully', 'success');
    };

    const handleDelete = async (id) => {
        try {
            await deleteApplicant(id);
            setApplicants(prev => prev.filter(app => app._id !== id));
            showSnackbar('Applicant deleted', 'success');
        } catch (err) {
            showSnackbar('Delete failed', 'error');
            console.error('Delete error:', err);
        }
        handleCloseMenu();
    };

    const handleOpenMenu = (event, applicant) => {
        setAnchorEl(event.currentTarget);
        setSelectedApplicant(applicant);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setSelectedApplicant(null);
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Calculate pagination values
    const startIndex = page * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, filteredApplicants.length);
    const currentApplicants = filteredApplicants.slice(startIndex, endIndex);

    // Show loading while checking auth state
    if (isLoggedIn === null) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh' 
            }}>
                <CircularProgress />
            </Box>
        );
    }
    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
                mb: 3 
            }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>Applicant Dashboard</Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search applicants..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ 
                            minWidth: 250,
                            '& .MuiOutlinedInput-root': { 
                                borderRadius: 2,
                                bgcolor: 'background.paper'
                            }
                        }}
                    />
                    <Button 
                        variant="contained" 
                        color="error"
                        onClick={handleLogout}
                        sx={{ borderRadius: 2, px: 3 }}
                    >
                        Logout
                    </Button>
                </Box>
            </Box>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
            ) : filteredApplicants.length === 0 ? (
                <Alert severity="info">No applicants found</Alert>
            ) : (
                <>
                    <TableContainer 
                        component={Paper} 
                        variant="outlined"
                        sx={{ 
                            maxHeight: '65vh', 
                            overflow: 'auto',
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                            '& .MuiTableCell-root': {
                                py: 1.5,
                                verticalAlign: 'top'
                            }
                        }}
                    >
                        <Table stickyHeader size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Position</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Skills</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Applied</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentApplicants.map((applicant) => (
                                    <TableRow key={applicant._id} hover>
                                        <TableCell>{applicant.name}</TableCell>
                                        <TableCell>{applicant.email}</TableCell>
                                        <TableCell>{applicant.phone || '-'}</TableCell>
                                        <TableCell>{applicant.appliedPosition || 'N/A'}</TableCell>
                                        <TableCell sx={{ maxWidth: 250 }}>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {applicant.skills.slice(0, 3).map((skill, index) => (
                                                    <Chip 
                                                        key={index} 
                                                        label={skill} 
                                                        size="small" 
                                                        sx={{ borderRadius: 1 }} 
                                                    />
                                                ))}
                                                {applicant.skills.length > 3 && (
                                                    <Chip 
                                                        label={`+${applicant.skills.length - 3}`} 
                                                        size="small" 
                                                        sx={{ borderRadius: 1 }} 
                                                    />
                                                )}
                                            </Box>
                                        </TableCell>
                                        <TableCell>{formatDate(applicant.appliedAt)}</TableCell>
                                        <TableCell align="right" sx={{ width: 80 }}>
                                            <IconButton
                                                size="small"
                                                onClick={(e) => handleOpenMenu(e, applicant)}
                                            >
                                                <MoreIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        mt: 2,
                        p: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 1
                    }}>
                        <Typography variant="body2" color="textSecondary">
                            Showing {startIndex + 1} to {endIndex} of {filteredApplicants.length} applicants
                        </Typography>
                        
                        <TablePagination
                            component="div"
                            count={filteredApplicants.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[5, 10, 25]}
                            sx={{
                                border: 'none',
                                '& .MuiTablePagination-toolbar': {
                                    padding: 0,
                                    minHeight: 'auto'
                                }
                            }}
                        />
                        
                        <Typography variant="body2" color="textSecondary">
                            Page {page + 1} of {Math.ceil(filteredApplicants.length / rowsPerPage)}
                        </Typography>
                    </Box>
                </>
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{ 
                    '& .MuiMenu-paper': { 
                        borderRadius: 1,
                        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                    }
                }}
            >
                <MenuItem onClick={() => handleDelete(selectedApplicant?._id)}>
                    <DeleteOutlineOutlinedIcon fontSize="small" sx={{  color: 'error.main' }} />
                    Delete
                </MenuItem>
                <MenuItem onClick={() => {
                    navigate(`/admin/applicant/${selectedApplicant?._id}`);
                    handleCloseMenu();
                }}>
                    <VisibilityOutlinedIcon fontSize="small" sx={{ color: 'primary.main' }} />
                    View Details
                </MenuItem>
            </Menu>
        </Container>
    );
};

export default AdminDashboard;