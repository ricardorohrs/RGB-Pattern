import React, { useState } from "react";
import {Modal, StyleSheet, Text, View} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native-paper";

export default function TipsModal({ tips }: { tips: string }) {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { setModalVisible(!modalVisible) }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{ tips } </Text>
                        <Text style={{ fontSize: 8, marginBottom: 15 }}>-5 pontos</Text>
                        <Button
                            mode="contained"
                            color={"#1e88e5"}
                            labelStyle={{ fontSize: 10 }}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            OK
                        </Button>
                    </View>
                </View>
            </Modal>

            <Button
                color={"#a5a5a5"}
                labelStyle={{ fontSize: 10 }}
                mode="text"
                onPress={() => setModalVisible(true)}
            >
                Gostaria de uma dica?&nbsp;
                <FontAwesome
                    name="question-circle"
                    size={13}
                />
            </Button>

        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
    },
    modalText: {
        fontFamily: 'space-mono',
        marginBottom: 15,
        textAlign: "center"
    }
});