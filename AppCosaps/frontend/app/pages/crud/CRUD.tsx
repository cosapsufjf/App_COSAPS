import { useState } from "react";
import { Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import crud_elements from "@/app/components/crud_components/login_registro/props";

import styles from "./style";
const CRUD: React.FC = () => {
  const [Page, setPage] = useState<{
    page: any;
    show: boolean;
  }>({
    page: crud_elements.Select,
    show: true,
  });

  const selectScreen = (page: React.FC) => {
      setPage({
        page: page,
        show: true,
      });
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.imgHeader}
          source={require("../../../assets/images/UFJF_extension_log_transparent.png")}
        />
        {Page.show && <Page.page elements={crud_elements} set={selectScreen}/>}
      </SafeAreaView>
    </SafeAreaProvider>
    
  );
};

export default CRUD;
