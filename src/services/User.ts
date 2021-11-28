import Axios from 'axios';
import { apiUrl } from './Auth';

export const createUser = async (
    email: string,
    password: string,
    name: string
) => {
    try {
        return await Axios.post(
            `${apiUrl}/users`,
            { email, password, name },
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
