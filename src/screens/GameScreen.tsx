import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { View } from '../components/Themed';
import { Button, Dialog, Modal, Portal, ProgressBar, Provider } from 'react-native-paper';
import { getProblem } from '../services/Problem';
import AuthContext from '../contexts/authContext';
import TipsModal from '../components/TipsModal';

import { createAnswer } from '../services/Answer';
import { findAnswerFromUser } from "../services/User";
import { AxiosResponse } from "axios";

export default function GameScreen({ navigation }: { navigation: any }) {
    const { auth } = React.useContext(AuthContext) as any;
    const [level, setLevel] = React.useState('');
    const [points, setPoints] = React.useState(0);

    const [rate, setRate] = React.useState(0);

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
            ).then(() => console.log('acertou'));

        } else {
            handleOption(
                problems[currentProblem].id,
                false
            ).then(() => console.log('errou'));
        }
    }

    const nextLevel = (level: string) => {
        return level === 'Estagiário' ? 'Júnior' : level === 'Júnior' ? 'Pleno' : level === 'Pleno' ? 'Sênior' : level === 'Sênior' ? 'Master' : level === 'Master' ? 'Especialista' : '';
    };

    React.useEffect(() => {
        const callAPiFindAnswerFromUser = async () => {
            const response = (await findAnswerFromUser(
                auth.data.token,
                auth.data.user.userId
            )) as AxiosResponse;
            const {message, payload} = response.data;

            if (response.status !== 200) throw Error(message);

            const {points, rate} = payload.reduce(
                (acc: any, curr: any, index: number, arr: object[]) => {
                    return {
                        points: acc.points + curr.points,
                        rate: (acc.points + curr.points) / arr.length,
                    } || 0;
                }, 0);

            if (points >= 666) setLevel('Estagiário');
            else if (points >= 1333) setLevel('Júnior');
            else if (points >= 2000) setLevel('Pleno');
            else if (points >= 2666) setLevel('Sênior');
            else if (points >= 3333) setLevel('Master');
            else if (points >= 4000) setLevel('Especialista');

            setPoints(points);
            setRate(rate);
        };

        try {
            callAPiFindAnswerFromUser();
        } catch (err) {
            console.log(err);
        }
    }, [auth]);

    const images = [
        {
            text: "Estagiário",
            image: require('../../assets/images/levels/estagiario.png')
        },
        {
            text: "Júnior",
            image: require('../../assets/images/levels/junior.png')
        },
        {
            text: "Pleno",
            image: require('../../assets/images/levels/pleno.png')
        },
        {
            text: "Sênior",
            image: require('../../assets/images/levels/senior.png')
        },
        {
            text: "Master",
            image: require('../../assets/images/levels/master.png')
        },
        {
            text: "Especialista",
            image: require('../../assets/images/levels/especialista.png')
        }
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

                <TipsModal tips={tips}/>

                <View style={styles.bottomBar}>
                    <TouchableOpacity onPress={() => navigation.navigate('History')}>
                        <Image
                            style={{width: 50, resizeMode: 'contain', marginHorizontal: 50}}
                            source={images[badges(level)].image}
                        />
                    </TouchableOpacity>
                    <View style={{backgroundColor: '#0f0f0f'}}>
                        <Text style={[styles.progress, {textAlign: 'left'}]}>{level ? level : 'Estagiário'}</Text>
                        <ProgressBar progress={0.7} color={'rgb(75, 75, 225)'} style={{width: 200}}/>
                        <Text style={[styles.progress, {textAlign: 'right'}]}>{`${nextLevel(
                            level ? level : 'Estagiário'
                        )}`}</Text>
                    </View>
                </View>
            </View>

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
                            <Image
                                style={styles.badge}
                                source={images[badges(level)].image}
                            />
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
                                    navigation.setOptions({title: 'Questão ' + getNumberQuestion(currentProblem)});
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
    subAlert: {
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
    },
    badge: {
        marginBottom: 7,
        width: 125,
        resizeMode: 'contain',
    },
    progress: {
        fontSize: 12,
        fontFamily: 'space-mono',
    },
    bottomBar: {
        backgroundColor: '#0f0f0f',
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center'
    },
});
