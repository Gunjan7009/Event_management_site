// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
console.log("trying to error")
    useEffect(() => {
        const token = document.cookie.split('. ').find(row => row.startsWith('jwtToken='))?.split('=')[1];
        console.log('JWT Token:', token);
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log('Decoded JWT:', decoded); 
                setUserId(decoded.userId);
            } catch (error) {
                console.error('Failed to decode JWT token:', error);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ userId }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
