import { View, Text } from "react-native"
import styles from "./styles"

//components
import SleepGraphs from "@/app/components/main_page_components/Pacient/Sleep/SleepGraphs";
import PacientArea from "@/app/components/main_page_components/Pacient/pacient_area/PacientArea";
import MainHeader from "@/app/components/main_page_components/main_header/main_header";
import Line from "@/app/components/main_page_components/line/Line";
    const Sleep = () => {
    const lineData = [{value: 0},{value: 20},{value: 18},{value: 40},{value: 36},{value: 60},{value: 54},{value: 85}]
    return (
      <View style={styles.container}>
        <MainHeader />
        <Line />
        <PacientArea />
        <SleepGraphs />
        <View>
          <Text>
            Seu sono é bom
          </Text>
        </View>
      </View>
    );
};
export default Sleep;