import * as React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { ProgressBar } from 'react-native-paper';

import { AxiosResponse } from 'axios';

import AuthContext from '../contexts/authContext';
import { findAnswerFromUser } from '../services/User';

const levels = ['Junior', 'Pleno', 'Senior'];

export default function HistoryScreen() {
    const [level, setLevel] = React.useState('');
    const [points, setPoints] = React.useState(0);
    const [corrects, setCorrects] = React.useState(0);
    const [incorrects, setIncorrects] = React.useState(0);

    // estado calculado a partir da soma de pts / quantidade de respostas
    const [rate, setRate] = React.useState(0);

    const { auth } = React.useContext(AuthContext) as any;

    const nextLevel = (level: string) => {
        return level === 'Junior' ? 'Pleno' : level === 'Pleno' ? 'Senior' : '';
    };

    React.useEffect(() => {
        setCorrects(0);
        setIncorrects(0);
    }, []);

    React.useEffect(() => {
        const callAPiFindAnswerFromUser = async () => {
            const response = (await findAnswerFromUser(
                auth.data.token,
                auth.data.user.userId
            )) as AxiosResponse;
            const { message, payload } = response.data;

            if (response.status !== 200) throw Error(message);

            const { points, rate } = payload.reduce(
                (acc: any, curr: any, index: number, arr: object[]) => {
                    return {
                        points: acc.points + curr.points,
                        rate: (acc.points + curr.points) / arr.length,
                    };
                }
            );

            payload.map((curr: any) => {
                if (curr.isCorrect) {
                    setCorrects((prevState: number) => prevState + 1);
                } else {
                    setIncorrects((prevState: number) => prevState + 1);
                }
            });

            if (rate >= 25) setLevel('Junior');
            else if (rate >= 50) setLevel('Pleno');
            else if (rate >= 75) setLevel('Senior');

            setPoints(points);
            setRate(rate);
        };

        try {
            callAPiFindAnswerFromUser();
        } catch (err) {
            console.log(err);
        }
    }, [auth]);

    const B = (props: any) => (
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
            {props.children}
        </Text>
    );

    return (
        <ScrollView>
            <View style={styles.header}>
                <View style={styles.image}>
                    <Image
                        style={styles.badge}
                        source={require('../../assets/images/levels/pleno.png')}
                    />
                </View>
                <View style={styles.imageList}>
                    <Image
                        style={styles.images}
                        source={require('../../assets/images/levels/estagiario.png')}
                    />
                    <Image
                        style={styles.images}
                        source={require('../../assets/images/levels/junior.png')}
                    />
                    <Image
                        style={styles.images}
                        source={require('../../assets/images/levels/pleno.png')}
                    />
                    <Image
                        style={styles.images}
                        source={require('../../assets/images/levels/senior.png')}
                    />
                    <Image
                        style={styles.images}
                        source={require('../../assets/images/levels/master.png')}
                    />
                    <Image
                        style={styles.images}
                        source={require('../../assets/images/levels/especialista.png')}
                    />
                </View>
            </View>

            <View style={styles.questions}>
                <Text style={styles.title}>
                    {`Olá,${auth.data.user.userName}!`}
                </Text>
                <Text style={styles.subtitle}>
                    {`Você esta no nível ${level}`}
                </Text>
                <Text style={styles.score}>{`${points} pontos`}</Text>
            </View>

            <View style={styles.card}>
                <Text style={{ textAlign: 'left' }}>{level}</Text>
                <ProgressBar progress={0.7} color={'rgb(75, 75, 225)'} />
                <Text style={{ textAlign: 'right' }}>{`${nextLevel(
                    level
                )} - ${rate} pts`}</Text>

                <Text style={{ paddingTop: 35 }}>Taxa de acertos:</Text>
                <ProgressBar progress={0.5} color={'rgb(75,75,225)'} />
                <Text style={{ textAlign: 'right' }}>
                    {`${corrects}/${corrects + incorrects} - ${(
                        corrects /
                        (corrects + incorrects)
                    )
                        .toString()
                        .replace('0.', '')}%`}
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'rgba(75, 225, 75, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 225,
    },
    image: {
        backgroundColor: 'rgba(75, 225, 75, 0)',
    },
    badge: {
        marginTop: 40,
        width: 100,
        resizeMode: 'contain',
    },
    images: {
        width: 30,
        resizeMode: 'contain',
        marginHorizontal: 15,
        tintColor: 'rgba(255,255,255,0.7)',
    },
    imageList: {
        marginTop: -75,
        flexDirection: 'row',
        backgroundColor: 'rgba(75, 225, 75, 0)',
    },
    questions: {
        backgroundColor: 'rgba(75, 75, 225, 0.5)',
        padding: 50,
        height: 225,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: 'rgba(225, 75, 75, 0.5)',
        padding: 50,
        height: 225,
        justifyContent: 'center',
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
        fontWeight: 'bold',
    },
});
