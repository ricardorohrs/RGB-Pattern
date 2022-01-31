import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import { Button, TextInput } from 'react-native-paper';
import Header from '../components/Header';

import { createUser } from '../services/User';
import { login } from '../services/Auth';

import AuthContext from '../contexts/authContext';
import { Auth } from '../contexts/authContext';

export default function SigninScreen({ navigation }: { navigation: any }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');

    const { setAuthData } = React.useContext(AuthContext) as Auth;

    const saveUser = async () => {
        try {
            const { status, message } = (await createUser(
                email,
                password,
                name
            )) as any;

            if (status !== 201) throw Error(message);

            try {
                const { user, token } = await login(email, password);
                if (token) {
                    setAuthData({
                        user,
                        token,
                    } as any);
                    navigation.navigate('Home');
                }
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Header />

            <TextInput
                style={styles.input}
                label="Nome completo"
                value={name}
                placeholder="João Da Silva"
                mode={'outlined'}
                outlineColor={'#1e88e5'}
                theme={{ colors: { primary: '#1e88e5' } }}
                right={<TextInput.Icon name="account" />}
                onChangeText={(value: string) => {
                    setName(value);
                }}
            />

            <TextInput
                style={styles.input}
                label="E-mail"
                value={email}
                placeholder="exemplo@gmail.com"
                mode={'outlined'}
                outlineColor={'#1e88e5'}
                theme={{ colors: { primary: '#1e88e5' } }}
                right={<TextInput.Icon name="email" />}
                onChangeText={(value: string) => {
                    setEmail(value);
                }}
            />

            <TextInput
                style={styles.input}
                label="Senha"
                value={password}
                placeholder="12345678"
                mode={'outlined'}
                outlineColor={'#1e88e5'}
                theme={{ colors: { primary: '#1e88e5' } }}
                right={<TextInput.Icon name="eye" />}
                secureTextEntry
                onChangeText={(value: string) => {
                    setPassword(value);
                }}
            />

            <Button
                style={styles.button}
                color={'#1e88e5'}
                mode="contained"
                onPress={() => saveUser()}
            >
                Registrar
            </Button>

            <Button
                color="#a5a5a5"
                labelStyle={{ fontSize: 10 }}
                mode="text"
                style={styles.login}
                onPress={() => navigation.navigate('Login')}
            >
                Já tem uma conta? Faça o login aqui.
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        width: 250,
        padding: 10,
        marginTop: 20,
        alignSelf: 'center',
    },
    input: {
        paddingHorizontal: 20,
        paddingVertical: 7,
        borderRadius: 5,
        alignSelf: 'stretch',
        marginBottom: 15,
        marginHorizontal: 20,
        fontSize: 16,
    },
    login: {
        paddingTop: 10,
    },
});
