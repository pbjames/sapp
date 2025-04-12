import axios from 'axios';

type LoginData = {
  username: string;
  password: string;
};

type LoginResponse = {
    token: string;
    username: string;
    wallet_address: string;
};

const login = async (data: LoginData): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(
            `${import.meta.env.VITE_API_URL}/users/login`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        
        localStorage.setItem('auth_token', response.data.token);
        
        return response.data;
    } catch (error) {
        throw new Error('Username or password is incorrect');    
    }
};

type RegisterData = {
    username: string;
    password: string;
    wallet_address: string;
};

type RegisterResponse = {
  token: string;
};

const register = async (data: RegisterData): Promise<RegisterResponse> => {
    const response = await axios.post<RegisterResponse>(
        `${import.meta.env.VITE_API_URL}/users/register`,
        data,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );


  return response.data;
};

// Authentication helper functions
const isAuthenticated = (): boolean => {
    return localStorage.getItem('auth_token') !== null;
};

const getToken = (): string | null => {
    return localStorage.getItem('auth_token');
};

const logout = () => {
    localStorage.removeItem('auth_token');
};

export type { LoginData, LoginResponse, RegisterData, RegisterResponse };
export default {
    login,
    register,
    isAuthenticated,
    getToken,
    logout
};
