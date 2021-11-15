import { createContext, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthContextData = {
    loading: boolean;
    data: object;
};

type Auth = {
    auth: AuthContextData;
    setAuthData(data: AuthContextData): void;
};

const AuthContext = createContext({});

export const AuthProvider: React.FC = ({ children }) => {
    const [auth, setAuth] = useState({
        loading: true,
        data: {},
    });

    const storeData = async (value: any) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('authData', jsonValue);
        } catch (e) {
            console.log(e);
        }
    };

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('authData');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log(e);
        }
    };

    const setAuthData = (data: object) => {
        setAuth({ data: data, loading: false });
    };

    useEffect(() => {
        setAuth({
            loading: false,
            data: getData(),
        });
    }, []);
    //2. if object with key 'authData' exists in localStorage, we are putting its value in auth.data and we set loading to false.
    //This function will be executed every time component is mounted (every time the user refresh the page);

    useEffect(() => {
        storeData(auth.data);
    }, [auth.data]);
    // 1. when **auth.data** changes we are setting **auth.data** in localStorage with the key 'authData'.
    console.log(auth);

    return (
        <AuthContext.Provider value={{ auth, setAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
