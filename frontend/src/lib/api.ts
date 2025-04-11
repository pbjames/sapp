export type LoginData = {
    username: string;
    password: string;
};

export type LoginResponse = {
    token: string;
};

export const attemptLogin = async (data: LoginData) => {
    const response = await fetch(import.meta.env.VITE_API_URL + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return (await response.json()) as LoginResponse;
};

export type RegisterData = {
    username: string;
    wallet: string;
    password: string;
};

export type RegisterResponse = {
    token: string;
};

export const attemptRegister = async (data: RegisterData) => {
    const response = await fetch(import.meta.env.VITE_API_URL + '/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }

    return (await response.json()) as RegisterResponse;
};
