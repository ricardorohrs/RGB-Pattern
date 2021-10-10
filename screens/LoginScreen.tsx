import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import { Button, TextInput } from "react-native-paper";

export default function LoginScreen() {
  return (
      <View style={styles.container}>
        <Image source={require('../assets/images/logo_name.png')}/>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <TextInput style={styles.input}
           label="E-mail"
           placeholder="exemplo@gmail.com"
           mode={'outlined'}
           outlineColor={'#1e88e5'}
           selectionColor={'#1e88e5'}
           right={<TextInput.Icon name="email"/>}
        />
        <TextInput style={styles.input}
           label="Senha"
           placeholder="12345678"
           mode={'outlined'}
           selectionColor={'#1e88e5'}
           outlineColor={'#1e88e5'}
           right={<TextInput.Icon name="eye"/>}
           secureTextEntry
        />
        <Button style={styles.button} icon="" color={ '#1e88e5' } mode="contained" onPress={() => console.log('login')}>
          Login
        </Button>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    width: 250,
    padding: 10,
    marginTop: 35
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: "stretch",
    marginBottom: 15,
    marginHorizontal: 20,
    fontSize: 16,
  },
});
