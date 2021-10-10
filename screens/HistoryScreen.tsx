import * as React from 'react';
import { ScrollView, StyleSheet} from 'react-native';
import { Text, View } from '../components/Themed';
import { ProgressBar } from "react-native-paper";

export default function HistoryScreen() {
  const B = (props: any) => <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{ props.children }</Text>

  return (
    <ScrollView>

      <View style={styles.header}>
        <Text style={styles.title}>Olá, <B>Usuário</B>!</Text>
        <Text style={styles.subtitle}>Você está no nível <B>pleno</B></Text>
        <Text style={styles.score}>999 pontos</Text>
      </View>

      <View style={styles.questions}>
        <Text style={styles.title}>Taxa de acertos:</Text>
        <ProgressBar progress={ 0.5 } color={ 'rgb(75,75,225)' }/>
        <Text style={{textAlign: "right"}}>5/10 - 50%</Text>
      </View>

      <View style={styles.card}>
        <Text style={{textAlign: "left"}}>Pleno</Text>
        <ProgressBar progress={ 0.7 } color={ 'rgb(75, 75, 225)' }/>
        <Text style={{textAlign: "right"}}>Sênior</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(75, 225, 75, 0.5)',
    padding: 50,
    height: 225,
  },
  questions: {
    backgroundColor: 'rgba(75, 75, 225, 0.5)',
    padding: 50,
    height: 225,
    justifyContent: "center"
  },
  card: {
    backgroundColor: 'rgba(225, 75, 75, 0.5)',
    padding: 50,
    height: 225,
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    paddingBottom: 10,
  },
  subtitle: {
    fontSize: 16,
  },
  score: {
    fontSize: 26,
    fontWeight: "bold",
  }
});
