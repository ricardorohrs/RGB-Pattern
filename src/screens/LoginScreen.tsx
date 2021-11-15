import * as React from 'react';

import { StyleSheet } from 'react-native';

import { Button, TextInput } from 'react-native-paper';

import { View } from '../components/Themed';
import Header from '../components/Header';

import { login } from '../services/Auth';

export default function LoginScreen({ navigation }: { navigation: any }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [popup, setPopup] = React.useState(false);
    const [popupText, setPopupText] = React.useState('');
    const [popupTitle, setPopupTitle] = React.useState('');
    const [success] = React.useState(1);

    const handleSubmit = async () => {
        try {
            const { user, token } = (await login(email, password)) as any;
            console.log(user, token);
            // testar erro para salvar token
            navigation.navigate('Home');
        } catch (error) {
            navigation.navigate('Login');
            console.log(`Error while login - ${error}`);
        }
    };

    return (
        <View style={styles.container}>
            <Header />

            <TextInput
                style={styles.input}
                label="E-mail"
                placeholder="exemplo@gmail.com"
                mode={'outlined'}
                outlineColor={'#1e88e5'}
                theme={{ colors: { primary: '#1e88e5' } }}
                right={<TextInput.Icon name="email" />}
                value={email}
                onChangeText={(value: string) => {
                    setEmail(value);
                }}
            />

            <TextInput
                style={styles.input}
                label="Senha"
                placeholder="12345678"
                mode={'outlined'}
                outlineColor={'#1e88e5'}
                theme={{ colors: { primary: '#1e88e5' } }}
                right={<TextInput.Icon name="eye" />}
                secureTextEntry
                value={password}
                onChangeText={(value: string) => {
                    setPassword(value);
                }}
            />

            <Button
                style={styles.button}
                color={'#1e88e5'}
                mode="contained"
                onPress={() => handleSubmit()}
            >
                Login
            </Button>

            <Button
                color="#a5a5a5"
                mode="text"
                style={styles.signin}
                onPress={() => navigation.navigate('Signin')}
            >
                Registre-se
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
        marginTop: 35,
        alignSelf: 'center',
    },
    input: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignSelf: 'stretch',
        marginBottom: 15,
        marginHorizontal: 20,
        fontSize: 16,
    },
    signin: {
        paddingTop: 20,
    },
});
