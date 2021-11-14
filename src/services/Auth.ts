import Axios from 'axios';
export const apiUrl = 'https://rgb-pattern-api.herokuapp.com/api';

type Response =
    | {
          data: {
              message: string;
              payload: Array<{ token: string; auth: boolean }>;
              status: string;
          };
      }
    | { erro: boolean; message: string };

export const login = async (email: string, password: string) => {
    try {
        return (await Axios.post(
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
        )) as Response;
    } catch (err) {
        return {
            error: true,
            message: err,
        };
    }
};
