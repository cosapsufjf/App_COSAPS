import { View, Text } from "react-native";
import styles from "./styles";
import { TextInput } from "react-native-gesture-handler";
interface InputContainerProps {
    setFormField: any,
    field : string,
    placeholder?:string
}
const InputContainer : React.FC<InputContainerProps> = ({setFormField, field, placeholder=""}) => {
    return (
            <View style={styles.container}>
                <Text style={styles.Text}>{field}</Text>
                <TextInput style={styles.TextInput} onChangeText={(text:string)=>setFormField(field,text)} placeholder={placeholder} />
            </View>
    );
}

export default InputContainer;