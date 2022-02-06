import Axios from 'axios';
import { apiUrl } from './Auth';

export const createAnswer = async (token: string, answer: object) => {
    try {
        return await Axios.post(`${apiUrl}/answers`, answer, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (err) {
        return err;
    }
};
