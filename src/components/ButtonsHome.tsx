import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { View } from './Themed';

export default function ButtonsHome({ navigation }: { navigation: any }) {
    return (
        <View style={styles.container}>
            <Button
                style={styles.button}
                color={'#1e88e5'}
                mode="contained"
                onPress={() => navigation.navigate('Game')}
            >
                Novo Jogo
            </Button>

            <Button
                style={styles.button}
                color={'#1e88e5'}
                mode="contained"
                onPress={() => console.log('continuar jogo')}
            >
                Continuar Jogo
            </Button>

            <Button
                style={styles.button}
                color={'#1e88e5'}
                mode="contained"
                onPress={() => navigation.navigate('History')}
            >
                Histórico
            </Button>

            <Button
                color={'#1e88e5'}
                mode="outlined"
                onPress={() => console.log('sair')}
            >
                Sair
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 35,
        alignItems: 'center',
    },
    button: {
        width: 250,
        padding: 10,
        marginBottom: 25,
    },
});
