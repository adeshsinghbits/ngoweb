import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Layout from './pages/Layout'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdminAuthPage from './pages/AdminAuthPage';
import RegistrationForm from './pages/ApplicantRegFormPage';
import AdminDashboard from './pages/AdminDashboardPage';
import ApplicantDetail from './pages/ApplicantDetailPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3a8a',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route path="/" index element={<HomePage />} />
            <Route path="/applicant/register" element={<RegistrationForm />} />
            <Route path="/admin/auth" element={<AdminAuthPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/applicant/:id" element={<ApplicantDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
