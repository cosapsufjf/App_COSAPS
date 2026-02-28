import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View, Button } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Apresentation from "@/app/components/Apresentation/Apresentation";
import Login from "@/app/components/LoginRegistro/Login/login";
import Registro_pacient from "@/app/components/LoginRegistro/Register_pacient/Register_pacient";
import register_medic from "@/app/components/LoginRegistro/register_medic/register_medic";
import Select from "@/app/components/LoginRegistro/SelectLR/select";
import colors from "@/app/conf/colors";
import styles from "./style";

const CRUD: React.FC = () => {
  const active_color = colors.Cor_2;
  const inactive_color = colors.Cor_5;
  const [showApresentation, setShowApresentation] = useState(true);
  const [show_card_selector, setShowCardSelector] = useState(false);
  const [Page, setPage] = useState<{
    page: any;
    show: boolean;
  }>({
    page: Apresentation,
    show: false,
  });

  const [btnsColors, setBtnsColors] = useState([active_color, inactive_color]);

  const style_btn = (color: string) => {
    return {
      marginLeft: 10,
      padding: 10,
      backgroundColor: color,
      borderRadius: 30,
    };
  };
  
  // const card_selector = () => {
  //   return (
  //     <View style={styles.card_selector}>
  //       <TouchableOpacity
  //         style={style_btn(btnsColors[0])}
  //         onPress={() => selectScreen(Registro_pacient)}
  //       >
  //         <Text>Registrar</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //         style={style_btn(btnsColors[1])}
  //         onPress={() => selectScreen(Login as React.FC)}
  //       >
  //         <Text>Login</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };
  const selectScreen = (page: React.FC) => {
    setPage({
      page: page,
      show: true,
    });

    if (page == Registro_pacient) {
      setBtnsColors([active_color, inactive_color]);
    } else {
      setBtnsColors([inactive_color, active_color]);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShowApresentation(false);
      setPage({ page:Select, show: true });
    }, 2000);
  }, [setShowApresentation]);

  const content = () => {
    return (
      <View style={styles.content}>
        {/* {show_card_selector && card_selector()} */}
        {<Page.page set={selectScreen}/>}
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
        {Page.show && content()}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default CRUD;
