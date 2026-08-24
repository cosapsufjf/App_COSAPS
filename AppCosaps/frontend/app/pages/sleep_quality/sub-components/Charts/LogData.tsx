import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { HandleScrollInput } from "@/app/pages/sleep_quality/sub-components/Elements/SleepScroll/HandleScrollInput";
import BB from "@/app/components/main_components/big_button/BB";
import styles from "../styles";
import CalendarInput from "@/app/components/main_components/calendar_input/calendar_input";
import { useState } from "react";

import { useSleepForm, SleepFormType } from "@/app/hooks/sleepData/useSleepForm";

const LogData: React.FC<{
  onSaved: () => void;
  onCancel: () => void;
}> = ({ onSaved, onCancel }) => {
  const { 
    valuesTime, 
    valuesDuration, 
    selectedDay, 
    saving, 
    error,
    setValues,
    setSelectedDay,
    save,
  } = useSleepForm();

  const handleSave = async () => {
    await save();
    if (!error) onSaved();
  };

  const [showSelectedDay, setShowSelectedDay] = useState(false);
  const Icons = {
    calendar: require("@/assets/images/calendar.png"),
  };
  
  return (
    <View style={styles.log_data}>
      {showSelectedDay ? (
        <CalendarInput setShowSelectedDay={setShowSelectedDay} setSelectedDay={setSelectedDay} selectedDay={selectedDay} />
      ) : (
        <>
          <HandleScrollInput 
              txt="Você foi dormir que horas?" 
              lenH={24} lenM={60}
              setScrollValues={setValues}
              type={SleepFormType.Time}
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
            <HandleScrollInput
              txt="Dormiu por quantas horas?"
              lenH={24} lenM={60}
              type={SleepFormType.Duration}
              setScrollValues={setValues}
            />
          <View style={{flexDirection:"row",flex:1}}>
              <BB action={onCancel} text="Voltar" fontsize={30} margin={2}
                width={Dimensions.get("window").width * 0.4}
                />
              <BB action={handleSave} text="Salvar" margin={2} fontsize={30}
                width={Dimensions.get("window").width * 0.4}
                />
          </View>  
        </>
      )}
    </View>
  )
};

export default LogData;