import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import styles from "./style";

import MainHeader from "@/app/components/main_page_components/main_header/main_header";
import PacientArea from "@/app/components/main_page_components/Pacient/pacient_area/PacientArea";
import Line from "@/app/components/main_page_components/line/Line";
import PacientInfo from "@/app/components/main_page_components/Pacient/pacient_info/PacientInfo";
import Info_Item from "@/app/components/main_page_components/Pacient/pacient_info/Info_Item";

const MainPage: React.FC = () => {
  return(
    <SafeAreaProvider>
      <SafeAreaView edges={["top"]} style={styles.container}>
        <MainHeader />
        <Line/>
        <Line/>
        <PacientArea />
        <SafeAreaView edges={["top"]} style={styles.infoContainer}>
          <PacientInfo content={
            Array.from([<Info_Item key={1} content="Seu sono é: " />, <Info_Item key={2} content="Horas dormidas nos últimos 7 dias: " />])
          }
            title="Últimos dias de sono"
          />
        </SafeAreaView>
        
        <SafeAreaView edges={["top"]} style={styles.infoContainer}>
          <PacientInfo content={[<Info_Item key={3} content="Próxima refeição: " />]} title="Próxima refeição"/>
          <PacientInfo content={[<Info_Item key={4} content="Próxima atividade: " />]} title="Próxima atividade"/>
        </SafeAreaView>
        
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default MainPage;