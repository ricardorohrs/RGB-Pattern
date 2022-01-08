import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { View } from '../components/Themed';
import { Button } from 'react-native-paper';
import { getProblem } from '../services/Problem';
import AuthContext from '../contexts/authContext';

export default function GameScreen({ navigation }: { navigation: any }) {
    const { auth } = React.useContext(AuthContext) as any;

    const [problems, setProblems] = React.useState<any>(null);

    React.useEffect(() => {
        const callApiFindAllProblems = async () => {
            try {
                const response = (await getProblem(auth.data.token)) as any;

                const { message, payload } = response.data;

                if (response.status !== 200) throw Error(message);
                setProblems(payload);
            } catch (error) {
                console.log(error);
            }
        };

        try {
            callApiFindAllProblems();
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.question}>
                    {problems && problems?.description}
                </Text>
                {problems &&
                    problems[0].options.map((option: any, index: number) => {
                        return (
                            <Button
                                key={index}
                                style={styles.options}
                                color={'#1e88e5'}
                                mode="contained"
                                onPress={() => {
                                    console.log(`Opção ${index}`);
                                }}
                            >
                                {option}
                            </Button>
                        );
                    })}
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
        marginBottom: 70,
    },
    options: {
        width: 250,
        padding: 10,
        marginBottom: 25,
    },
});
