import { View, Text } from "react-native"
import styles from "./styles"

import { useState } from "react";
import { useSleepData } from "@/app/components/main_page_components/Pacient/Sleep/hooks/useSleepData";

//components
import LogData from "@/app/components/main_page_components/Pacient/Sleep/LogData/LogData";
import AddButton from "@/app/components/main_page_components/Pacient/Sleep/Inputs/AddButton/AddButton";
import SleepGraphs from "@/app/components/main_page_components/Pacient/Sleep/SleepGraphs";
import PacientArea from "@/app/components/main_page_components/Pacient/pacient_area/PacientArea";
import MainHeader from "@/app/components/main_page_components/main_header/main_header";
import Line from "@/app/components/main_page_components/line/Line";

const Sleep = () => {
  const [showLogData, setShowLogData] = useState(false);
  const { rawTime, rawDuration, weeklyTime, weeklyDuration, loading, error, refresh } = useSleepData();

  return (
    <View style={styles.container}>
      <MainHeader />
      <Line />
      <PacientArea />

      {!showLogData && (
        <View style={styles.btn_container}>
          <Text style={styles.text}>Adicionar novo registro de sono</Text>
          <AddButton onPress={()=>setShowLogData(true)}/>
        </View>
      )}

      {showLogData ? (
        <View style={{ flex: 1 }}>
          <LogData
            onSaved={() => {
              setShowLogData(false);
              refresh();
            }}
            onCancel={() => setShowLogData(false)}
          />
        </View>
      ) : <SleepGraphs />
      }
      
      <View>
        <Text>
          Seu sono é bom
        </Text>
      </View>
    </View>
  );
};
export default Sleep;