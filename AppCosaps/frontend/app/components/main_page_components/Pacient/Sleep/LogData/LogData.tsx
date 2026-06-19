import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { Calendar } from "react-native-calendars";
import { useState } from "react";

import { HandleScrollInput } from "../SleepScroll/HandleScrollInput";
import BB from "@/app/components/crud_components/big_button/BB";
import { Colors } from "@/app/MainStyle";
import styles from "../styles";

const LogData: React.FC<{
  setValues: (type: "time" | "duration", hour: string, min: string) => void,
  sendData: () => void,
  quit: () => void,
  selectedDay: any | undefined,
  setSelectedDay: React.Dispatch<React.SetStateAction<any | undefined>>,
  
}> = ({ setValues, sendData, quit, selectedDay, setSelectedDay }) => {
  const [showSelectedDay, setShowSelectedDay] = useState(false);
  
  const Icons = {
    calendar: require("@/assets/images/calendar.png"),
  };
  
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
                : "Que dia?"}
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
  )
};

export default LogData;