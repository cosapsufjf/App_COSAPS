import { View, TouchableOpacity, Text } from "react-native";
import style from "./styles";
import ManageStorage from "@/app/conf/AsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

interface CheckboxProps {
  direction?: "row" | "column";
  txt: string;
  txtSize?: number;
  size?: number;
  StorageItem?: string;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  checked: boolean;
  color?: string;
}


const Checkbox: React.FC<CheckboxProps> = ({ txt, checked, setChecked, StorageItem, txtSize, direction, size, color }) => {  
  const styles = style(direction, txtSize, size, color);
  const [checkedState, setCheckedState] = useState(checked);

  useEffect(() => {
    setCheckedState(checked);
  }, [checked]);

  
  const check = async () => {
    let val = !checkedState;
    setCheckedState(val);
    setChecked(val);
    try {
      if (StorageItem) {
        await ManageStorage.Save_In_Async_Storage(StorageItem, (val).toString());
        console.log(await AsyncStorage.getItem(StorageItem))
      }
    }
    catch (error) {
      console.error("Falha ao salvar no AsyncStorage", error)
    }
    
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkbox} onPress={check}>
        {
            checkedState && <View style={styles.checkboxInner}></View>
        }
      </TouchableOpacity>
      <Text style={[styles.text, txtSize ? { fontSize: txtSize } : {}]}>{txt}</Text>
    </View>
  );
};

export default Checkbox;