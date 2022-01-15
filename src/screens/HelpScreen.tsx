import React from 'react';
import {Image, ScrollView, StyleSheet, Text} from 'react-native';
import {View} from '../components/Themed';

export default function HelpScreen({navigation}: { navigation: any }) {

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{backgroundColor: 'rgba(75, 225, 75, 0.5)', paddingBottom: 25}}>
                    <Text style={styles.question}>Qual o propósito desta aplicação?</Text>
                    <Text style={styles.answer}>
                        O objetivo principal é propor um jogo que busca ensinar de forma prática os padrões de projetos
                        disponíveis na literatura, além de fornecer uma experiência de evolução por meio de conceitos de
                        gamificação ao usuário. Serão apresesentados problemas teóricos e práticos que o jogador deve tentar
                        solucionar, facilitando o seu entendimento de padrões de projeto, além de perceber sua evolução
                        durante o jogo.
                    </Text>
                </View>

                <View style={{backgroundColor: 'rgba(75, 75, 225, 0.5)', paddingBottom: 25}}>
                    <Text style={styles.question}>Como funcionam os níveis dentro da plataforma?</Text>
                    <View style={styles.imageList}>
                        <Image style={styles.images} source={require('../../assets/images/levels/estagiario.png')}/>
                        <Image style={styles.images} source={require('../../assets/images/levels/junior.png')}/>
                        <Image style={styles.images} source={require('../../assets/images/levels/pleno.png')}/>
                        <Image style={styles.images} source={require('../../assets/images/levels/senior.png')}/>
                        <Image style={styles.images} source={require('../../assets/images/levels/master.png')}/>
                        <Image style={styles.images} source={require('../../assets/images/levels/especialista.png')}/>
                    </View>
                    <Text style={styles.answer}>
                        O nível de conhecimento que o jogador alcança durante o jogo é representado através de 6 níveis.
                        Suas nomenclaturas foram inspiradas nos níveis de hierarquia mais conhecidos dentro do mercado de
                        trabalho na área de tecnologia, são eles: Estagiário, Júnior, Pleno, Sênior, Master e Especialista.
                        Seguindo esta lógica, o usuário inicia sua jornada neste aplicativo como um estagiário e busca subir
                        de nível até poder ser considerado um especialista no assunto. A pontuação e as insígnias conquistadas
                        podem ser acompanhadas na tela de histórico.
                    </Text>
                </View>

                <View style={{backgroundColor: 'rgba(225, 75, 75, 0.5)', paddingBottom: 25}}>
                    <Text style={styles.question}>Como funciona o fluxo de aprendizado?</Text>
                    <Text style={styles.answer}>
                        Os desafios representam missões para que os jogadores realizem e então sejam recompensados por
                        cada resposta certa. Após cada questão, o usuário receberá XX pontos que serão utilizados para alcançar
                        o próximo nível e assim conquistar uma nova insígnia.
                    </Text>
                </View>

                <View style={{backgroundColor: 'rgba(75, 225, 75, 0.5)', paddingBottom: 25}}>
                    <Text style={styles.question}>Posso solicitar ajuda se necessário?</Text>
                    <Text style={styles.answer}>
                        Sim! Ao clicar no ícone de ajuda no (inserir onde vai ficar) da tela, será apresentada uma breve dica
                        para auxiliar na resolução da questão, assim como quando o usuário responde incorretamente, um modal
                        sugere a utilização da dica para facilitar na evolução do jogo. Lembrando que ao utilizar a dica, a
                        quantidade de pontos recebidos é menor.
                    </Text>
                </View>
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
        fontSize: 21,
        fontFamily: 'space-mono',
        paddingHorizontal: 40,
        marginTop: 20,
        marginBottom: 30
    },
    answer: {
        color: '#FFF',
        fontSize: 26,
        fontFamily: 'tulpen-one',
        textAlign: "justify",
        paddingHorizontal: 40,
    },
    imageList: {
        marginTop: -75,
        marginBottom: -50,
        flexDirection: 'row',
        backgroundColor: 'rgba(75, 75, 225, 0)',
        justifyContent: "center"
    },
    images: {
        width: 30,
        resizeMode: 'contain',
        marginHorizontal: 12,
    },
});
