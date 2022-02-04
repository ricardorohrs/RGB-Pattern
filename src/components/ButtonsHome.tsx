import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { View } from './Themed';
import { findAnswerFromUser } from "../services/User";
import { AxiosResponse } from "axios";
import AuthContext from "../contexts/authContext";

export default function ButtonsHome({ navigation }: { navigation: any }) {

    const [points, setPoints] = React.useState(0);
    const {auth, setAuthData} = React.useContext(AuthContext) as any;

    React.useEffect(() => {
        const callAPiFindAnswerFromUser = async () => {
            const response = await findAnswerFromUser(
                auth.data.token,
                auth.data.user.userId,
            ) as AxiosResponse;
            const {message, payload} = response.data;

            if (response.status !== 200) throw Error(message);

            const {points, rate} = payload.reduce(
                (acc: any, curr: any, index: number, arr: object[]) => {
                    return {
                        points: acc.points + curr.points,
                        rate: (acc.points + curr.points) / arr.length,
                    };
                }, 0);

            setPoints(points);
        };

        try {
            callAPiFindAnswerFromUser();
        } catch (err) {
            console.log(err);
        }
    }, [auth]);

    return (
        <View style={styles.container}>
            <Button
                style={styles.button}
                color={'#1e88e5'}
                mode="contained"
                onPress={() => navigation.navigate('Game')}
            >
                Novo Jogo
            </Button>

            { points ? (
                <Button
                    style={styles.button}
                    color={'#1e88e5'}
                    mode="contained"
                    onPress={() => console.log('continuar jogo')}
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
                onPress={() => setAuthData({null: 'any'})}
            >
                Sair
            </Button>
        </View>
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
