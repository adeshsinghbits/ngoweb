import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL; 

export const registerApplicant = (data) => axios.post(`${API_URL}/applicants`, data);

export const adminLogin = (credentials) => axios.post(`${API_URL}/admin/login`, credentials, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
});

export const getAdmin = () => axios.get(`${API_URL}/admin/getAdmin`, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
});

export const getApplicants = () => axios.get(`${API_URL}/applicants`, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
});

export const getApplicant = (id) => axios.get(`${API_URL}/applicants/${id}`, {
    withCredentials: true, 
    headers: { 'Content-Type': 'application/json' }
});

export const deleteApplicant = (id, ) => axios.delete(`${API_URL}/applicants/${id}`, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
});