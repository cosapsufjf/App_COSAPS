import { View, TouchableOpacity, Image, Text } from "react-native";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import ScrollInput from "@/app/components/general_components/ScrollInput/ScrollInput";

export const HandleScrollInput: React.FC<
  { txt: string; lenH: number; lenM: number; type: 'time' | 'duration'; setScrollValues: (type: 'time' | 'duration', hour: string, min: string) => void}> = ({ txt, lenH, lenM, type, setScrollValues }) => {
  const [showScrollInput, setShowScrollInput] = useState(false);
  const [selectedHour, setSelectedHour] = useState<string>('');
  const [selectedMin, setSelectedMin] = useState<string>('');
  const [should_verify, setShouldVerify] = useState(true);
    
  const Icons = {
    calendar: require("@/assets/images/calendar.png"),
    clock: require("@/assets/images/clock.png"),
  };
  
  const round_button = (action: () => void, icon: any) => {
    return (
      <TouchableOpacity style={styles.btn} onPress={action}>
        <Image source={icon} style={styles.icon}/>
      </TouchableOpacity>
    );
  };
  const callInput = () => {
    setShowScrollInput(true);
    setSelectedHour('');
    setSelectedMin('');
    setShouldVerify(true);
  };

  useEffect(() => {
    const verify_selecteds = () => {
      const selecteds = [selectedHour, selectedMin];
      if (selecteds.every(s => s !== '')) {
        setScrollValues(type, selectedHour, selectedMin);
        setShouldVerify(false);
      }
    }
    if (should_verify)
      verify_selecteds();
    else
      setShowScrollInput(false);
      
  },[setShowScrollInput, selectedHour, selectedMin, setScrollValues, type, should_verify])
  
  return (
    <View style={styles.scroll_input_container}>
      <Text style={styles.text}>
        {selectedHour && selectedMin && (selectedHour !== '' || selectedMin !== '') ? `${selectedHour}:${selectedMin}` : txt}
      </Text>
      {
        showScrollInput
          ?
          <View style={styles.inner_inputs}>
            <ScrollInput len={lenH} SelectItem={setSelectedHour} desc={true} />
            <Text style={styles.text}>:</Text>
            <ScrollInput len={lenM} SelectItem={setSelectedMin}/>  
          </View>
          :
          round_button(callInput, Icons.clock)
      }
    </View>
  )
}
