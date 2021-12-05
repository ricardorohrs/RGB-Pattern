import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {View} from '../components/Themed';

export default function HelpScreen({navigation}: { navigation: any }) {

    return (
        <ScrollView>
            <View style={styles.container}>

                <Text style={styles.question}>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                    Lorem ipsum Lorem ipsum </Text>

                <Text style={styles.question}>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                    Lorem ipsum Lorem ipsum </Text>

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
});
