import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import auth from '@/lib/api/auth';
import { useNavigate } from '@tanstack/react-router';

type User = {
    username: string;
    wallet_address: string;
};

type ProtectedRouteContextType = {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    logout: () => void;
};

// Create context
const ProtectedRouteContext = createContext<ProtectedRouteContextType | undefined>(undefined);

// Token decoder function
const decodeToken = (token: string): User => {
    try {
        const decoded: any = jwtDecode(token);
        return {
            username: decoded.username,
            wallet_address: decoded.wallet_address
        };
    } catch (error) {
        console.error('Error decoding token:', error);
        throw new Error('Invalid token');
    }
};

export const ProtectedRouteProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Set up axios interceptor to include token in requests
    useEffect(() => {
        const interceptor = axios.interceptors.request.use(
            (config) => {
                const token = auth.getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => {
            axios.interceptors.request.eject(interceptor);
        };
    }, []);

    // Check for token and verify it on component mount
    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const token = auth.getToken();
                
                if (!token) {
                    setIsAuthenticated(false);
                    setUser(null);
                    setLoading(false);
                    return;
                }
                
                // Decode token to get user information
                const decoded = decodeToken(token);
                setUser(decoded);
                setIsAuthenticated(true);
                
                // Optional: verify token with backend
                try {
                    await axios.get(`${import.meta.env.VITE_API_URL}/users/verify-token`);
                } catch (error) {
                    // If token verification fails, log user out
                    console.error('Token verification failed:', error);
                    logout();
                    return;
                }
                
                setLoading(false);
            } catch (error) {
                console.error('Authentication error:', error);
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        };

        verifyAuth();
    }, []);

    const logout = () => {
        auth.logout();
        setIsAuthenticated(false);
        setUser(null);
        // Navigation will be handled by components using this context
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <ProtectedRouteContext.Provider value={{ isAuthenticated, user, loading, logout }}>
            {children}
        </ProtectedRouteContext.Provider>
    );
};

// Hook to use the protected route context
export const useProtectedRoute = () => {
    const context = useContext(ProtectedRouteContext);
    if (context === undefined) {
        throw new Error('useProtectedRoute must be used within a ProtectedRouteProvider');
    }
    return context;
};

// Enhanced component to wrap protected routes
// This handles all the authentication logic and redirects in one place
export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, loading } = useProtectedRoute();
    const navigate = useNavigate();
    
    useEffect(() => {
        // Only redirect when we're sure the user is not authenticated
        if (!loading && !isAuthenticated) {
            navigate({ to: '/login' });
        }
    }, [isAuthenticated, loading, navigate]);
    
    // Show loading state
    if (loading) {
        return <div>Loading...</div>;
    }
    
    // Hide content until redirect happens
    if (!isAuthenticated) {
        return null;
    }
    
    // If authenticated, render the protected content
    return <>{children}</>;
}; 