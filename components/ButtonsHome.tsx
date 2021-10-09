import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { View } from './Themed';

export default function ButtonsHome() {
  return (
    <View>

        <Button style={styles.button} icon="" color={ '#1e88e5' } mode="contained" onPress={() => console.log('novo jogo')}>
          Novo Jogo
        </Button>

        <Button style={styles.button} icon="" color={ '#1e88e5' } mode="contained" onPress={() => console.log('continuar jogo')}>
          Continuar Jogo
        </Button>

        <Button style={styles.button} icon="" color={ '#1e88e5' } mode="contained" onPress={() => console.log('historico')}>
          Histórico
        </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 250,
    padding: 10,
    marginBottom: 25,
  },
});
