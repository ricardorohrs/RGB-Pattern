import * as React from 'react';
import { StyleSheet } from 'react-native';
import ButtonsHome from '../components/ButtonsHome';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Header from '../components/Header';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
    return (
        <View style={styles.container}>
            <Header />
            <ButtonsHome navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
    },
});
