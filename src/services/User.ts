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

export const findAnswerFromUser = async (token: string, userId: string) => {
    try {
        return await Axios.get(
            `${apiUrl}/users/${userId}/answers/answerFromUser`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    } catch (err) {
        return err;
    }
};

export const deleteAnswersFromUser = async (token: string, userId: string) => {
    try {
        return await Axios.delete(
            `${apiUrl}/users/${userId}/answers/deleteAnswerFromUser`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    } catch (err) {
        return err;
    }
};
