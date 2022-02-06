import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {Button, Dialog, Portal, Provider} from 'react-native-paper';
import { View } from './Themed';
import { findAnswerFromUser } from '../services/User';
import { AxiosResponse } from 'axios';
import AuthContext from '../contexts/authContext';
import { useIsFocused } from '@react-navigation/native';

export default function ButtonsHome({ navigation }: { navigation: any }) {
    const isFocused = useIsFocused();

    const [points, setPoints] = React.useState(0);
    const { auth, setAuthData } = React.useContext(AuthContext) as any;

    const [checkAnswer, setCheckAnswer] = React.useState<boolean>(false);
    const showDialog = () => setCheckAnswer(true);
    const hideDialog = () => setCheckAnswer(false);

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
                { points: 0, rate: 0 }
            );

            setPoints(points);
        };

        try {
            callAPiFindAnswerFromUser();
        } catch (err) {
            console.log(err);
        }
    }, [auth, isFocused]);

    return (
        <ScrollView>
            <View style={styles.container}>
            <Button
                style={styles.button}
                color={'#1e88e5'}
                mode="contained"
                onPress={() => {
                    points ? showDialog() : navigation.navigate('Game');
                }}
            >
                Novo Jogo
            </Button>

            {points ? (
                <Button
                    style={styles.button}
                    color={'#1e88e5'}
                    mode="contained"
                    onPress={() =>
                        navigation.navigate('Game', { continueGame: true })
                    }
                >
                    Continuar Jogo
                </Button>
            ) : null}

            <Button
                style={styles.button}
                color={'#1e88e5'}
                mode="contained"
                onPress={() => navigation.navigate('History')}
            >
                Histórico
            </Button>

            <Button
                color={'#1e88e5'}
                mode="outlined"
                onPress={() => setAuthData({ null: 'any' })}
            >
                Sair
            </Button>
        </View>

            <Provider>
                <Portal>
                    <Dialog visible={checkAnswer} onDismiss={hideDialog}>
                        <Text
                            style={{
                                display: 'flex',
                                textAlign: 'center',
                                fontSize: 20,
                                paddingHorizontal: 26,
                                marginVertical: 15,
                            }}
                        >
                            Tem certeza que deseja reiniciar o jogo?
                        </Text>
                        <Text style={{
                            display: 'flex',
                            textAlign: 'center',
                            fontSize: 18,
                            marginVertical: 15,
                            fontWeight: 'bold',
                        }}>
                            Seu progresso será perdido.
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
                                    navigation.navigate('Game');
                                }}
                            >
                                Sim
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </Provider>
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 35,
        alignItems: 'center',
    },
    button: {
        width: 250,
        padding: 10,
        marginBottom: 25,
    },
});
