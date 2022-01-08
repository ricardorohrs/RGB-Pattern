import Axios from 'axios';
import { apiUrl } from './Auth';

export const getProblem = async (token: string) => {
    try {
        return await Axios.get(`${apiUrl}/problems`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (err) {
        return err;
    }
};
