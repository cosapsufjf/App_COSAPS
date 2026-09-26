import { View,Text } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@/app/types/navigation";
import ImageIcon from "../../main_components/ImageIcon/ImageIcon";

const PacientArea : React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Área do paciente</Text>
      <View style={styles.icon_row}>
        <ImageIcon iconName="activity" onPress={() => navigation.navigate("Activities")} />
        <ImageIcon iconName="diet" onPress={() => navigation.navigate("Diet")} />
        <ImageIcon iconName="sleep" onPress={() => navigation.navigate("SleepQuality")} />
        <ImageIcon iconName="calory" onPress={() => navigation.navigate("FoodSearch")} />
        <ImageIcon iconName="messages" onPress={() => navigation.navigate("Messages")} />
      </View>
    </View>
  );
}

export default PacientArea;