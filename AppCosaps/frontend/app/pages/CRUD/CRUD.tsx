import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Apresentation from "@/app/components/Apresentation/Apresentation";
import Login from "@/app/components/LoginRegistro/Login/login";
import Registro from "@/app/components/LoginRegistro/Register/Register";
import colors from "@/app/conf/colors";
import styles from "./style";

const CRUD: React.FC = () => {
  const active_color = colors.Cor_2;
  const inactive_color = colors.Cor_5;
  const [showApresentation, setShowApresentation] = useState(false);
  const [LoginRegister, setLoginRegister] = useState<{
    page: any;
    show: boolean;
  }>({
    page: Registro,
    show: true,
  });

  const [btnsColors, setBtnsColors] = useState([active_color, inactive_color]);

  useEffect(() => {
    setTimeout(() => {
      setShowApresentation(false);
      selectScreen(Registro as React.FC);
    }, 2000);
  }, []);

  const style_btn = (color: string) => {
    return {
      marginLeft: 10,
      padding: 10,
      backgroundColor: color,
      borderRadius: 30,
    };
  };
  
  const card_selector = () => {
    return (
      <View style={styles.card_selector}>
        <TouchableOpacity
          style={style_btn(btnsColors[0])}
          onPress={() => selectScreen(Registro)}
        >
          <Text>Registrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style_btn(btnsColors[1])}
          onPress={() => selectScreen(Login as React.FC)}
        >
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const selectScreen = (page: React.FC) => {
    setLoginRegister({
      page: page,
      show: true,
    });

    if (page == Registro) {
      setBtnsColors([active_color, inactive_color]);
    } else {
      setBtnsColors([inactive_color, active_color]);
    }
  };
  const content = () => {
    return (
      <View style={styles.content}>
        {card_selector()}
        {<LoginRegister.page />}
      </View>
    );
  };
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.imgHeader}
          source={require("../../../assets/img/UFJF_extension_log_transparent.png")}
        />
        {showApresentation && <Apresentation />}
        {LoginRegister.show && content()}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default CRUD;
