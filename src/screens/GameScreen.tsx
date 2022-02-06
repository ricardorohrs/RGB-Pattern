import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal as ReactModal,
} from 'react-native';
import { View } from '../components/Themed';
import {
    Button,
    Dialog,
    Modal,
    Portal,
    ProgressBar,
    Provider,
} from 'react-native-paper';
import { getProblem } from '../services/Problem';
import AuthContext from '../contexts/authContext';
import { createAnswer } from '../services/Answer';
import { deleteAnswersFromUser, findAnswerFromUser } from '../services/User';
import { AxiosResponse } from 'axios';
import useColorScheme from '../hooks/useColorScheme';
import { FontAwesome } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

export default function GameScreen({
    route,
    navigation,
}: {
    route: any;
    navigation: any;
}) {
    const isFocused = useIsFocused();

    const continueGame = route.params?.continueGame;
    const colorScheme = useColorScheme();

    const { auth } = React.useContext(AuthContext) as any;
    const [level, setLevel] = React.useState('');
    const [points, setPoints] = React.useState(0);
    const [currentProblem, setCurrentProblem] = React.useState<number>(0);
    const [problems, setProblems] = React.useState<any>(null);
    const [option, setOption] = React.useState<any>(null);

    // confirma resposta
    const [checkAnswer, setCheckAnswer] = React.useState<boolean>(false);
    const showDialog = () => setCheckAnswer(true);
    const hideDialog = () => setCheckAnswer(false);

    // resposta certa
    const [correctAnswer, setCorrectAnswer] = React.useState(false);
    const showCorrectModal = () => setCorrectAnswer(true);
    const hideCorrectModal = () => setCorrectAnswer(false);

    // resposta errada
    const [wrongAnswer, setWrongAnswer] = React.useState(false);
    const showWrongModal = () => setWrongAnswer(true);
    const hideWrongModal = () => setWrongAnswer(false);

    // dicas
    const [usedTips, setusedTips] = React.useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentTip, setCurrentTip] = useState(0);

    React.useEffect(() => {
        const callAPiFindAnswerFromUser = async () => {
            const response = (await findAnswerFromUser(
                auth.data.token,
                auth.data.user.userId
            )) as AxiosResponse;
            const { message, payload } = response.data;

            if (response.status !== 200) throw Error(message);

            const correctAnswer = payload.reduce((acc: any, curr: any) => {
                return curr.isCorrect ? acc + 1 : acc;
            }, 0);

            setCurrentProblem(getNumberQuestion(correctAnswer));
            navigation.setOptions({
                title: 'Questão ' + getNumberQuestion(correctAnswer),
            });
        };

        const callApiDeleteAnswerFromUser = async () => {
            const response = (await deleteAnswersFromUser(
                auth.data.token,
                auth.data.user.userId
            )) as AxiosResponse;
            const { message } = response.data;

            if (response.status !== 200) throw Error(message);

            setCurrentProblem(0);
        };

        try {
            if (continueGame) {
                callAPiFindAnswerFromUser();
            } else {
                callApiDeleteAnswerFromUser();
            }
        } catch (err) {
            console.log(err);
        }
    }, [auth, isFocused]);

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

    const [finalPoints, setfinalPoints] = React.useState(166);
    const handleOption = async (problemId: number, isCorrect: boolean) => {
        setfinalPoints(usedTips ? 150 : 166);
        const tips = usedTips ? 1 : 0;

        try {
            const response = (await createAnswer(auth.data.token, {
                usedTime: 200,
                numberTipsUsed: tips,
                isCorrect,
                points: isCorrect ? finalPoints : 0,
                user: {
                    id: auth.data.user.userId,
                },
                problem: {
                    id: problemId,
                },
            })) as any;

            if (response.status !== 201) throw Error(response.data.message);

            if (isCorrect) {
                showCorrectModal();
            } else {
                showWrongModal();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const checkQuestion = async (option: any, problems: any) => {
        if (option === problems[currentProblem].correctAnswer) {
            await handleOption(problems[currentProblem].id, true);
            setusedTips(false);
        } else {
            await handleOption(problems[currentProblem].id, false);
        }
    };

    const nextLevel = (level: string) => {
        return level === 'Estagiário'
            ? 'Júnior'
            : level === 'Júnior'
            ? 'Pleno'
            : level === 'Pleno'
            ? 'Sênior'
            : level === 'Sênior'
            ? 'Master'
            : level === 'Master'
            ? 'Especialista'
            : 'Campeão!';
    };

    React.useEffect(() => {
        const callAPiFindAnswerFromUser = async () => {
            const response = (await findAnswerFromUser(
                auth.data.token,
                auth.data.user.userId
            )) as AxiosResponse;
            const { message, payload } = response.data;

            if (response.status !== 200) throw Error(message);

            const { points } = payload.reduce(
                (acc: any, curr: any) => {
                    return {
                        points: acc.points + curr.points,
                    };
                },
                { points: 0 }
            );

            if (points <= 666) setLevel('Estagiário');
            else if (points <= 1333) setLevel('Júnior');
            else if (points <= 2000) setLevel('Pleno');
            else if (points <= 2666) setLevel('Sênior');
            else if (points <= 3333) setLevel('Master');
            else if (points <= 4000) setLevel('Especialista');

            setPoints(points);
        };

        try {
            callAPiFindAnswerFromUser();
        } catch (err) {
            console.log(err);
        }
    }, [auth]);

    const images = [
        {
            text: 'Estagiário',
            image: require('../../assets/images/levels/estagiario.png'),
        },
        {
            text: 'Júnior',
            image: require('../../assets/images/levels/junior.png'),
        },
        {
            text: 'Pleno',
            image: require('../../assets/images/levels/pleno.png'),
        },
        {
            text: 'Sênior',
            image: require('../../assets/images/levels/senior.png'),
        },
        {
            text: 'Master',
            image: require('../../assets/images/levels/master.png'),
        },
        {
            text: 'Especialista',
            image: require('../../assets/images/levels/especialista.png'),
        },
    ];

    const badges = (level: string) => {
        if (level === 'Estagiário') return 0;
        if (level === 'Júnior') return 1;
        if (level === 'Pleno') return 2;
        if (level === 'Sênior') return 3;
        if (level === 'Master') return 4;
        if (level === 'Especialista') return 5;
        return 0;
    };

    const getNumberQuestion = (currentProblem: number) => {
        let count = currentProblem + 1;
        return count === 0 ? count + 2 : count + 1;
    };

    const getProgress = () => {
        if (level === 'Estagiário') {
            return (points * 100) / 666 / 100;
        } else if (level === 'Júnior') {
            return (points * 100) / 1333 / 100;
        } else if (level === 'Pleno') {
            return (points * 100) / 2000 / 100;
        } else if (level === 'Sênior') {
            return (points * 100) / 2666 / 100;
        } else if (level === 'Master') {
            return (points * 100) / 3333 / 100;
        } else if (level === 'Especialista') {
            return (points * 100) / 4000 / 100;
        }
    };

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

                <View style={styles.centeredView}>
                    <ReactModal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>
                                    {problems
                                        ? problems[currentProblem].tips
                                        : null}{' '}
                                </Text>
                                <Text style={{ fontSize: 8, marginBottom: 15 }}>
                                    -10% dos pontos
                                </Text>
                                <Button
                                    mode="contained"
                                    color={'#1e88e5'}
                                    labelStyle={{ fontSize: 10 }}
                                    onPress={() => {
                                        setCurrentTip(currentTip + 1);
                                        setModalVisible(!modalVisible);
                                    }}
                                >
                                    OK
                                </Button>
                            </View>
                        </View>
                    </ReactModal>

                    <Button
                        color={'#a5a5a5'}
                        labelStyle={{ fontSize: 10 }}
                        mode="text"
                        onPress={() => {
                            setusedTips(true);
                            setModalVisible(true);
                        }}
                    >
                        Gostaria de uma dica?&nbsp;
                        <FontAwesome name="question-circle" size={13} />
                    </Button>
                </View>

                <View style={styles.bottomBar}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('History')}
                    >
                        <Image
                            style={{
                                width: 50,
                                resizeMode: 'contain',
                                marginHorizontal: 50,
                            }}
                            source={images[badges(level)].image}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={[styles.progress, { textAlign: 'left' }]}>
                            {level ? level : 'Estagiário'}
                        </Text>
                        <ProgressBar
                            progress={getProgress()}
                            color={'rgb(75, 75, 225)'}
                            style={{ width: 200 }}
                        />
                        <Text
                            style={[styles.progress, { textAlign: 'right' }]}
                        >{`${nextLevel(level ? level : 'Estagiário')}`}</Text>
                    </View>
                </View>
            </View>

            <Provider>
                <Portal>
                    <Dialog visible={checkAnswer} onDismiss={hideDialog}>
                        <Text
                            style={{
                                display: 'flex',
                                textAlign: 'center',
                                fontSize: 20,
                                marginVertical: 15,
                            }}
                        >
                            Deseja confirmar esta resposta?
                        </Text>
                        <Dialog.Actions>
                            <Button
                                color={'#1e88e5'}
                                mode="contained"
                                style={{ width: 100, padding: 5, margin: 10 }}
                                onPress={() => {
                                    hideDialog();
                                }}
                            >
                                Não
                            </Button>
                            <Button
                                color={'#1e88e5'}
                                mode="contained"
                                style={{ width: 100, padding: 5, margin: 10 }}
                                onPress={() => {
                                    hideDialog();
                                    checkQuestion(option, problems);
                                }}
                            >
                                Sim
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </Provider>

            <ReactModal
                animationType="slide"
                transparent={true}
                visible={correctAnswer}
                hardwareAccelerated={true}
                onRequestClose={() => {
                    hideCorrectModal();
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image
                            style={styles.badge}
                            source={images[badges(level)].image}
                        />
                        <Text style={styles.alert}>Parabéns!</Text>
                        <Text style={styles.alert}>Resposta certa!</Text>
                        <Text style={styles.subAlert}>
                            Você recebeu {finalPoints} pontos.
                        </Text>
                        <Button
                            style={styles.confirmation}
                            color={'#1e88e5'}
                            mode="contained"
                            onPress={() => {
                                hideCorrectModal();
                                setCurrentProblem(currentProblem + 1);
                                navigation.setOptions({
                                    title:
                                        'Questão ' +
                                        getNumberQuestion(currentProblem),
                                });
                            }}
                        >
                            Próxima pergunta
                        </Button>
                    </View>
                </View>
            </ReactModal>

            <ReactModal
                animationType="slide"
                transparent={true}
                visible={wrongAnswer}
                hardwareAccelerated={true}
                onRequestClose={() => {
                    hideWrongModal();
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.alert}>Resposta errada!</Text>
                        <Text style={styles.subAlert}>Tente novamente!</Text>
                        <Button
                            style={styles.confirmation}
                            color={'#1e88e5'}
                            mode="contained"
                            onPress={() => {
                                hideWrongModal();
                            }}
                        >
                            OK
                        </Button>
                    </View>
                </View>
            </ReactModal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    question: {
        fontSize: 20,
        fontFamily: 'space-mono',
        paddingHorizontal: 30,
        marginVertical: 50,
        textAlign: 'justify',
    },
    options: {
        width: 350,
        padding: 10,
        marginBottom: 25,
    },
    alert: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 5,
    },
    subAlert: {
        fontSize: 18,
        marginTop: 5,
    },
    confirmation: {
        padding: 10,
        marginTop: 25,
    },
    badge: {
        marginBottom: 10,
        width: 125,
        resizeMode: 'contain',
    },
    progress: {
        fontSize: 12,
        fontFamily: 'space-mono',
    },
    bottomBar: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    centeredView: {
        marginTop: -25,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
    },
    modalText: {
        fontFamily: 'space-mono',
        marginBottom: 15,
        textAlign: 'center',
    },
});
