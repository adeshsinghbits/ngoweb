import React from 'react'
import {Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function Layout() {
    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout