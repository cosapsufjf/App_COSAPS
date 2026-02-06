import React, { use } from "react";
import {View,Text, Image} from "react-native";
import styles from "./style";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const Apresentation : React.FC = () => {
    return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.Title}>Projeto Cosaps</Text>
                </View>
            <Image
                style={styles.imgLogo}
                source={require("../../../assets/img/Cosaps_logo_transparent.png")}
                />
            </SafeAreaView>
    );
};

export default Apresentation;