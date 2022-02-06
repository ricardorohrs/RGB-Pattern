import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import { RootStackScreenProps } from '../../types';

export default function NotFoundScreen({
    navigation,
}: RootStackScreenProps<'NotFound'>) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Esta tela não existe.</Text>
            <TouchableOpacity
                onPress={() => navigation.replace('Root')}
                style={styles.link}
            >
                <Text style={styles.linkText}>Volte para tela inicial!</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
