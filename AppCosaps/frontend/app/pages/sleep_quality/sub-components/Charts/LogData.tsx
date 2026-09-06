import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import {TimerPickerModal} from "react-native-timer-picker"

import BB from "@/app/components/main_components/big_button/BB";
import styles from "../styles";
import CalendarInput from "@/app/components/main_components/calendar_input/calendar_input";
import { useState } from "react";
import { SleepFormType,useSleepForm } from "@/app/hooks/sleepData/useSleepForm";
import { Colors } from "@/app/MainStyle";

const LogData: React.FC<{
  onSaved: () => void;
  onCancel: () => void;
}> = ({ onSaved, onCancel }) => {
  const { 
    selectedDay, 
    error,
    setSelectedDay,
    save,
    setValues
  } = useSleepForm();

  const handleSave = async () => {
    await save();
    if (!error) onSaved();
  };

  const [showSelectedDay, setShowSelectedDay] = useState(false);
  const [sleepTime, setSleepTime] = useState<string>("");
  const [sleepDuration, setSleepDuration] = useState<string>("");

  const [showTime, setShowTime] = useState<boolean>(false);
  const [showDuration, setShowDuration] = useState<boolean>(false);
    
  const Icons = {
    calendar: require("@/assets/images/calendar.png"),
    clock: require("@/assets/images/clock.png"),
    
  };

  const Round_button: React.FC<{ action: () => void; icon: any; txt: string; }> = ({ action, icon, txt }) => {        
    return (
      <TouchableOpacity style={[styles.btn, { flexDirection: "row", justifyContent:"space-between", alignItems: "center", margin:5}]} onPress={action}>
        <Text style={styles.text}>
          {txt}
        </Text>
        <Image source={icon} style={styles.icon} />
      </TouchableOpacity>
    );
  };
  
  const Confirm = (type: SleepFormType, pickedDuration: { hours: number; minutes: number; seconds: number }) => {
    if (type === SleepFormType.Time) {
      setSleepTime(pickedDuration.hours.toString() + ":" + pickedDuration.minutes.toString());
      setValues(SleepFormType.Time, pickedDuration.hours.toString(), pickedDuration.minutes.toString());
      setShowTime(false);
    }
    else if (type === SleepFormType.Duration) {
      setSleepDuration(pickedDuration.hours.toString() + ":" + pickedDuration.minutes.toString());
      setValues(SleepFormType.Duration, pickedDuration.hours.toString(), pickedDuration.minutes.toString());
      setShowDuration(false);
    }
  }
  
  return (
    <View style={[styles.log_data]}>
      {showSelectedDay ? (
        <CalendarInput setShowSelectedDay={setShowSelectedDay} setSelectedDay={setSelectedDay} selectedDay={selectedDay} />
      ) : (
          <View style={{flex:1}}>
            <Round_button action={() => setShowTime(true)} icon={Icons.clock}
              txt={ sleepTime ? sleepTime : "Foi dormir que horas?"} />

            <TimerPickerModal
              closeOnOverlayPress
              modalProps={{
                overlayOpacity: 0.2,
              }}
              modalTitle="Você foi dormir que horas?"
              onCancel={() => setShowTime(false)}
              onConfirm={(pickedDuration) => {
                Confirm(SleepFormType.Time, pickedDuration)
              }}
              cancelButtonText="Cancelar"
              confirmButtonText="Confirmar"
              setIsVisible={setShowTime}
              hideSeconds={true}
              styles={{
                theme: "dark",
              backgroundColor: Colors.Cor_4,
              pickerColumnWidth:100,
            }}
            visible={showTime}
            />
            
            <Round_button action={() => setShowDuration(true)} icon={Icons.clock}
              txt={ sleepDuration ? sleepDuration : "Dormiu por quanto tempo?"} />
            <TimerPickerModal
              closeOnOverlayPress
              modalProps={{
                overlayOpacity: 0.2,
              }}
              modalTitle="Você dormiu por quanto tempo?"
              onCancel={() => setShowDuration(false)}
              onConfirm={(pickedDuration) => {
                Confirm(SleepFormType.Duration, pickedDuration)
              }}
              cancelButtonText="Cancelar"
              confirmButtonText="Confirmar"
              setIsVisible={setShowDuration}
              hideSeconds={true}
              styles={{
                theme: "dark",
              backgroundColor: Colors.Cor_4,
              pickerColumnWidth:100,
            }}
            visible={showDuration}
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

          <View style={{flexDirection:"row",flex:1}}>
              <BB action={onCancel} text="Voltar" fontsize={30} margin={2}
                width={Dimensions.get("window").width * 0.4}
                />
              <BB action={handleSave} text="Salvar" margin={2} fontsize={30}
                width={Dimensions.get("window").width * 0.4}
                />
          </View>  
        </View>
      )}
    </View>
  )
};

export default LogData;