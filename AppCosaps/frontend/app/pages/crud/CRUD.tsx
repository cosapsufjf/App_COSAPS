import { useEffect, useState } from "react";
import { Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Apresentation from "@/app/components/crud_components/apresentation/Apresentation";
import Select from "@/app/components/crud_components/login_registro/select_lr/select";
import styles from "./style";
const CRUD: React.FC = () => {
  const [showApresentation, setShowApresentation] = useState(true);
  const [Page, setPage] = useState<{
    page: any;
    show: boolean;
  }>({
    page: Apresentation,
    show: false,
  });

  const selectScreen = (page: React.FC) => {
    setPage({
      page: page,
      show: true,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setShowApresentation(false);
      setPage({ page: Select, show: true });
    }, 2000);
  }, [setShowApresentation]);

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.imgHeader}
          source={require("../../../assets/images/UFJF_extension_log_transparent.png")}
        />
        {showApresentation && <Apresentation />}
        {Page.show && <Page.page set={selectScreen} />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default CRUD;
