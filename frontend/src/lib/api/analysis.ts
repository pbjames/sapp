import axios from 'axios';

type TrendingResponse = {
    id: string;
    name: string;
    symbol: string;
    preview: string | null;
    marketCap: number;
    marketCapDelta24h: number;
    price: number;
}[];

const getTrending = async (jwt: string): Promise<TrendingResponse> => {
    const response = await axios.get<TrendingResponse>(
        `${import.meta.env.VITE_API_URL}/trending`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
        }
    );

    return response.data;
};

type StartAnalysisProfileRequest = {
    wallet: string;
};

type StartAnalysisProfileResponse = {
    task_id: string;
};

const startAnalysisProfile = async (
    data: StartAnalysisProfileRequest,
    jwt: string
): Promise<StartAnalysisProfileResponse> => {
    const response = await axios.post<StartAnalysisProfileResponse>(
        `${import.meta.env.VITE_API_URL}/analysis/profile`,
        data,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
        }
    );

    return response.data;
};

type AnalysisProfileResponse = {
    task_id: string;
    status: string;
    result: {
        id: string;
        name: string;
        symbol: string;
        preview: string | null;
        marketCap: number;
        marketCapDelta24h: number;
        price: number;
    }[];
};

const getAnalysisProfile = async (
    taskId: string,
    jwt: string
): Promise<AnalysisProfileResponse> => {
    const response = await axios.get<AnalysisProfileResponse>(
        `${import.meta.env.VITE_API_URL}/analysis/${taskId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
        }
    );

    return response.data;
};

type AnalysisCoinRequest = {
    coin: string;
};

type AnalysisCoinResponse = {
    task_id: string;
};

const startAnalysisCoin = async (
    data: AnalysisCoinRequest,
    jwt: string
): Promise<AnalysisCoinResponse> => {
    const response = await axios.post<AnalysisCoinResponse>(
        `${import.meta.env.VITE_API_URL}/analysis/coin`,
        data,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
        }
    );

    return response.data;
};

const getAnalysisCoin = async (
    taskId: string,
    jwt: string
): Promise<AnalysisProfileResponse> => {
    const response = await axios.get<AnalysisProfileResponse>(
        `${import.meta.env.VITE_API_URL}/analysis/${taskId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
        }
    );

    return response.data;
};

export type {
    TrendingResponse,
    StartAnalysisProfileResponse,
    AnalysisProfileResponse,
    StartAnalysisProfileRequest,
    AnalysisCoinRequest,
};

export default {
    getTrending,
    startAnalysisProfile,
    getAnalysisProfile,
    startAnalysisCoin,
    getAnalysisCoin,
};
