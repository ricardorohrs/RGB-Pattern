import Axios from 'axios';
export const apiUrl = 'https://rgb-pattern-api.herokuapp.com/api';
import jwt_decode from 'jwt-decode';

export const login = async (email: string, password: string) => {
    try {
        const response = await Axios.post(
            `${apiUrl}/auth/login`,
            {
                email,
                password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return {
            user: jwt_decode(response.data.payload[0].token),
            token: response.data.payload[0].token,
        };
    } catch (err) {
        return {
            error: true,
            message: err,
        };
    }
};
