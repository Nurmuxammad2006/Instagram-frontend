// src/services/api.ts
import axios from 'axios';

const API = axios.create({
    baseURL: 'https://localhost:8443/api', // Changed to HTTPS
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Add token to requests if it exists
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('📤 Request:', config.method?.toUpperCase(), config.url, config.data);
        return config;
    },
    (error) => {
        console.error('❌ Request error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for debugging
API.interceptors.response.use(
    (response) => {
        console.log('✅ Response:', response.status, response.data);
        return response;
    },
    (error) => {
        console.error('❌ Response error:', error.response?.status, error.response?.data);
        return Promise.reject(error);
    }
);

export default API;