import jwt from 'jsonwebtoken';
import Axios, { AxiosResponse } from 'axios';
export const apiUrl = 'https://rgb-pattern-api.herokuapp.com/api';

type Response = {
    auth: boolean;
    token: string;
};

export const login = async (email: string, password: string) => {
    try {
        const response = (await Axios.get(`${apiUrl}/auth/login`, {
            auth: {
                username: email,
                password: password,
            },
        })) as Response;
        const data = await handleResponse(response);

        return {
            token: data.payload[0].token,
            data: jwt.decode(data.payload[0].token),
        };
    } catch (err) {
        return {
            error: true,
            message: err,
        };
    }
};

export const logout = () => {
    localStorage.removeItem('user');
    return 0;
};

export const handleResponse = async (response: Response) => {
    try {
        if (response.status !== 200) {
            if (response.status === 404 || response.status === 500) {
                logout();
                History.push('/login');
                window.location.reload();
            }
            const error =
                (response.data && response.data.message) || response.statusText;
            throw error;
        }
        return response.data;
    } catch (err) {
        logout();
    }
};
