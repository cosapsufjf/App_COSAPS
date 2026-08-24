import { View, Text } from "react-native";
import styles from "./styles";

const Info_Item = ({content}: {content: string})=>{
    return(
        <View style={styles.item}>
            <Text style={styles.text}>{content}</Text>
        </View>
    )
}


export default Info_Item;