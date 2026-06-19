import {View,Image,TouchableOpacity,Text,Dimensions,ScrollView} from "react-native";

import styles from "./styles";
import { BarChart, LineChart } from "react-native-gifted-charts";
import { useState, useEffect } from "react";
import { Colors } from "@/app/MainStyle";
import LogData from "./LogData/LogData";
import { getData, sendData } from "./ManageCharts/ChartData";

const SleepGraphs = () => {
  const [showLogData, setShowLogData] = useState(false);
  
  const [ValuesTime, setValuesTime] = useState({ hour: "", min: "" });
  const [ValuesDuration, setValuesDuration] = useState({ hour: "", min: "" });
  
  const [dataTLW, setDataTLW] = useState<any | null>(null);
  const [dataDLW, setDataDLW] = useState<any | null>(null);
  const [selectedDay, setSelectedDay] = useState<any>(null);
  const [dataTime, setDataTime] = useState<any | null>(null);
  const [dataDuration, setDataDuration] = useState<any | null>(null);

  const setValues = (type: "time" | "duration", hour: string, min: string) => {
    if (type === "time") {
      setValuesTime({ hour, min });
    } else {
      setValuesDuration({ hour, min });
    }
  };

  const Icons = {
    sum: require("@/assets/images/plus.png"),
    sleeping: require("@/assets/images/sleep.png")
  };

  useEffect(() => {
    setData();
  }, []);


  const reset_states = () => {
    setShowLogData(false);
    setValuesTime({ hour: "", min: "" });
    setValuesDuration({ hour: "", min: "" });
    setSelectedDay(null);
  };
  
  const setData = async () => {
    const time = await getData("SleepTime", "line");
    const duration = await getData("SleepDuration", "bar");
    const tlw = await getData("SleepTime", "line", true);
    const dlw = await getData("SleepDuration", "bar", true);
    
    setDataTime(time);
    setDataDuration(duration);
    setDataTLW(tlw);
    setDataDLW(dlw);
  }
  
  const round_button = (action: () => void, icon: any) => {
    return (
      <TouchableOpacity style={styles.btn} onPress={action}>
        <Image source={icon} style={styles.icon} />
      </TouchableOpacity>
    );
  };
  
  const no_data = () => {
    return (
      <View style={styles.chart}>
        <Text style={[styles.text,{textAlign:"justify"}]}>Ainda não há dados disponíveis para mostrar os gráficos, tente adicionar registros de sono!</Text>
        <Image source={Icons.sleeping} style={styles.icon}/>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.btn_container}>
        <Text style={styles.text}>Adicionar novo registro de sono</Text>
        {round_button(() => setShowLogData(true), Icons.sum)}
      </View>
      {showLogData ? (
        <LogData 
          setValues={setValues}
          sendData={() => sendData(selectedDay, ValuesTime, ValuesDuration, reset_states, setData)}
          quit={()=>setShowLogData(false)}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
      ) : (
        <View style={styles.charts_container}>
          <ScrollView contentContainerStyle={styles.chart}>
            <Text style={styles.title}>
              Horas de sono dormidas na última semana
            </Text>
            {dataDuration !== null ? (
              <BarChart
                width={Dimensions.get("window").width * 0.6}
                data={dataDLW}
                frontColor={Colors.Cor_7}
                gradientColor={Colors.Cor_1}
                stepValue={1}
                noOfSections={10}
                showGradient
                showLine
                xAxisLabelTexts={["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom",]}
                spacing={25}  
                lineConfig={{
                  color: Colors.Cor_2,
                  thickness: 3,
                  curved: true,
                  hideDataPoints: true,
                  shiftY: 10,
                  initialSpacing: 15,
                }}
              />
              ) : no_data()}
              
            <Text style={styles.title}>
              Horas em que você foi dormir na última semana
            </Text>

            {dataTime !== null ? (
              <LineChart
                width={Dimensions.get("window").width * 0.6}
                  data={dataTLW}
                  
                yAxisLabelTexts={["20h","21h","22h","23h","00h","01h","02h","03h","04h","05h","06h",]}
                xAxisLabelTexts={["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom",]}
                
                  color={Colors.Cor_1}
                maxValue={30}
                stepValue={5}
              />
            ) : no_data()}
            <Text style={styles.title}>
              Horas de sono dormidas no ano
            </Text>
            {dataDuration !== null ? (
              <BarChart
                width={Dimensions.get("window").width * 0.6}
                data={dataDuration}
                frontColor={Colors.Cor_7}
                gradientColor={Colors.Cor_1}
                stepValue={1}
                noOfSections={10}
                showGradient
                showLine
                xAxisLabelTexts={["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom",]}
                spacing={25}  
                lineConfig={{
                  color: Colors.Cor_2,
                  thickness: 3,
                  curved: true,
                  hideDataPoints: true,
                  shiftY: 10,
                  initialSpacing: 15,
                }}
              />
              ) : no_data()}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default SleepGraphs;
