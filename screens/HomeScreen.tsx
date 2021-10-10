import * as React from 'react';
import {Image, StyleSheet} from 'react-native';

import ButtonsHome from '../components/ButtonsHome';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo_name.png')}/>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <ButtonsHome navigation={ navigation }/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 50,
    height: 1,
    width: '80%',
  },
});
