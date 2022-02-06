import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { View } from './Themed';
import useColorScheme from '../hooks/useColorScheme';

export default function Header() {
    const colorScheme = useColorScheme();
    return (
        <View style={styles.container}>
            <Image
                source={
                    colorScheme === 'dark'
                        ? require('../../assets/images/logo_dark_name.png')
                        : require('../../assets/images/logo_name.png')
                }
            />
            <View
                style={styles.separator}
                lightColor="#CCC"
                darkColor="#FFF"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        alignItems: 'center',
    },
    separator: {
        marginVertical: 30,
        height: 1.2,
        width: '80%',
    },
});
