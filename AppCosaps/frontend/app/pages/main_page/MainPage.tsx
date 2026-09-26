import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import styles from "./style";

import MainHeader from "@/app/components/main_page_components/main_header/main_header";
import PacientArea from "@/app/components/main_page_components/pacient_area/PacientArea";
import PacientInfo from "./sub-components/PacientInfo";
import Info_Item from "./sub-components/Info_Item";
import ManageStorage from "@/app/conf/AsyncStorage";
import { useState } from "react";

const MainPage: React.FC = () => {
  const [dmeanlw, setDmeanlw] = useState(ManageStorage.get_From_Async_Storage("dmeanlw"));
  
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["top"]} style={styles.container}>
        <MainHeader />
        <PacientArea />
        <SafeAreaView edges={["top"]} style={styles.infoContainer}>
          <PacientInfo content={
            Array.from([<Info_Item key={1} content={`Média de sono na última semana: 8 horas e 20 minutos`} />,
            <Info_Item key={2} content="Seu sono está: Bom" />])
          }
            title="Últimos dias de sono"
          />
        </SafeAreaView>
        
        <SafeAreaView edges={["top"]} style={styles.infoContainer}>
          <PacientInfo content={[<Info_Item key={3} content="Almoço:" />, <Info_Item key={4} content="Macarronada " />]} title="Próxima refeição"/>
          <PacientInfo content={[<Info_Item key={4} content="Correr 2km" />, <Info_Item key={5} content="20 minutos Bicicleta" />]} title="Próxima atividade"/>
        </SafeAreaView>
        
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default MainPage;