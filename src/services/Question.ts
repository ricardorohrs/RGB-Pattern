import Axios from 'axios';
import { apiUrl } from './Auth';

export const getProblem = async () => {
    try {
        return await Axios.get(
            `${apiUrl}/problems`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (err) {
        return err;
    }
};
