import * as React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { ProgressBar } from 'react-native-paper';

import { AxiosResponse } from 'axios';

import AuthContext from '../contexts/authContext';
import { findAnswerFromUser } from '../services/User';

export default function HistoryScreen() {
    const [level, setLevel] = React.useState(0);
    const { auth } = React.useContext(AuthContext) as any;

    React.useEffect(() => {
        const callAPiFindAnswerFromUser = async () => {
            const response = (await findAnswerFromUser(
                auth.data.token,
                auth.data.user.userId
            )) as AxiosResponse;
            const { message, payload } = response.data;

            if (response.status !== 200) throw Error(message);

            // filtrar o payload para pegar as respostas certas e calcular o level
            setLevel(1);
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
                    Olá, <B>Usuário</B>!
                </Text>
                <Text style={styles.subtitle}>
                    Você está no nível <B>pleno</B>
                </Text>
                <Text style={styles.score}>999 pontos</Text>
            </View>

            <View style={styles.card}>
                <Text style={{ textAlign: 'left' }}>Pleno</Text>
                <ProgressBar progress={0.7} color={'rgb(75, 75, 225)'} />
                <Text style={{ textAlign: 'right' }}>Sênior</Text>

                <Text style={{ paddingTop: 35 }}>Taxa de acertos:</Text>
                <ProgressBar progress={0.5} color={'rgb(75,75,225)'} />
                <Text style={{ textAlign: 'right' }}>5/10 - 50%</Text>
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
