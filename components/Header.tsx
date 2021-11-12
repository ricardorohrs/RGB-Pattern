import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { View } from './Themed';

export default function Header() {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/logo_name.png')} />
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
