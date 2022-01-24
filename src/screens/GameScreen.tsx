import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { View } from '../components/Themed';
import { Button } from 'react-native-paper';
import { getProblem } from '../services/Problem';
import AuthContext from '../contexts/authContext';
import TipsModal from '../components/TipsModal';

import { createAnswer } from '../services/Answer';

export default function GameScreen({ navigation }: { navigation: any }) {
    const { auth } = React.useContext(AuthContext) as any;

    const [problems, setProblems] = React.useState<any>(null);

    const [currentProblem, setCurrentProblem] = React.useState<number>(0);

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

    // configurar usedTime, numberTipsUsed e points
    const handleOption = async (problemId: number, isCorrect: boolean) => {
        try {
            let { status, message } = (await createAnswer(auth.data.token, {
                usedTime: 200,
                numberTipsUsed: 1,
                isCorrect,
                points: 110,
                user: {
                    id: auth.data.user.userId,
                },
                problem: {
                    id: problemId,
                },
            })) as any;

            if (status === 201) {
                // setPopupTitle('Sucesso!');
                // setPopupText('Resposta certa.');
                // setPopup(true);
                // setSuccess(1);
            } else {
                // setPopupTitle('Erro');
                // setPopupText(
                //     'Esta não é a resposta certa.'
                // );
                // setPopup(true);
                // setSuccess(1);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const tips = problems
        ? problems[currentProblem].tips
        : ['Não há dicas no momento.'];

    console.log('current index ' + currentProblem);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text
                    key={`description-${currentProblem}`}
                    style={styles.question}
                >
                    {problems && problems[currentProblem].description}
                </Text>
                {problems &&
                    problems[currentProblem].options.map(
                        (option: any, index: number) => {
                            return (
                                <Button
                                    key={index}
                                    style={styles.options}
                                    color={'#1e88e5'}
                                    mode="contained"
                                    onPress={() => {
                                        if (
                                            option ===
                                            problems[currentProblem]
                                                .correctAnswer
                                        ) {
                                            handleOption(
                                                problems[currentProblem].id,
                                                true
                                            );
                                            console.log('acertou');

                                            setCurrentProblem(
                                                currentProblem + 1
                                            );
                                        } else {
                                            handleOption(
                                                problems[currentProblem].id,
                                                false
                                            );
                                            console.log('errou');
                                        }
                                    }}
                                >
                                    {option}
                                </Button>
                            );
                        }
                    )}
            </View>
            <TipsModal tips={tips} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    question: {
        fontSize: 24,
        fontFamily: 'space-mono',
        paddingHorizontal: 40,
        marginVertical: 70,
    },
    options: {
        width: 250,
        padding: 10,
        marginBottom: 25,
    },
});
