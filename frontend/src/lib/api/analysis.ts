import axios from 'axios';

type TrendingResponse = {
    id: string;
    name: string;
    symbol: string;
    image: string;
    marketCap: number;
    marketCapDelta24h: number;
    timeseries: {
        stamp: number;
        price: number;
    }[];
}[];

const getTrending = async (jwt: string): Promise<TrendingResponse> => {
    const response = await axios.get<TrendingResponse>(
        `${import.meta.env.VITE_API_URL}/trending_tokens`,
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

type AnalysisCoinResponse = {
    address: string;
    predicted_roi: number;
    summary: string;
    created_at: string;
};

const getAnalysisCoin = async (
    token_address: string,
    jwt: string
): Promise<AnalysisCoinResponse[]> => {
    const response = await axios.get<AnalysisCoinResponse[]>(
        `${import.meta.env.VITE_API_URL}/analyze/${token_address}`,
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
    AnalysisCoinResponse,
};

export default {
    getTrending,
    startAnalysisProfile,
    getAnalysisProfile,
    getAnalysisCoin,
};
