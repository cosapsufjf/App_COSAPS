import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import styles from "./styles";

import { BarChart, LineChart } from "react-native-gifted-charts";
import { Calendar } from "react-native-calendars";
import { useState, useEffect } from "react";

import BB from "@/app/components/crud_components/big_button/BB";
import { HandleScrollInput } from "../SleepScroll/HandleScrollInput";
import ManageStorage from "@/app/conf/AsyncStorage";
import { Colors } from "@/app/MainStyle";

const SleepGraphs = () => {
  const [showLogData, setShowLogData] = useState(false);
  const [ValuesTime, setValuesTime] = useState({ hour: "", min: "" });
  const [ValuesDuration, setValuesDuration] = useState({ hour: "", min: "" });

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
    calendar: require("@/assets/images/calendar.png"),
    sleeping: require("@/assets/images/sleep.png")
  };

  const getData = async (type: "SleepTime" | "SleepDuration",chartType: "bar" | "line",) => {
    const StorageData = await ManageStorage.get_From_Async_Storage("sleep_log",true,);
    if (StorageData && Array.isArray(StorageData)) {
      if (chartType === "bar") {
        return StorageData.map((item: any) => ({
          value: item[type].hour,
          label: item.SleepDate,
          barWidth: 16,
          barBorderRadius: 4,
        }));
      } else {
        return StorageData.map((item: any) => ({
          value: parseInt(item[type].hour),
        }));
      }
    }

    return null;
  };

  useEffect(() => {
    const load_data = async () => {
      const time = await getData("SleepTime", "line");
      const duration = await getData("SleepDuration", "bar");
      setDataTime(time);
      setDataDuration(duration);
    };
    load_data();
  }, []);

  const [showSelectedDay, setShowSelectedDay] = useState(false);
  const [selectedDay, setSelectedDay] = useState<any>(null);

  const chooseDay = () => {
    return (
      <View>
        <Calendar
          onDayPress={(day) => setSelectedDay(day)}
          markedDates={{
            [selectedDay?.dateString]: {
              selected: true,
              selectedColor: Colors.Cor_2,
            },
          }}
        />
        <BB
          action={() => setShowSelectedDay(false)}
          text="Voltar"
          width={Dimensions.get("window").width * 0.8}
        />
      </View>
    );
  };
  

  
  const log_data = () => {
    return (
      <View style={styles.log_data}>
        {showSelectedDay ? (
          chooseDay()
        ) : (
          <>
            <HandleScrollInput txt="Você foi dormir que horas?" lenH={24} lenM={60}
                type="time" setScrollValues={setValues}
            />
            <TouchableOpacity
              style={[
                styles.btn,
                { flexDirection: "row", justifyContent: "space-between" },
              ]}
              onPress={() => setShowSelectedDay(true)}
            >
              <Text style={styles.text}>
                {selectedDay?.dateString && selectedDay.dateString !== ""
                  ? `${selectedDay.day}/${selectedDay.month.toString().padStart(2, "0")}/${selectedDay.year}`
                  : "Em qual dia da semana?"}
              </Text>
              <Image source={Icons.calendar} style={styles.icon} />
            </TouchableOpacity>
              <HandleScrollInput txt="Dormiu por quantas horas?" lenH={24} lenM={60}
                type="duration" setScrollValues={setValues}
              />
            <View style={{flexDirection:"row",flex:1}}>
                <BB action={quit} text="Voltar" fontsize={30} margin={2}
                  width={Dimensions.get("window").width * 0.4}
                  />
                <BB action={sendData} text="Salvar" margin={2} fontsize={30}
                  width={Dimensions.get("window").width * 0.4}
                  />
            </View>  
          </>
        )}
      </View>
    );
  };
  
  const quit = () => {
    setShowLogData(false);
    setDataDuration(null)
    setDataTime(null)
  }
  const sendData = async () => {
    const StorageData = await ManageStorage.get_From_Async_Storage(
      "sleep_log",
      true,
    );

    const newEntry = {
      SleepTime: ValuesTime,
      SleepDate: `${selectedDay.day.toString().padStart(2, "0")}/${selectedDay.month.toString().padStart(2, "0")}`,
      SleepDuration: ValuesDuration,
    };

    const updatedData =
      StorageData && Array.isArray(StorageData)
        ? [...StorageData, newEntry]
        : [newEntry];

    await ManageStorage.Save_In_Async_Storage(
      "sleep_log",
      JSON.stringify(updatedData),
    );
    setShowLogData(false);
    setValuesTime({ hour: "", min: "" });
    setValuesDuration({ hour: "", min: "" });
    setSelectedDay(null);

    const time = await getData("SleepTime", "line");
    const duration = await getData("SleepDuration", "bar");
    setDataTime(time);
    setDataDuration(duration);
  };

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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.btn_container}>
        <Text style={styles.text}>Adicionar novo registro de sono</Text>
        {round_button(() => setShowLogData(true), Icons.sum)}
      </View>
      {showLogData ? (
        log_data()
      ) : (
        <View style={styles.charts_container}>
          <ScrollView contentContainerStyle={styles.chart}>
            <Text style={styles.title}>
              Horas de sono dormidas na última semana
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
                xAxisLabelTexts={[
                  "Seg",
                  "Ter",
                  "Qua",
                  "Qui",
                  "Sex",
                  "Sab",
                  "Dom",
                ]}
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
                  data={dataTime}
                  
                xAxisLabelTexts={[
                  "Seg",
                  "Ter",
                  "Qua",
                  "Qui",
                  "Sex",
                  "Sab",
                  "Dom",
                ]}
                yAxisLabelTexts={[
                  "20h",
                  "21h",
                  "22h",
                  "23h",
                  "00h",
                  "01h",
                  "02h",
                  "03h",
                  "04h",
                  "05h",
                  "06h",
                ]}
                color={Colors.Cor_1}
                maxValue={30}
                stepValue={5}
              />
            ) : no_data()}
            </ScrollView>
        </View>
      )}
    </ScrollView>
  );
};

export default SleepGraphs;
