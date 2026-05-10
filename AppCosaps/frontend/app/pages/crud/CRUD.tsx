import { useState } from "react";
import { Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Select from "@/app/components/crud_components/login_registro/select_lr/select";
import styles from "./style";
const CRUD: React.FC = () => {
  const [Page, setPage] = useState<{
    page: any;
    show: boolean;
  }>({
    page: Select,
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
        {Page.show && <Page.page set={selectScreen}/>}
      </SafeAreaView>
    </SafeAreaProvider>
    
  );
};

export default CRUD;
