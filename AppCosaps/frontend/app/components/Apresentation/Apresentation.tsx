import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";

const Apresentation: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.Title}>Projeto Cosaps</Text>
      </View>
      <Image
        style={styles.imgLogo}
        source={require("../../../assets/images/android-icon-foreground.png")}
      />
    </SafeAreaView>
  );
};

export default Apresentation;
