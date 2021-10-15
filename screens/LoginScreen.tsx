import * as React from 'react';
import {StyleSheet} from 'react-native';
import {View} from '../components/Themed';
import {Button, TextInput} from "react-native-paper";
import Header from "../components/Header";

export default function LoginScreen({ navigation }: { navigation: any }) {
    return (
        <View style={styles.container}>
            <Header/>

            <TextInput
                style={styles.input}
                label="E-mail"
                placeholder="exemplo@gmail.com"
                mode={'outlined'}
                outlineColor={'#1e88e5'}
                theme={{ colors: { primary: '#1e88e5'} }}
                right={<TextInput.Icon name="email"/>}
            />

            <TextInput
                style={styles.input}
                label="Senha"
                placeholder="12345678"
                mode={'outlined'}
                outlineColor={'#1e88e5'}
                theme={{ colors: { primary: '#1e88e5'} }}
                right={<TextInput.Icon name="eye"/>}
                secureTextEntry
            />

            <Button style={styles.button} color={'#1e88e5'} mode="contained"
                    onPress={() => console.log('login')}>
                Login
            </Button>

            <Button color="#a5a5a5" mode="text" style={styles.signin} onPress={() => navigation.navigate('Signin')}>
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
        alignSelf: "stretch",
        marginBottom: 15,
        marginHorizontal: 20,
        fontSize: 16,
    },
    signin: {
        paddingTop: 20,
    }
});
