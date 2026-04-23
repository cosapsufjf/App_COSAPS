import { View,Text,Image, TouchableOpacity } from "react-native";
import styles from "./styles";

const PacientArea : React.FC = () => {

    const iconMap: Record<string, any> = {
        activity: require("@/assets/images/activity_icon.png"),
        diet: require("@/assets/images/diet_icon.png"),
        routine: require("@/assets/images/routine_icon.png"),
        calory: require("@/assets/images/calory_icon.png"),
        messages: require("@/assets/images/messages_icon.png"),
    };

    const Icon: React.FC<{ iconName: string }> = ({ iconName }) => {
        return (
            <TouchableOpacity>
            <Image source={iconMap[iconName]} style={styles.img} />
            </TouchableOpacity>
        );
    };
    
    const IconRow = ()=>{
        return(
            <View style={styles.icon_row}>
                <Icon iconName="activity"/>
                <Icon iconName="diet"/>
                <Icon iconName="routine"/>
                <Icon iconName="calory"/>
                <Icon iconName="messages"/>
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <Text style={styles.txt}>Área do paciente</Text>
            <IconRow/>
        </View>
    )
}

export default PacientArea;