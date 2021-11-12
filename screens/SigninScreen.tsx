import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import { Button, TextInput } from 'react-native-paper';
import Header from '../components/Header';

export default function SigninScreen({ navigation }: { navigation: any }) {
    // const saveUser = async () => {
    //     try {
    //         const response = await createUser(
    //             auth,

    //         );

    //         if (response.status !== 201) throw Error(response.message);

    //         // setPopupTitle('Sucesso');
    //         // setPopupText('Proposta criada com sucesso.');
    //         // setPopup(true);
    //         // setSuccess(1);
    //     } catch (error) {
    //         console.log(error);
    //         // setPopupTitle('Erro');
    //         // setPopupText('Proposta não pode ser criada.');
    //         // setPopup(true);
    //         // setSuccess(1);
    //     }
    // }

    return (
        <View style={styles.container}>
            <Header />

            <TextInput
                style={styles.input}
                label="Nome completo"
                placeholder="João Da Silva"
                mode={'outlined'}
                outlineColor={'#1e88e5'}
                theme={{ colors: { primary: '#1e88e5' } }}
                right={<TextInput.Icon name="account" />}
            />

            <TextInput
                style={styles.input}
                label="E-mail"
                placeholder="exemplo@gmail.com"
                mode={'outlined'}
                outlineColor={'#1e88e5'}
                theme={{ colors: { primary: '#1e88e5' } }}
                right={<TextInput.Icon name="email" />}
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
            />

            <Button
                style={styles.button}
                color={'#1e88e5'}
                mode="contained"
                onPress={() => createUser()}
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
