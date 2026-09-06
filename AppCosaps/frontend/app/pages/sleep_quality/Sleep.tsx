import { View, Text } from "react-native"
import styles from "./styles"

import { useState } from "react";
import { useSleepData } from "@/app/hooks/sleepData/useSleepData";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

//components
import LogData from "./sub-components/Charts/LogData";
import AddButton from "./sub-components/Elements/AddButton";
import SleepGraphs from "@/app/pages/sleep_quality/sub-components/Charts/SleepGraphs";
import PacientArea from "@/app/components/main_page_components/pacient_area/PacientArea";
import MainHeader from "@/app/components/main_page_components/main_header/main_header";

const Sleep = () => {
  const [showLogData, setShowLogData] = useState(false);
  const { refresh } = useSleepData();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <MainHeader />
          <PacientArea />
        </View>
        
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
  
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default Sleep;