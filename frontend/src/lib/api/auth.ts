import axios from 'axios';

type LoginData = {
    username: string;
    password: string;
};

type LoginResponse = {
    token: string;
};

const login = async (data: LoginData): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(
            `${import.meta.env.VITE_API_URL}/login`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Login failed');
    }
};

type RegisterData = {
    username: string;
    wallet: string;
    password: string;
};

type RegisterResponse = {
    token: string;
};

const register = async (data: RegisterData): Promise<RegisterResponse> => {
    try {
        const response = await axios.post<RegisterResponse>(
            `${import.meta.env.VITE_API_URL}/register`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Registration failed');
    }
};

export type { LoginData, LoginResponse, RegisterData, RegisterResponse };
export default { login, register };
