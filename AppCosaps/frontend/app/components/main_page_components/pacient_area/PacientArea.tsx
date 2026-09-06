import { View,Text,Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@/app/types/navigation";

const PacientArea : React.FC = () => {

    const iconMap: Record<string, any> = {
        activity: require("@/assets/images/activity_icon.png"),
        diet: require("@/assets/images/diet_icon.png"),
        routine: require("@/assets/images/routine_icon.png"),
        sleep: require("@/assets/images/sleeping_icon.png"),
        calory: require("@/assets/images/calory_icon.png"),
        messages: require("@/assets/images/messages_icon.png"),
    };
    
    const navigation = useNavigation<NavigationProp>();

    const Icon: React.FC<{ iconName: string, onPress?: () => void}> = ({ iconName, onPress }) => {
        return (
            <TouchableOpacity onPress={onPress}>
                <Image source={iconMap[iconName]} style={styles.img} />
            </TouchableOpacity>
        );
    };
    
    const IconRow = ()=>{
        return(
            <View style={styles.icon_row}>
                <Icon iconName="activity" onPress={()=>navigation.navigate("Activities")}/>
                <Icon iconName="diet" onPress={()=>navigation.navigate("Diet")}/>
                <Icon iconName="sleep" onPress={()=>navigation.navigate("SleepQuality")}/>
                <Icon iconName="calory" onPress={()=>navigation.navigate("FoodSearch")}/>
                <Icon iconName="messages" onPress={()=>navigation.navigate("Messages")}/>
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