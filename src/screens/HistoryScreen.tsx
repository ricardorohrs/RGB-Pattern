import * as React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { ProgressBar } from 'react-native-paper';

import { AxiosResponse } from 'axios';

import AuthContext from '../contexts/authContext';
import { findAnswerFromUser } from '../services/User';

const levels = ['Estagiário', 'Júnior', 'Pleno', 'Sênior', 'Master', 'Especialista'];

export default function HistoryScreen() {
    const [level, setLevel] = React.useState('');
    const [points, setPoints] = React.useState(0);
    const [corrects, setCorrects] = React.useState(0);
    const [incorrects, setIncorrects] = React.useState(0);

    // estado calculado a partir da soma de pts / quantidade de respostas
    const [rate, setRate] = React.useState(0);

    const { auth } = React.useContext(AuthContext) as any;

    const nextLevel = (level: string) => {
        return level === 'Estagiário' ? 'Júnior' : level === 'Júnior' ? 'Pleno' : level === 'Pleno' ? 'Sênior' : level === 'Sênior' ? 'Master' : level === 'Master' ? 'Especialista' : '';
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

            if (rate >= 25) setLevel('Estagiário');
            else if (rate >= 50) setLevel('Júnior');
            else if (rate >= 75) setLevel('Pleno');
            else if (rate >= 100) setLevel('Sênior');
            else if (rate >= 125) setLevel('Master');
            else if (rate >= 150) setLevel('Especialista');

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

    return (
        <ScrollView>
            <View style={styles.header}>
                <View style={styles.image}>
                    <Image
                        style={styles.badge}
                        source={images[badges(level)].image}
                    />
                </View>
                <View style={styles.imageList}>
                    <Image
                        style={[styles.images, {opacity: badges(level) >= 0 ? 1 : 0.1}]}
                        source={require('../../assets/images/levels/estagiario.png')}
                    />
                    <Image
                        style={[styles.images, {opacity: badges(level) >= 1 ? 1 : 0.1}]}
                        source={require('../../assets/images/levels/junior.png')}
                    />
                    <Image
                        style={[styles.images, {opacity: badges(level) >= 2 ? 1 : 0.1}]}
                        source={require('../../assets/images/levels/pleno.png')}
                    />
                    <Image
                        style={[styles.images, {opacity: badges(level) >= 3 ? 1 : 0.1}]}
                        source={require('../../assets/images/levels/senior.png')}
                    />
                    <Image
                        style={[styles.images, {opacity: badges(level) >= 4 ? 1 : 0.1}]}
                        source={require('../../assets/images/levels/master.png')}
                    />
                    <Image
                        style={[styles.images, {opacity: badges(level) >= 5 ? 1 : 0.1}]}
                        source={require('../../assets/images/levels/especialista.png')}
                    />
                </View>
            </View>

            <View style={styles.questions}>
                <Text style={styles.title}>
                    {`Olá, ${auth.data.user.userName}!`}
                </Text>
                <Text style={styles.subtitle}>
                    {`Você esta no nível ${ level ? level : 'Estagiário'} com`}
                </Text>
                <Text style={styles.score}>{`${points} pontos`}</Text>
            </View>

            <View style={styles.card}>
                <Text style={{ textAlign: 'left' }}>{ level ? level : 'Estagiário'}</Text>
                <ProgressBar progress={0.7} color={'rgb(75, 75, 225)'} />
                <Text style={{ textAlign: 'right' }}>{`${nextLevel(
                    level ? level : 'Estagiário'
                )} - ${points ?? 0} pontos`}</Text>

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
