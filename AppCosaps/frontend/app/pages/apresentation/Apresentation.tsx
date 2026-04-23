import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";

import { NavigationProp } from "@/app/types/navigation";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const Apresentation: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("CRUD");
    }, 2000);
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.Title}>Projeto Cosaps</Text>
      </View>
      <Image
        style={styles.imgLogo}
        source={require("@/assets/images/android-icon-foreground.png")}
      />
    </SafeAreaView>
  );
};

export default Apresentation;
