import { View, TouchableOpacity, Text } from "react-native";
import styles from "./styles";
import ManageStorage from "@/app/conf/AsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CheckboxProps {
  txt: string;
  StorageItem: string;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  checked: boolean;
}


const Checkbox: React.FC<CheckboxProps> = ({ txt, checked, setChecked, StorageItem }) => {  
  
  const check = async () => {
    let val = !checked;
    setChecked(val);  
    try {
      await ManageStorage.Save_In_Async_Storage(StorageItem, (val).toString());
      console.log(await AsyncStorage.getItem(StorageItem))
    }
    catch (error) {
      console.error("Falha ao salvar no AsyncStorage", error)
    }
    
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkbox} onPress={check}>
        {
            checked && <View style={styles.checkboxInner}></View>
        }
      </TouchableOpacity>
      <Text style={styles.text}>{txt}</Text>
    </View>
  );
};

export default Checkbox;