import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { View } from '../components/Themed';
import {Button, Dialog, Modal, Portal, Provider} from 'react-native-paper';
import { getProblem } from '../services/Problem';
import AuthContext from '../contexts/authContext';
import TipsModal from '../components/TipsModal';

import { createAnswer } from '../services/Answer';

export default function GameScreen({ navigation }: { navigation: any }) {
    const { auth } = React.useContext(AuthContext) as any;

    const [problems, setProblems] = React.useState<any>(null);
    const [option, setOption] = React.useState<any>(null);

    const [currentProblem, setCurrentProblem] = React.useState<number>(0);

    const [checkAnswer, setCheckAnswer] = React.useState<boolean>(false);
    const showDialog = () => setCheckAnswer(true);
    const hideDialog = () => setCheckAnswer(false);

    const [correctAnswer, setCorrectAnswer] = React.useState(false);
    const showCorrectModal = () => setCorrectAnswer(true);
    const hideCorrectModal = () => setCorrectAnswer(false);
    const containerStyle = {
        backgroundColor: 'white',
        padding: 40,
    };
    const [wrongAnswer, setWrongAnswer] = React.useState(false);
    const showWrongModal = () => setWrongAnswer(true);
    const hideWrongModal = () => setWrongAnswer(false);

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

            if (isCorrect) {
                showCorrectModal();
            } else {
                showWrongModal();
            }

        } catch (e) {
            console.log(e);
        }
    };

    const tips = problems
        ? problems[currentProblem].tips
        : ['Não há dicas no momento.'];

    // console.log('current index ' + currentProblem);

    const checkQuestion = (option: any, problems: any) => {
        if (
            option ===
            problems[currentProblem]
                .correctAnswer
        ) {
            handleOption(
                problems[currentProblem].id,
                true
            ).then(r => console.log('acertou', r));

        } else {
            handleOption(
                problems[currentProblem].id,
                false
            ).then(r => console.log('errou', r));
        }
    }

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
                                        setOption(option);
                                        showDialog();
                                    }}
                                >
                                    {option}
                                </Button>
                            );
                        }
                    )}
            </View>
            <TipsModal tips={tips} />

            <Provider>
                <Portal>
                    <Dialog visible={checkAnswer} onDismiss={hideDialog}>
                        <Text style={{display: 'flex', textAlign: 'center', fontSize: 20, marginVertical: 15}}>
                            Deseja confirmar esta resposta?
                        </Text>
                        <Dialog.Actions>
                            <Button color={'#1e88e5'}
                                    mode="contained"
                                    style={{width: 100, padding: 5, margin: 10}}
                                    onPress={() => {
                                        hideDialog();
                                    }}>Não</Button>
                            <Button color={'#1e88e5'}
                                    mode="contained"
                                    style={{width: 100, padding: 5, margin: 10}}
                                    onPress={() => {
                                        hideDialog();
                                        checkQuestion(option, problems);
                                    }}>Sim</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </Provider>

            <Provider>
                <Portal>
                    <Modal visible={correctAnswer} onDismiss={hideCorrectModal} contentContainerStyle={containerStyle}>
                        <View style={styles.modal}>
                            <Text>Inserir insígnia aqui</Text>
                            <Text style={styles.alert}>Parabéns!</Text>
                            <Text style={styles.alert}>Resposta certa!</Text>
                            <Text style={styles.subAlert}>Você recebeu 100 pontos.</Text>
                            <Button
                                style={styles.confirmation}
                                color={'#1e88e5'}
                                mode="contained"
                                onPress={() => {
                                    hideCorrectModal();
                                    setCurrentProblem(currentProblem + 1);
                                }}>
                                Próxima pergunta
                            </Button>
                        </View>
                    </Modal>
                </Portal>
            </Provider>

            <Provider>
                <Portal>
                    <Modal visible={wrongAnswer} onDismiss={hideWrongModal} contentContainerStyle={containerStyle}>
                        <View style={styles.modal}>
                            <Text style={styles.alert}>Resposta errada!</Text>
                            <Text style={styles.subAlert}>Tente novamente!</Text>
                            <Button
                                style={styles.confirmation}
                                color={'#1e88e5'}
                                mode="contained"
                                onPress={() => {
                                    hideWrongModal();
                                }}>
                                OK
                            </Button>
                        </View>
                    </Modal>
                </Portal>
            </Provider>
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
    alert: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 5,
    },
    subAlert:{
        fontSize: 18,
        marginTop: 5,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
    },
    confirmation: {
        padding: 10,
        marginTop: 25,
    }
});
