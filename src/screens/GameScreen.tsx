import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

import {View} from '../components/Themed';
import {Button} from "react-native-paper";
import {getProblem} from "../services/Question";

export default function GameScreen({navigation}: { navigation: any }) {

        try {
            const { status, message } = (getProblem()) as any;

            if (status !== 201) throw Error(message);
        } catch (error) {
            console.log(error);
        }

    return (
        <ScrollView>
            <View style={styles.container}>

                <Text style={styles.question}>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                    Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                    Lorem ipsum Lorem ipsum </Text>

                <Button
                    style={styles.options}
                    color={'#1e88e5'}
                    mode="contained"
                    onPress={() => {
                        console.log('Opção 1')
                    }}>
                    Opção 1
                </Button>

                <Button
                    style={styles.options}
                    color={'#1e88e5'}
                    mode="contained"
                    onPress={() => {
                        console.log('Opção 2')
                    }}>
                    Opção 2
                </Button>

                <Button
                    style={styles.options}
                    color={'#1e88e5'}
                    mode="contained"
                    onPress={() => {
                        console.log('Opção 3')
                    }}>
                    Opção 3
                </Button>

                <Button
                    style={styles.options}
                    color={'#1e88e5'}
                    mode="contained"
                    onPress={() => {
                        console.log('Opção 4')
                    }}>
                    Opção 4
                </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    question: {
        color: '#FFF',
        fontSize: 20,
        fontFamily: 'space-mono',
        paddingHorizontal: 50,
        marginTop: 30,
        marginBottom: 70
    },
    options: {
        width: 250,
        padding: 10,
        marginBottom: 25,
    }
});
