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

type StartAnalysisResponse = {
    task_id: string;
};

const startAnalysis = async (jwt: string): Promise<StartAnalysisResponse> => {
    const response = await axios.post<StartAnalysisResponse>(
        `${import.meta.env.VITE_API_URL}/analysis`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
        }
    );

    return response.data;
};

type AnalysisResponse = {
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

const getAnalysis = async (
    taskId: string,
    jwt: string
): Promise<AnalysisResponse> => {
    const response = await axios.get<AnalysisResponse>(
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

export type { TrendingResponse, StartAnalysisResponse, AnalysisResponse };

export default {
    getTrending,
    startAnalysis,
    getAnalysis,
};
