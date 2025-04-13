import axios from 'axios';

type ProfileResponse = {
    username: string;
    wallet: string;
    displayName: string;
    handle: string | null;
    bio: string;
    avatar: string | null;
    following: number;
    followers: number;
    holdings: {
        id: string;
        symbol: string;
        name: string;
        preview: string | null;
        amount: number;
        value: number;
        timeseries: {
            stamp: number;
            price: number;
        }[];
    }[];
};

type UpdateProfileData = {
    username: string;
    password: string;
};

const getProfileByWallet = async (
    jwt: string,
    wallet: string
): Promise<ProfileResponse> => {
    const response = await axios.get<ProfileResponse>(
        `${import.meta.env.VITE_API_URL}/profile/${wallet.trimEnd()}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
        }
    );
    console.log('i been called');
    return response.data;
};

const getProfile = async (jwt: string): Promise<ProfileResponse> => {
    const response = await axios.get<ProfileResponse>(
        `${import.meta.env.VITE_API_URL}/profile`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
        }
    );
    console.log('i been called2');

    return response.data;
};

const updateProfile = async (
    data: UpdateProfileData,
    jwt: string
): Promise<void> => {
    await axios.put(`${import.meta.env.VITE_API_URL}/profile`, data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    });
};

type Report = {
    id: string;
    report_type: string;
    content: string;
    created_at: number;

    image_data: string | null;
};

type ReportsResponse = Report[];

const getReports = async (jwt: string): Promise<ReportsResponse> => {
    const response = await axios.get<ReportsResponse>(
        `${import.meta.env.VITE_API_URL}/reports`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
        }
    );

    return response.data;
};

type ReportResponse = Report;

const getReport = async (id: string, jwt: string): Promise<ReportResponse> => {
    const response = await axios.get<ReportResponse>(
        `${import.meta.env.VITE_API_URL}/reports/${id}`,
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
    ProfileResponse,
    UpdateProfileData,
    ReportsResponse,
    ReportResponse,
};
export default {
    getProfile,
    getProfileByWallet,
    updateProfile,
    getReports,
    getReport,
};
