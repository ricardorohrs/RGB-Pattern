import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { View } from './Themed';
import useColorScheme from '../hooks/useColorScheme';

export default function Header() {
    const colorScheme = useColorScheme();
    console.log(colorScheme);
    return (
        <View style={styles.container}>
            <Image
                source={
                    colorScheme === 'dark'
                        ? require('../assets/images/logo_dark_name.png')
                        : require('../assets/images/logo_name.png')
                }
            />
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.7)"
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
