import axios from 'axios';

type ProfileResponse = {
    username: string;
    wallet: string;
    zora: {
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
};

type UpdateProfileData = {
    username: string;
    password: string;
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

export type { ProfileResponse, UpdateProfileData };
export default {
    getProfile,
    updateProfile,
};
